// Funzione Vercel: riceve testo e/o foto di un documento e restituisce una spiegazione strutturata.
// Variabili d'ambiente:
//   GEMINI_API_KEY   (obbligatoria)
//   GEMINI_MODEL     (facoltativa, default qui sotto)
//   ALLOWED_ORIGINS  (facoltativa, domini extra ammessi separati da virgola, es. https://chiaro.it)

const MODELLO_DEFAULT = "gemini-3.5-flash-lite";
const MAX_FOTO = 5;
const MAX_BASE64_TOTALE = 4_000_000;          // ~3 MB di immagini: sotto il limite di 4,5 MB di Vercel
const MAX_TESTO = 8000;
const TIPI_IMMAGINE = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const LIMITE_RICHIESTE = 20;                  // per indirizzo IP...
const FINESTRA_MS = 10 * 60 * 1000;           // ...ogni 10 minuti

/* Conoscenza curata: regole italiane che fanno risparmiare. Da rivedere a ogni legge di bilancio. */
const REGOLE = `
MULTE (Codice della Strada):
- Pagamento entro 5 giorni dalla notifica o contestazione: sconto del 30% (art. 202 CdS). Non vale se la violazione prevede confisca del veicolo o sospensione della patente.
- Entro 60 giorni: importo minimo. Dopo: metà del massimo più spese.
- Ricorso al Prefetto entro 60 giorni (gratuito) o al Giudice di Pace entro 30 giorni (con contributo). Con il ricorso si rinuncia allo sconto.
- Per i residenti in Italia il verbale va notificato entro 90 giorni dall'accertamento (art. 201): se notificato oltre è contestabile.
- Se guidava un'altra persona va comunicato chi era entro 60 giorni, altrimenti scatta una sanzione separata.
BOLLETTE luce, gas, acqua:
- Prescrizione di 2 anni (Legge 205/2017): i consumi fatturati più di 2 anni dopo il periodo a cui si riferiscono possono non essere pagati, salvo ritardo dovuto al cliente.
- Conguagli alti: si può chiedere la rateizzazione. Reclamo scritto al venditore; poi Servizio Conciliazione ARERA (gratuito).
- Bonus sociale luce, gas e acqua: automatico con ISEE sotto soglia (circa 9.530 €, 20.000 € con 4 o più figli a carico).
- Confronto offerte: ilportaleofferte.it (ARERA). Cambiare fornitore è gratuito.
FISCO:
- Comunicazione di irregolarità ("avviso bonario") dell'Agenzia delle Entrate: pagando entro il termine indicato la sanzione è ridotta; si può rateizzare; se l'importo è sbagliato si chiede la correzione (autotutela), anche tramite CAF.
- Cartelle di Agenzia Entrate-Riscossione: possibile rateizzazione. Prescrizione indicativa: bollo auto 3 anni, multe e tributi locali (IMU, TARI) 5 anni, imposte erariali 10 anni. Cartelle vecchie: far verificare la prescrizione.
- Detrazioni 730 spesso dimenticate: sport figli 5-18 anni (19% fino a 210 €), abbonamento mezzi pubblici (19% fino a 250 €), veterinario, affitto per under 31 e studenti fuori sede.
LAVORO E PENSIONE:
- Busta paga: controlla ore, straordinari, ferie e permessi residui, detrazioni, conguaglio fiscale. Errori: ufficio paghe, poi patronato o sindacato.
- Cedolino pensione: addizionali regionali e comunali rateizzate nell'anno; conguaglio fiscale a febbraio-marzo. Quattordicesima a luglio per pensionati con almeno 64 anni e reddito basso.
CONTRATTI:
- Telefonia e internet: recesso in ogni momento pagando solo i costi giustificati e le rate residue degli apparecchi. Se l'operatore cambia le condizioni si può recedere senza penali entro il termine indicato nella comunicazione.
- Acquisti online o fuori dai negozi: recesso entro 14 giorni dalla consegna. Garanzia legale di 2 anni verso il venditore.
- Affitto abitativo: 4+4 (libero) o 3+2 (concordato). L'inquilino può recedere per gravi motivi con 6 mesi di preavviso o come da contratto. Deposito massimo 3 mensilità, restituito con interessi legali. Il contratto va registrato.
CONDOMINIO: spese per millesimi salvo regole diverse; delibera impugnabile entro 30 giorni.
BANCHE E ASSICURAZIONI: il conto si chiude senza spese; RC auto senza tacito rinnovo, si può cambiare compagnia alla scadenza.
SALUTE (referti, farmaci): spiega termini e cosa misura ogni esame. NON fare diagnosi, NON dire se un valore è grave; valori fuori intervallo: spiegali in modo neutro e invita a parlarne con il medico. Se il referto indica urgenza dillo chiaramente. Per i farmaci riporta dose e avvertenze del foglietto e rimanda a medico o farmacista.`;

const istruzioni = (lingua, oggi) => `Sei il motore di "Chiaro", un'app che spiega a cittadini comuni (anche anziani o stranieri) documenti, lettere, bollette, contratti e dubbi della vita quotidiana in Italia.
Oggi è il ${oggi}.
Scrivi TUTTI i testi in ${lingua}, con frasi brevi e parole semplici, senza burocratese. Eccezioni: "citazione" riporta il testo ESATTO del documento in italiano; "azione_pronta.testo_copiabile" è sempre in italiano perché va inviato a un ufficio italiano.
Usa le regole seguenti SOLO se il caso rientra davvero. Non inventare importi, date o diritti; se non sei sicuro usa "certezza":"bassa".
${REGOLE}

Restituisci ESCLUSIVAMENTE un JSON valido con questi campi:
{
 "titolo": "titolo breve (max 6 parole)",
 "categoria": "Casa & Utenze | Soldi & Contratti | Salute & Pratiche | Regole & Acquisti",
 "mittente": "chi lo manda, se è un documento",
 "in_parole_semplici": "2-3 frasi: cos'è",
 "cosa_significa_per_te": "effetto concreto su soldi, tempi, diritti o obblighi",
 "urgenza": "Alta | Media | Bassa | Nessuna",
 "scadenze": [{"cosa":"cosa va fatto","data":"AAAA-MM-GG oppure null se dipende da quando è arrivata","giorni_da_ricezione": numero o null,"citazione":"frase esatta del documento"}],
 "importo": {"da_pagare": numero o null, "descrizione": "a cosa si riferisce"},
 "risparmi": [{"titolo":"possibilità di pagare meno o non pagare","spiegazione":"perché","importo": euro risparmiati o null,"condizione":"cosa serve","certezza":"alta|media|bassa"}],
 "attenzione": ["errori possibili, clausole sfavorevoli, cose da controllare"],
 "prossimo_passo": ["azione pratica 1", "azione pratica 2"],
 "termini": [{"termine":"parola difficile","significato":"spiegazione semplice"}],
 "professionista": {"serve": true/false, "chi": "CAF, patronato, avvocato, medico...", "perche": "motivo"},
 "nota_salute": "solo per referti e farmaci, altrimenti stringa vuota",
 "dati_mancanti": ["parti illeggibili o informazioni che servirebbero"],
 "azione_pronta": {"titolo_azione":"titolo breve","testo_copiabile":"lettera, email o reclamo pronto con segnaposto [NOME], indicando all'inizio a chi inviarlo e come (PEC, raccomandata, modulo online)"}
}
Se non serve scrivere a nessuno imposta "azione_pronta": null. Liste vuote se non pertinenti.`;

/* ---------- normalizzazione della risposta del modello ---------- */
const s = (v, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const arr = (v) => (Array.isArray(v) ? v : []);
const num = (v) => {
  if (typeof v === "number" && isFinite(v)) return v;
  if (typeof v === "string" && v.trim()) { const n = Number(v.replace(/[€\s]/g, "").replace(",", ".")); return isFinite(n) ? n : null; }
  return null;
};
const scegli = (v, ammessi, def) => (ammessi.includes(v) ? v : def);
export function normalizza(j) {
  const cat = ["Casa & Utenze", "Soldi & Contratti", "Salute & Pratiche", "Regole & Acquisti"];
  const out = {
    titolo: s(j?.titolo, 120) || "Chiarimento",
    categoria: scegli(j?.categoria, cat, "Regole & Acquisti"),
    mittente: s(j?.mittente, 200),
    in_parole_semplici: s(j?.in_parole_semplici),
    cosa_significa_per_te: s(j?.cosa_significa_per_te),
    urgenza: scegli(j?.urgenza, ["Alta", "Media", "Bassa", "Nessuna"], "Nessuna"),
    scadenze: arr(j?.scadenze).filter((x) => x && s(x.cosa)).slice(0, 8).map((x) => ({
      cosa: s(x.cosa, 300),
      data: /^\d{4}-\d{2}-\d{2}$/.test(x.data || "") ? x.data : null,
      giorni_da_ricezione: Number.isInteger(num(x.giorni_da_ricezione)) && num(x.giorni_da_ricezione) > 0 ? num(x.giorni_da_ricezione) : null,
      citazione: s(x.citazione, 400),
    })),
    importo: { da_pagare: num(j?.importo?.da_pagare), descrizione: s(j?.importo?.descrizione, 300) },
    risparmi: arr(j?.risparmi).filter((x) => x && s(x.titolo)).slice(0, 6).map((x) => ({
      titolo: s(x.titolo, 200), spiegazione: s(x.spiegazione, 600), importo: num(x.importo),
      condizione: s(x.condizione, 300), certezza: scegli(x.certezza, ["alta", "media", "bassa"], "media"),
    })),
    attenzione: arr(j?.attenzione).map((x) => s(x, 400)).filter(Boolean).slice(0, 6),
    prossimo_passo: arr(j?.prossimo_passo).map((x) => s(typeof x === "object" && x ? x.passo || "" : x, 400)).filter(Boolean).slice(0, 8),
    termini: arr(j?.termini).filter((x) => x && s(x.termine)).slice(0, 10).map((x) => ({ termine: s(x.termine, 120), significato: s(x.significato, 400) })),
    professionista: { serve: !!j?.professionista?.serve, chi: s(j?.professionista?.chi, 200), perche: s(j?.professionista?.perche, 400) },
    nota_salute: s(j?.nota_salute, 400),
    dati_mancanti: arr(j?.dati_mancanti).map((x) => s(x, 300)).filter(Boolean).slice(0, 6),
    azione_pronta: j?.azione_pronta && s(j.azione_pronta.testo_copiabile)
      ? { titolo_azione: s(j.azione_pronta.titolo_azione, 200) || "Bozza pronta", testo_copiabile: s(j.azione_pronta.testo_copiabile, 6000) }
      : null,
  };
  // compatibilità con le versioni precedenti dell'app (archivio e scadenze)
  const prima = out.scadenze.find((x) => x.data) || out.scadenze[0];
  out.scadenza_testo = prima ? `${prima.cosa}${prima.data ? " entro il " + prima.data.split("-").reverse().join("/") : prima.giorni_da_ricezione ? ` entro ${prima.giorni_da_ricezione} giorni dalla ricezione` : ""}` : "Nessuna scadenza fissa";
  return out;
}

/* ---------- protezioni ---------- */
const richieste = new Map(); // limite per IP: vale per singola istanza della funzione (protezione di base)
export function superaLimite(ip, ora = Date.now()) {
  const lista = (richieste.get(ip) || []).filter((t) => ora - t < FINESTRA_MS);
  lista.push(ora); richieste.set(ip, lista);
  if (richieste.size > 5000) richieste.clear();
  return lista.length > LIMITE_RICHIESTE;
}
export function origineAmmessa(origin, host, extra = process.env.ALLOWED_ORIGINS || "") {
  if (!origin) return false;
  let o; try { o = new URL(origin); } catch { return false; }
  if (host && o.host === host) return true;
  return extra.split(",").map((x) => x.trim().replace(/\/$/, "")).filter(Boolean).includes(origin.replace(/\/$/, ""));
}

function leggiImmagini(body) {
  // formato nuovo: immagini: [{data, mimeType}] — formato vecchio: immagineBase64 + mimeType
  const lista = Array.isArray(body.immagini) ? body.immagini
    : body.immagineBase64 ? [{ data: body.immagineBase64, mimeType: body.mimeType }] : [];
  if (lista.length > MAX_FOTO) throw { status: 400, error: `Al massimo ${MAX_FOTO} foto per documento.` };
  let totale = 0;
  return lista.map((im) => {
    const data = typeof im?.data === "string" ? im.data : "";
    const mime = TIPI_IMMAGINE.includes(im?.mimeType) ? im.mimeType : "image/jpeg";
    if (!data || !/^[A-Za-z0-9+/=]+$/.test(data.slice(0, 200))) throw { status: 400, error: "Foto non valida." };
    totale += data.length;
    if (totale > MAX_BASE64_TOTALE) throw { status: 413, error: "File troppo grandi." };
    return { inline_data: { mime_type: mime, data } };
  });
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  if (origineAmmessa(origin, host)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  }
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Metodo non consentito" });
  if (!origineAmmessa(origin, host)) return res.status(403).json({ error: "Origine non ammessa" });

  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "?").split(",")[0].trim();
  if (superaLimite(ip)) return res.status(429).json({ error: "Troppe richieste: riprova tra qualche minuto." });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const testo = s(body.testo, MAX_TESTO);
    const lingua = s(body.lingua, 40) || "italiano semplice";
    const immagini = leggiImmagini(body);
    if (!testo && !immagini.length) return res.status(400).json({ error: "Scrivi un dubbio o aggiungi una foto." });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY mancante" });
    const modello = process.env.GEMINI_MODEL || MODELLO_DEFAULT;

    const parts = [...immagini, {
      text: immagini.length
        ? `Le immagini e i PDF allegati sono le pagine di UN documento, in ordine.${testo ? "\nDomanda o testo aggiunto dalla persona:\n" + testo : "\nSpiegalo in modo diretto e pratico."}`
        : "Dubbio o testo della persona:\n" + testo,
    }];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modello)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: istruzioni(lingua, new Date().toISOString().slice(0, 10)) }] },
          contents: [{ role: "user", parts }],
          generationConfig: {
            response_mime_type: "application/json",
            temperature: 0.2,
            maxOutputTokens: 4096,
            thinkingConfig: { thinkingLevel: "LOW" },
          },
        }),
      }
    );

    const raw = await response.text();
    let data;
    try { data = JSON.parse(raw); } catch { return res.status(502).json({ error: "Risposta non valida dal servizio di analisi" }); }
    if (!response.ok) {
      const msg = data?.error?.message || "HTTP " + response.status;
      const status = [429, 503].includes(response.status) ? response.status : 502;
      return res.status(status).json({ error: msg });
    }
    const cand = data?.candidates?.[0];
    if (cand?.finishReason === "MAX_TOKENS") return res.status(502).json({ error: "Documento troppo lungo: prova con meno pagine." });
    const text = (cand?.content?.parts || []).map((p) => p.text || "").join("");
    let parsed;
    try { parsed = JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, "")); } catch { return res.status(502).json({ error: "JSON non valido dal modello" }); }
    const out = normalizza(parsed);
    if (!out.in_parole_semplici) return res.status(502).json({ error: "Spiegazione vuota" });
    return res.status(200).json(out);
  } catch (e) {
    if (e && e.status) return res.status(e.status).json({ error: e.error });
    return res.status(500).json({ error: "Errore interno" });
  }
}
