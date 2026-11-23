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
 "azione_pronta": {"titolo_azione":"titolo breve","testo_copiabile":"lettera, email o reclamo pronto con segnaposto [NOME], indicando all'inizio a chi inviarlo e come (PEC, raccomandata, modulo online)"},
 "contatti": {"telefono":"numero da chiamare scritto nel documento","email":"","pec":"","orari":"orari del servizio clienti"},
 "telefonata_utile": true se ha senso telefonare per contestare, chiedere una rettifica, una rateizzazione o chiarimenti,
 "modulo": null oppure, SOLO se il documento è un modulo da compilare, {
   "nome":"nome del modulo",
   "campi":[{"etichetta":"nome del campo come è scritto sul modulo","spiegazione":"cosa chiede, in parole semplici","cosa_scrivere":"cosa scrivere o un esempio","dove_trovarlo":"dove trovare il dato (carta d'identità, tessera sanitaria, busta paga...)","tipo":"testo|data|codice_fiscale|iban|email|telefono|numero|scelta|firma","obbligatorio":true/false}],
   "allegati":["documenti da allegare"],
   "come_consegnarlo":"dove e come consegnarlo, entro quando"
 },
 "bolletta": null oppure, SOLO per bollette di luce o gas, {
   "servizio":"luce|gas","fornitore":"nome","offerta":"nome dell'offerta",
   "periodo_da":"AAAA-MM-GG","periodo_a":"AAAA-MM-GG",
   "consumo_periodo": numero (kWh per la luce, Smc per il gas, consumo FATTURATO nel periodo),
   "consumo_annuo": numero o null (il "consumo annuo" indicato in bolletta),
   "totale": numero (totale da pagare della bolletta, IVA inclusa),
   "prezzo_materia": numero o null (prezzo unitario della sola componente energia/materia prima in €/kWh o €/Smc, SENZA rete, oneri e imposte; se ci sono più fasce usa la media),
   "tipo_prezzo":"fisso|variabile|tutela|non_chiaro",
   "spread": numero o null (per le offerte variabili, la maggiorazione sul PUN o PSV in €/kWh o €/Smc),
   "quota_fissa_mese": numero o null (quota fissa di vendita/commercializzazione in € al mese; se è annua dividi per 12),
   "potenza_kw": numero o null (potenza impegnata, solo luce),
   "fasce": {"F1":percentuale,"F2":percentuale,"F3":percentuale} o null,
   "fine_prezzo_bloccato":"AAAA-MM-GG o null",
   "bonus_sociale": true se applicato,
   "bollette_precedenti": [{"periodo_da":"AAAA-MM-GG","periodo_a":"AAAA-MM-GG","consumo_periodo":numero,"totale":numero,"prezzo_materia":numero o null}] (se tra i file ci sono più bollette dello stesso servizio, metti qui le più vecchie e usa la più recente per i campi sopra; altrimenti lista vuota),
   "soluzioni":["consigli concreti per spendere meno basati su QUESTI numeri: offerta e prezzo, potenza impegnata, fasce orarie, scadenza del prezzo bloccato, bonus sociale, consumi anomali, rateizzazione"]
 }
}
Se non serve scrivere a nessuno imposta "azione_pronta": null. Se non è una bolletta di luce o gas imposta "bolletta": null. Se non è un modulo da compilare imposta "modulo": null; se lo è, elenca TUTTI i campi da compilare nell'ordine del modulo. Liste vuote se non pertinenti. Nei numeri usa il punto decimale.`;

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
  out.bolletta = normalizzaBolletta(j?.bolletta);
  out.modulo = normalizzaModulo(j?.modulo);
  out.contatti = { telefono: s(j?.contatti?.telefono, 60), email: s(j?.contatti?.email, 120), pec: s(j?.contatti?.pec, 120), orari: s(j?.contatti?.orari, 200) };
  out.telefonata_utile = !!j?.telefonata_utile;
  // compatibilità con le versioni precedenti dell'app (archivio e scadenze)
  const prima = out.scadenze.find((x) => x.data) || out.scadenze[0];
  out.scadenza_testo = prima ? `${prima.cosa}${prima.data ? " entro il " + prima.data.split("-").reverse().join("/") : prima.giorni_da_ricezione ? ` entro ${prima.giorni_da_ricezione} giorni dalla ricezione` : ""}` : "Nessuna scadenza fissa";
  return out;
}

const dataIso = (v) => (/^\d{4}-\d{2}-\d{2}$/.test(v || "") ? v : null);
const pos = (v) => { const n = num(v); return n != null && n > 0 ? n : null; };
export function normalizzaBolletta(b) {
  if (!b || typeof b !== "object") return null;
  const servizio = scegli(b.servizio, ["luce", "gas"], null);
  if (!servizio) return null;
  let prezzo = pos(b.prezzo_materia);
  if (prezzo != null && prezzo > (servizio === "luce" ? 2 : 5)) prezzo = null;         // quasi certamente non è un prezzo unitario
  let quota = pos(b.quota_fissa_mese);
  if (quota != null && quota > 60) quota = Math.round((quota / 12) * 100) / 100;        // indicata all'anno
  const fasce = b.fasce && typeof b.fasce === "object" ? { F1: num(b.fasce.F1), F2: num(b.fasce.F2), F3: num(b.fasce.F3) } : null;
  return {
    servizio, unita: servizio === "luce" ? "kWh" : "Smc",
    fornitore: s(b.fornitore, 120), offerta: s(b.offerta, 160),
    periodo_da: dataIso(b.periodo_da), periodo_a: dataIso(b.periodo_a),
    consumo_periodo: pos(b.consumo_periodo), consumo_annuo: pos(b.consumo_annuo), totale: pos(b.totale),
    prezzo_materia: prezzo, tipo_prezzo: scegli(b.tipo_prezzo, ["fisso", "variabile", "tutela", "non_chiaro"], "non_chiaro"),
    spread: num(b.spread), quota_fissa_mese: quota, potenza_kw: pos(b.potenza_kw),
    fasce: fasce && (fasce.F1 != null || fasce.F2 != null || fasce.F3 != null) ? fasce : null,
    fine_prezzo_bloccato: dataIso(b.fine_prezzo_bloccato), bonus_sociale: !!b.bonus_sociale,
    bollette_precedenti: arr(b.bollette_precedenti).slice(0, 6).map((p) => ({
      periodo_da: dataIso(p?.periodo_da), periodo_a: dataIso(p?.periodo_a), consumo_periodo: pos(p?.consumo_periodo), totale: pos(p?.totale), prezzo_materia: pos(p?.prezzo_materia),
    })).filter((p) => p.consumo_periodo && p.totale),
    soluzioni: arr(b.soluzioni).map((x) => s(x, 400)).filter(Boolean).slice(0, 6),
  };
}

const TIPI_CAMPO = ["testo", "data", "codice_fiscale", "iban", "email", "telefono", "numero", "scelta", "firma"];
export function normalizzaModulo(m) {
  if (!m || typeof m !== "object") return null;
  const campi = arr(m.campi).filter((c) => c && s(c.etichetta)).slice(0, 60).map((c) => ({
    etichetta: s(c.etichetta, 200), spiegazione: s(c.spiegazione, 400), cosa_scrivere: s(c.cosa_scrivere, 300),
    dove_trovarlo: s(c.dove_trovarlo, 200), tipo: scegli(c.tipo, TIPI_CAMPO, "testo"), obbligatorio: c.obbligatorio !== false,
  }));
  if (!campi.length) return null;
  return { nome: s(m.nome, 200), campi, allegati: arr(m.allegati).map((x) => s(x, 300)).filter(Boolean).slice(0, 12), come_consegnarlo: s(m.come_consegnarlo, 600) };
}

/* ---------- "Preparami alla telefonata" ---------- */
const istruzioniTelefonata = (lingua) => `Sei il motore di "Chiaro". Prepari una persona comune a una telefonata con un'azienda o un ufficio italiano per contestare, chiedere una rettifica, una rateizzazione o chiarimenti su un documento.
Scrivi in ${lingua}, frasi brevi e pratiche. Le frasi da DIRE al telefono ("apertura", "tu_rispondi") scrivile in italiano, perché l'operatore parla italiano.
Usa solo i dati della scheda; non inventare numeri di telefono, importi o norme. Se il numero non è nella scheda, indica dove trovarlo.
${REGOLE}
Restituisci ESCLUSIVAMENTE un JSON valido:
{"obiettivo":"cosa ottenere con la telefonata, in una frase",
 "chi_chiamare":"servizio da chiamare","numero":"numero se presente nella scheda, altrimenti stringa vuota","quando":"orari o momento migliore",
 "prepara":["dati e documenti da avere davanti: codice cliente, numero fattura, POD, ecc."],
 "apertura":"frase esatta per iniziare la chiamata",
 "punti":["cose da dire, in ordine"],
 "se_dicono":[{"operatore":"risposta tipica dell'operatore","tu_rispondi":"cosa rispondere"}],
 "chiedi_sempre":["numero di pratica o reclamo","nome dell'operatore", "conferma scritta via email"],
 "se_non_risolvi":["passi successivi: reclamo scritto, PEC, conciliazione, associazione consumatori"]}`;
export function normalizzaTelefonata(j) {
  const lista = (v, n = 8) => arr(v).map((x) => s(x, 400)).filter(Boolean).slice(0, n);
  return {
    obiettivo: s(j?.obiettivo, 300), chi_chiamare: s(j?.chi_chiamare, 200), numero: s(j?.numero, 60).replace(/[^\d+ ./-]/g, ""), quando: s(j?.quando, 200),
    prepara: lista(j?.prepara), apertura: s(j?.apertura, 600), punti: lista(j?.punti),
    se_dicono: arr(j?.se_dicono).filter((x) => x && s(x.operatore) && s(x.tu_rispondi)).slice(0, 6).map((x) => ({ operatore: s(x.operatore, 300), tu_rispondi: s(x.tu_rispondi, 500) })),
    chiedi_sempre: lista(j?.chiedi_sempre, 6), se_non_risolvi: lista(j?.se_non_risolvi, 6),
  };
}

async function chiamaGemini({ apiKey, modello, sistema, parts, maxTokens }) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modello)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: sistema }] },
        contents: [{ role: "user", parts }],
        generationConfig: { response_mime_type: "application/json", temperature: 0.2, maxOutputTokens: maxTokens, thinkingConfig: { thinkingLevel: "LOW" } },
      }),
    }
  );
  const raw = await response.text();
  let data;
  try { data = JSON.parse(raw); } catch { return { status: 502, error: "Risposta non valida dal servizio di analisi" }; }
  if (!response.ok) return { status: [429, 503].includes(response.status) ? response.status : 502, error: data?.error?.message || "HTTP " + response.status };
  const cand = data?.candidates?.[0];
  if (cand?.finishReason === "MAX_TOKENS") return { status: 502, error: "Documento troppo lungo: prova con meno pagine." };
  const text = (cand?.content?.parts || []).map((p) => p.text || "").join("");
  try { return { json: JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, "")) }; } catch { return { status: 502, error: "JSON non valido dal modello" }; }
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
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY mancante" });
    const modello = process.env.GEMINI_MODEL || MODELLO_DEFAULT;

    if (body.azione === "telefonata") {
      // usa solo la scheda già prodotta: le foto non vengono rimandate
      const scheda = body.scheda && typeof body.scheda === "object" ? JSON.stringify(body.scheda).slice(0, 20000) : "";
      if (!scheda) return res.status(400).json({ error: "Manca la scheda del documento." });
      const r = await chiamaGemini({ apiKey, modello, sistema: istruzioniTelefonata(lingua), maxTokens: 4096,
        parts: [{ text: "Scheda del documento (JSON):\n" + scheda + (testo ? "\n\nCosa vuole ottenere la persona:\n" + testo : "") }] });
      if (r.error) return res.status(r.status).json({ error: r.error });
      const out = normalizzaTelefonata(r.json);
      if (!out.apertura && !out.punti.length) return res.status(502).json({ error: "Copione vuoto" });
      return res.status(200).json(out);
    }

    const immagini = leggiImmagini(body);
    if (!testo && !immagini.length) return res.status(400).json({ error: "Scrivi un dubbio o aggiungi una foto." });

    const parts = [...immagini, {
      text: immagini.length
        ? `Le immagini e i PDF allegati sono le pagine di UN documento, in ordine.${testo ? "\nDomanda o testo aggiunto dalla persona:\n" + testo : "\nSpiegalo in modo diretto e pratico."}`
        : "Dubbio o testo della persona:\n" + testo,
    }];

    const r = await chiamaGemini({ apiKey, modello, sistema: istruzioni(lingua, new Date().toISOString().slice(0, 10)), parts, maxTokens: 8192 });
    if (r.error) return res.status(r.status).json({ error: r.error });
    const parsed = r.json;
    const out = normalizza(parsed);
    if (!out.in_parole_semplici) return res.status(502).json({ error: "Spiegazione vuota" });
    return res.status(200).json(out);
  } catch (e) {
    if (e && e.status) return res.status(e.status).json({ error: e.error });
    return res.status(500).json({ error: "Errore interno" });
  }
}
