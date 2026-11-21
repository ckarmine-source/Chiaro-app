const SYSTEM_PROMPT = `Sei il motore intelligente di "Chiaro", un'app che aiuta i cittadini italiani a capire documenti complessi, lettere, bollette, regole e dubbi quotidiani.
Restituisci ESCLUSIVAMENTE un JSON valido con questi campi:
{
  "titolo": "Titolo breve (max 5 parole)",
  "categoria": "Casa & Utenze | Soldi & Contratti | Salute & Pratiche | Regole & Acquisti",
  "in_parole_semplici": "Spiegazione chiara in 2-3 frasi senza burocratese",
  "cosa_significa_per_te": "Impatto concreto su soldi, tempi, diritti o obblighi",
  "scadenza_testo": "Data limite leggibile oppure 'Nessuna scadenza fissa'",
  "urgenza": "Alta | Media | Bassa | Nessuna",
  "prossimo_passo": ["Azione pratica 1", "Azione pratica 2"],
  "azione_pronta": {
    "titolo_azione": "Titolo breve dell'email o reclamo",
    "testo_copiabile": "Testo pronto da copiare con segnaposto [NOME]"
  }
}
Se non serve scrivere a nessuno, imposta "azione_pronta": null.`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const testo = body.testo || "";
    const immagineBase64 = body.immagineBase64 || null;
    const mimeType = body.mimeType || "image/jpeg";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY mancante su Vercel" });
    }

    const parts = [];
    if (immagineBase64) {
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: immagineBase64,
        },
      });
    }
    parts.push({
      text: testo.trim()
        ? "Analizza questa richiesta o documento del cittadino:\n" + testo.trim()
        : "Analizza questo documento fotografato e spiegamelo in parole semplici.",
    });

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=" +
      encodeURIComponent(apiKey);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts }],
        generationConfig: { response_mime_type: "application/json" },
      }),
    });

    const textResponse = await response.text();
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      return res.status(502).json({
        error: "Risposta non JSON da Gemini: " + textResponse.slice(0, 180),
      });
    }

    if (!response.ok) {
      const msg = (data && data.error && data.error.message) || ("HTTP " + response.status);
      return res.status(response.status).json({ error: msg });
    }

    const rawJson =
      (data &&
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text) ||
      "{}";

    let parsed;
    try {
      parsed = JSON.parse(rawJson);
    } catch (e) {
      return res.status(502).json({ error: "JSON non valido dal modello" });
    }

    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({
      error: "Eccezione funzione: " + (error && error.message ? error.message : String(error)),
    });
  }
          }
