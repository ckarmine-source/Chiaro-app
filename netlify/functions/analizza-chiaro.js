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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function chiamaGemini(apiKey, model, payload) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const { testo, immagineBase64, mimeType } = JSON.parse(event.body || "{}");
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "GEMINI_API_KEY mancante su Netlify" }),
      };
    }

    const parts = [];
    if (immagineBase64) {
      parts.push({
        inline_data: {
          mime_type: mimeType || "image/jpeg",
          data: immagineBase64,
        },
      });
    }
    parts.push({
      text: testo?.trim()
        ? `Analizza questa richiesta o documento del cittadino:\n${testo}`
        : "Analizza questo documento fotografato e spiegamelo in parole semplici.",
    });

    const payload = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts }],
      generationConfig: { response_mime_type: "application/json" },
    };

    const models = ["gemini-3.8-flash", "gemini-2.5-flash"];
    let lastError = "Errore API Gemini";
    let lastStatus = 500;

    for (const model of models) {
      for (let tentativo = 1; tentativo <= 2; tentativo++) {
        const result = await chiamaGemini(apiKey, model, payload);
        if (result.ok) {
          const rawJson = result.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
          return {
            statusCode: 200,
            headers,
            body: rawJson,
          };
        }

        lastStatus = result.status;
        lastError = result.data.error?.message || "Errore API Gemini";

        if (result.status === 503 || result.status === 429) {
          await sleep(800 * tentativo);
          continue;
        }
        break;
      }
    }

    return {
      statusCode: lastStatus,
      headers,
      body: JSON.stringify({ error: lastError }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
