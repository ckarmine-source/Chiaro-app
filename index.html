<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Chiaro</title>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#1d4ed8" />
  <style>
    :root {
      --bg: #f1f5f9;
      --card: #ffffff;
      --text: #0f172a;
      --muted: #64748b;
      --primary: #1d4ed8;
      --primary-dark: #1e3a8a;
      --border: #e2e8f0;
      --soft-blue: #eff6ff;
      --danger: #dc2626;
      --green: #047857;
      --soft-green: #ecfdf5;
      --mark: #fef08a;
    }
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 0 0 calc(92px + env(safe-area-inset-bottom, 0px));
      font-size: 16px;
    }
    .hero {
      background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
      color: #fff;
      padding: 24px 18px 28px;
      border-bottom-left-radius: 24px;
      border-bottom-right-radius: 24px;
      box-shadow: 0 8px 20px rgba(30, 64, 175, 0.18);
    }
    .brand { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.16); padding: 5px 11px; border-radius: 999px; font-size: 13px; font-weight: 700; letter-spacing: 0.3px; }
    .hero h1 { font-size: 25px; margin: 12px 0 6px; line-height: 1.2; }
    .hero p { margin: 0; font-size: 14px; color: rgba(255,255,255,0.88); }
    .wrap { max-width: 620px; margin: 0 auto; padding: 16px; }
    .action-card { width: 100%; display: flex; align-items: center; gap: 14px; text-align: left; padding: 16px; border-radius: 18px; border: 1px solid var(--border); background: var(--card); margin-bottom: 12px; cursor: pointer; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04); transition: transform 0.12s ease; color: var(--text); font: inherit; }
    .action-card:active { transform: scale(0.985); }
    .action-card.main { background: linear-gradient(135deg, #1d4ed8, #2563eb); color: #fff; border: none; box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25); }
    .icon-badge { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; background: var(--soft-blue); }
    .action-card.main .icon-badge { background: rgba(255,255,255,0.2); }
    .action-title { font-size: 16px; font-weight: 700; display: block; }
    .action-sub { font-size: 13px; opacity: 0.85; display: block; margin-top: 2px; }
    .sec-head { display: flex; justify-content: space-between; align-items: center; margin: 18px 2px 8px; }
    .lbl { font-size: 11px; font-weight: 800; letter-spacing: 0.6px; color: var(--muted); text-transform: uppercase; }
    .box { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 15px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03); }
    .box.blue { background: var(--soft-blue); border-color: #bfdbfe; }
    .box.green { background: var(--soft-green); border-color: #a7f3d0; }
    .box.amber { background: #fffbeb; border-color: #fde68a; }
    .pill { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background: var(--soft-blue); color: var(--primary); margin-bottom: 6px; }
    .pill.alta { background: #fee2e2; color: #b91c1c; }
    .pill.media { background: #fef3c7; color: #b45309; }
    textarea, select, input[type=date], input[type=number] { width: 100%; border: 1.5px solid #cbd5e1; border-radius: 14px; padding: 12px 13px; font-size: 16px; font-family: inherit; background: #fff; color: var(--text); }
    textarea { min-height: 110px; margin: 10px 0 12px; resize: vertical; }
    textarea:focus, select:focus, input:focus { outline: none; border-color: var(--primary); }
    .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
    .field label { font-size: 14px; font-weight: 700; }
    .file-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
    .file-box { display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px dashed #93c5fd; background: var(--soft-blue); border-radius: 14px; padding: 14px 8px; text-align: center; cursor: pointer; font-weight: 700; color: var(--primary-dark); min-height: 72px; }
    .vh { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
    .thumbs { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0 4px; }
    .thumbs img { width: 72px; height: 96px; object-fit: cover; border-radius: 10px; border: 1px solid var(--border); }
    .btn { width: 100%; padding: 15px; border-radius: 14px; border: none; background: linear-gradient(135deg, #1d4ed8, #2563eb); color: #fff; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 6px 14px rgba(37, 99, 235, 0.22); font-family: inherit; }
    .btn:disabled { opacity: 0.7; cursor: wait; }
    .btn-sec { background: #fff; color: var(--primary); border: 1.5px solid #bfdbfe; box-shadow: none; margin-top: 8px; }
    .btn-link { background: none; border: none; color: var(--muted); font-weight: 700; padding: 6px 0; cursor: pointer; font-size: 14px; font-family: inherit; }
    .btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 8px; }
    .btn-row .btn { margin-top: 0; padding: 13px 10px; font-size: 14px; }
    .btn-del { background: #fef2f2; color: var(--danger); border: 1px solid #fecaca; border-radius: 10px; padding: 6px 10px; font-size: 12px; font-weight: 700; cursor: pointer; }
    .back { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 8px 13px; font-size: 14px; font-weight: 700; margin-bottom: 12px; cursor: pointer; color: var(--text); }
    .row-between { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
    ul.list { line-height: 1.55; margin: 6px 0 0; padding-left: 20px; }
    .deadline { padding: 10px 12px; border-radius: 12px; background: #f8fafc; margin-top: 8px; }
    .deadline.soon { background: #fef2f2; }
    .deadline .when { font-weight: 700; color: var(--primary); font-size: 14px; margin-top: 2px; }
    .deadline.soon .when { color: #b91c1c; }
    .quote { background: var(--mark); color: #422006; padding: 1px 4px; border-radius: 3px; font-style: italic; font-size: 13px; }
    .save { padding: 10px 12px; border-radius: 12px; background: #fff; margin-top: 8px; border: 1px solid #a7f3d0; }
    .save .amt { color: var(--green); font-weight: 800; }
    .cert { font-size: 12px; color: var(--muted); }
    .nav { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); border-top: 1px solid var(--border); display: flex; justify-content: space-around; padding: 8px 4px calc(10px + env(safe-area-inset-bottom, 0px)); z-index: 20; }
    .nav button { background: none; border: none; font-size: 12px; font-weight: 700; color: var(--muted); cursor: pointer; padding: 6px 8px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 2px; font-family: inherit; }
    .nav button.on { color: var(--primary); background: var(--soft-blue); }
    .hidden { display: none !important; }
    .msg { background: #fef3c7; border: 1px solid #fde68a; color: #92400e; padding: 12px 14px; border-radius: 14px; font-size: 14px; margin: 12px 16px 0; }
    .note { font-size: 12px; color: var(--muted); line-height: 1.45; margin: 8px 2px; }
    .toggle { display: flex; gap: 10px; align-items: flex-start; padding: 6px 0; font-size: 15px; cursor: pointer; }
    .toggle input { width: 20px; height: 20px; margin-top: 1px; accent-color: var(--primary); flex: none; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .total { font-size: 28px; font-weight: 800; color: var(--green); }
    .toast { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(96px + env(safe-area-inset-bottom, 0px)); background: #0f172a; color: #fff; padding: 10px 16px; border-radius: 12px; font-weight: 700; font-size: 14px; z-index: 30; max-width: calc(100% - 32px); }
    .loader { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; vertical-align: middle; margin-right: 8px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @media (max-width: 380px) { .grid2 { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div id="errBox" class="msg hidden" role="alert"></div>

  <div id="v-home">
    <div class="hero">
      <div class="brand">✨ Chiaro</div>
      <h1>Cosa vuoi chiarire oggi?</h1>
      <p>Documenti, bollette, lettere e dubbi spiegati senza burocratese.</p>
    </div>

    <div class="wrap">
      <button class="action-card main" id="goDoc">
        <div class="icon-badge">📄</div>
        <div>
          <span class="action-title">Ho ricevuto un documento o un’immagine</span>
          <span class="action-sub">Scatta una foto, scegli dalla galleria o incolla il testo</span>
        </div>
      </button>

      <button class="action-card" id="goDubbio">
        <div class="icon-badge">💬</div>
        <div>
          <span class="action-title">Chiedi un dubbio quotidiano</span>
          <span class="action-sub" style="color:#64748b">Regole, costi, reclami o primi passi</span>
        </div>
      </button>

      <button class="action-card" id="goSpetta">
        <div class="icon-badge">💶</div>
        <div>
          <span class="action-title">Cosa mi spetta?</span>
          <span class="action-sub" style="color:#64748b">Bonus, esenzioni e detrazioni che forse non ricevi</span>
        </div>
      </button>

      <div class="sec-head"><span class="lbl">Prossime scadenze</span></div>
      <div id="homeScad" class="box" style="color:#64748b;font-size:14px">Nessuna scadenza con data attiva.</div>
    </div>
  </div>

  <div id="v-input" class="wrap hidden">
    <button class="back" id="back1">← Indietro</button>
    <h2 id="inTitle" style="margin:4px 0 6px;font-size:22px">Analizza</h2>
    <p id="inSub" style="margin:0 0 12px;font-size:14px;color:#64748b"></p>

    <div id="fotoWrap" class="hidden">
      <div class="file-row">
        <label class="file-box" for="cameraInput">📷 Scatta una foto</label>
        <label class="file-box" for="fotoInput">🖼️ Scegli dalla galleria</label>
      </div>
      <input type="file" accept="image/*" capture="environment" id="cameraInput" class="vh" />
      <input type="file" accept="image/*" multiple id="fotoInput" class="vh" />
      <div class="thumbs" id="thumbs"></div>
      <button class="btn-link hidden" id="clearFoto">Rimuovi le foto</button>
      <p class="note">Più pagine? Scatta una foto per pagina, una dopo l’altra (massimo 5).</p>
    </div>

    <textarea id="inTxt" placeholder="Scrivi qui il tuo dubbio o incolla il testo..."></textarea>
    <div class="field">
      <label for="lingua">Spiegamelo in</label>
      <select id="lingua">
        <option value="italiano semplice">Italiano semplice</option>
        <option value="English">English</option>
        <option value="română">Română</option>
        <option value="العربية">العربية (arabo)</option>
        <option value="shqip">Shqip (albanese)</option>
        <option value="українська">Українська</option>
        <option value="español">Español</option>
        <option value="français">Français</option>
        <option value="中文">中文 (cinese)</option>
        <option value="বাংলা">বাংলা (bengalese)</option>
      </select>
    </div>
    <button class="btn" id="btnRun">Spiegamelo in parole semplici</button>
    <p class="note">Le foto vengono inviate al servizio di intelligenza artificiale solo per l’analisi e l’app non le conserva. Chiaro dà informazioni, non consulenza legale, fiscale o medica.</p>
  </div>

  <div id="v-res" class="wrap hidden">
    <button class="back" id="back2">← Home</button>
    <div id="resBody"></div>
    <button class="btn" id="btnSave">💾 Salva in Archivio</button>
    <div class="btn-row">
      <button class="btn btn-sec" id="btnShare">📤 Condividi</button>
      <button class="btn btn-sec" id="btnDownload">⬇️ Scarica .txt</button>
    </div>
  </div>

  <div id="v-scad" class="wrap hidden">
    <h2 style="margin:4px 0 4px;font-size:22px">Scadenze</h2>
    <p style="margin:0 0 14px;font-size:13px;color:#64748b">Solo documenti con una data o un termine preciso.</p>
    <div id="listScad"></div>
  </div>

  <div id="v-spetta" class="wrap hidden"></div>

  <div id="v-arc" class="wrap hidden">
    <h2 style="margin:4px 0 4px;font-size:22px">Archivio</h2>
    <p style="margin:0 0 14px;font-size:13px;color:#64748b">Tutte le analisi e i dubbi salvati sul telefono.</p>
    <div id="listArc"></div>
  </div>

  <div class="nav">
    <button id="nHome" class="on"><span style="font-size:18px">🏠</span>Home</button>
    <button id="nScad"><span style="font-size:18px">📅</span>Scadenze</button>
    <button id="nSpetta"><span style="font-size:18px">💶</span>Mi spetta</button>
    <button id="nArc"><span style="font-size:18px">🗂️</span>Archivio</button>
  </div>
  <div id="toast" class="toast hidden"></div>

<script>
(function(){
  const KEY = "chiaro_v1", KEY_SPETTA = "chiaro_spetta_v1", API_URL = "/api/analizza-chiaro";
  const MAX_FOTO = 5, LATO_MAX = 1600;
  let items = []; try { items = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { items = []; }
  let cur = null, foto = [], modalita = "dubbio";
  const $ = (id) => document.getElementById(id);

  /* crea elementi senza mai interpretare il testo come HTML */
  function h(tag, attrs, ...figli) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === "class") e.className = v; else if (k === "style") e.style.cssText = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v === true ? "" : v);
    }
    for (const f of figli.flat()) if (f != null && f !== false) e.append(f instanceof Node ? f : String(f));
    return e;
  }

  const showErr = (m) => { const el = $("errBox"); el.textContent = m; el.classList.remove("hidden"); window.scrollTo(0, 0); };
  const clearErr = () => $("errBox").classList.add("hidden");
  const toast = (m) => { const t = $("toast"); t.textContent = m; t.classList.remove("hidden"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.add("hidden"), 2500); };
  const views = ["v-home", "v-input", "v-res", "v-scad", "v-spetta", "v-arc"];
  const openView = (id) => { clearErr(); views.forEach(v => $(v).classList.toggle("hidden", v !== id)); window.scrollTo(0, 0); };
  const setTab = (btnId) => ["nHome", "nScad", "nSpetta", "nArc"].forEach(b => $(b).classList.toggle("on", b === btnId));
  const salvaItems = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { showErr("Memoria del telefono piena: elimina qualche voce dall'archivio."); } };
  const eur = (n) => Number(n).toLocaleString("it-IT", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + " €";

  /* ---------- date e scadenze ---------- */
  const oggi = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const giorniA = (iso) => Math.round((new Date(iso + "T00:00:00") - oggi()) / 864e5);
  const addGiorni = (iso, g) => { const d = new Date(iso + "T00:00:00"); d.setDate(d.getDate() + g); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const dataIt = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  const quando = (g) => g < 0 ? "scaduta da " + (-g) + (g === -1 ? " giorno" : " giorni") : g === 0 ? "scade oggi" : g === 1 ? "scade domani" : "tra " + g + " giorni";
  const dataScadenza = (s, ricezione) => s.data || (s.giorni_da_ricezione && ricezione ? addGiorni(ricezione, s.giorni_da_ricezione) : null);

  // voci salvate con le versioni precedenti: solo testo libero
  const haScadenzaTestuale = (x) => {
    if (!x || x.tipo === "dubbio") return false;
    const s = (x.scadenza_testo ? String(x.scadenza_testo) : "").trim().toLowerCase();
    if (!s || s.includes("nessuna scadenza") || s.includes("garanzia legale") || s.includes("data di acquisto")) return false;
    return /\b(\d{1,2}[\/\-\.]\d{1,2}([\/\-\.]\d{2,4})?|\d{1,2}\s+(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)[a-z]*|\d+\s+giorn[oi]|entro\s+il)\b/i.test(s);
  };
  /* elenco scadenze di una voce: {testo, cosa, data|null, giorni|null} */
  function scadenzeDi(x) {
    if (Array.isArray(x.scadenze) && x.scadenze.length) return x.scadenze.map(s => { const d = dataScadenza(s, x.ricezione); return { cosa: s.cosa, data: d, giorni: d ? giorniA(d) : null, attesaRicezione: !d && !!s.giorni_da_ricezione, giorniDa: s.giorni_da_ricezione }; });
    return haScadenzaTestuale(x) ? [{ cosa: x.scadenza_testo, data: null, giorni: null }] : [];
  }
  const prossima = (x) => scadenzeDi(x).filter(s => s.giorni != null && s.giorni >= 0).sort((a, b) => a.giorni - b.giorni)[0] || null;
  const haScadenza = (x) => scadenzeDi(x).length > 0;

  /* ---------- testo per condividere / scaricare ---------- */
  const formattaDocumentoTesto = (d) => {
    if (!d) return "";
    const passi = Array.isArray(d.prossimo_passo) && d.prossimo_passo.length ? d.prossimo_passo.map(p => "- " + p).join("\n") : "- Nessun passo indicato";
    const sc = scadenzeDi(d).map(s => "- " + s.cosa + (s.data ? " — entro il " + dataIt(s.data) : s.giorniDa ? " — entro " + s.giorniDa + " giorni dalla ricezione" : "")).join("\n");
    const righe = ["CHIARO — RIEPILOGO", "Titolo: " + (d.titolo || "Chiarimento"), "Categoria: " + (d.categoria || "Generale"), "",
      "1. IN PAROLE SEMPLICI", d.in_parole_semplici || "", "", "2. COSA SIGNIFICA PER TE", d.cosa_significa_per_te || ""];
    if (sc) righe.push("", "SCADENZE", sc);
    if (d.importo && d.importo.da_pagare != null) righe.push("", "IMPORTO: " + eur(d.importo.da_pagare) + (d.importo.descrizione ? " (" + d.importo.descrizione + ")" : ""));
    if (Array.isArray(d.risparmi) && d.risparmi.length) righe.push("", "COME RISPARMIARE", d.risparmi.map(r => "- " + r.titolo + (r.importo ? " (" + eur(r.importo) + ")" : "") + ": " + r.spiegazione).join("\n"));
    righe.push("", "3. PROSSIMO PASSO", passi);
    const az = d.azione_pronta && d.azione_pronta.testo_copiabile;
    if (az) righe.push("", "4. BOZZA / AZIONE PRONTA", az);
    return righe.join("\n");
  };
  const nomeFilePulito = (titolo) => { const base = (titolo || "chiaro-bozza").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); return (base || "chiaro-bozza") + ".txt"; };

  /* ---------- home ---------- */
  function renderHome() {
    const sc = items.filter(x => !x.fatto).map(x => ({ x, p: prossima(x), t: haScadenza(x) })).filter(o => o.p || o.t)
      .sort((a, b) => (a.p ? a.p.giorni : 9999) - (b.p ? b.p.giorni : 9999)).slice(0, 3);
    const box = $("homeScad"); box.replaceChildren();
    if (!sc.length) { box.append("Nessuna scadenza con data attiva."); return; }
    sc.forEach(({ x, p }) => box.append(h("div", { style: "padding:6px 0;border-bottom:1px solid #f1f5f9;cursor:pointer", onclick: () => { cur = x; renderRes(cur); } },
      h("b", { style: "color:#0f172a" }, x.titolo),
      h("div", { style: "font-size:13px;font-weight:600;color:" + (p && p.giorni <= 7 ? "#b91c1c" : "#1d4ed8") }, "📅 " + (p ? dataIt(p.data) + " · " + quando(p.giorni) : x.scadenza_testo)))));
  }

  /* ---------- foto: si sommano e vengono ridotte prima dell'invio ---------- */
  function riduci(file) {
    return new Promise((ok, ko) => {
      const img = new Image(), url = window.URL.createObjectURL(file);
      img.onload = () => {
        const scala = Math.min(1, LATO_MAX / Math.max(img.naturalWidth, img.naturalHeight));
        const c = document.createElement("canvas"); c.width = Math.round(img.naturalWidth * scala); c.height = Math.round(img.naturalHeight * scala);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        window.URL.revokeObjectURL(url);
        const dataUrl = c.toDataURL("image/jpeg", 0.82);
        ok({ anteprima: dataUrl, data: dataUrl.split(",")[1], mimeType: "image/jpeg" });
      };
      img.onerror = () => { window.URL.revokeObjectURL(url); ko(new Error("immagine")); };
      img.src = url;
    });
  }
  async function aggiungiFoto(files) {
    const lista = Array.from(files || []).filter(f => /^image\//.test(f.type) || /\.(jpe?g|png|webp|heic)$/i.test(f.name));
    for (const f of lista) {
      if (foto.length >= MAX_FOTO) { toast("Massimo " + MAX_FOTO + " foto per documento"); break; }
      try { foto.push(await riduci(f)); } catch (e) { showErr("Non riesco ad aprire una delle foto. Prova a scattarla di nuovo."); }
    }
    renderThumbs();
  }
  function renderThumbs() {
    $("thumbs").replaceChildren(...foto.map((f, i) => h("img", { src: f.anteprima, alt: "Pagina " + (i + 1) })));
    $("clearFoto").classList.toggle("hidden", !foto.length);
  }
  $("cameraInput").onchange = (e) => { aggiungiFoto(e.target.files); e.target.value = ""; };
  $("fotoInput").onchange = (e) => { aggiungiFoto(e.target.files); e.target.value = ""; };
  $("clearFoto").onclick = () => { foto = []; renderThumbs(); };

  $("goDoc").onclick = () => {
    modalita = "documento"; foto = []; renderThumbs(); $("inTxt").value = "";
    $("inTxt").placeholder = "Facoltativo: aggiungi una domanda o incolla il testo del documento...";
    $("fotoWrap").classList.remove("hidden");
    $("inTitle").textContent = "Analizza documento";
    $("inSub").textContent = "Fotografa tutte le pagine, ben dritte e con buona luce, oppure incolla il testo.";
    openView("v-input");
  };
  $("goDubbio").onclick = () => {
    modalita = "dubbio"; foto = []; renderThumbs(); $("inTxt").value = "";
    $("inTxt").placeholder = "Es. Ho ricevuto un addebito strano, come posso chiedere il rimborso?";
    $("fotoWrap").classList.add("hidden");
    $("inTitle").textContent = "Chiedi un dubbio";
    $("inSub").textContent = "Ti rispondo in modo semplice e pratico.";
    openView("v-input");
  };
  const tornaHome = () => { openView("v-home"); setTab("nHome"); renderHome(); };
  $("back1").onclick = tornaHome; $("back2").onclick = tornaHome;

  /* ---------- analisi ---------- */
  $("btnRun").onclick = async () => {
    const testo = $("inTxt").value.trim();
    if (!testo && !foto.length) { showErr("Scrivi un dubbio o aggiungi una foto prima di continuare."); return; }
    const btn = $("btnRun"); btn.disabled = true; btn.innerHTML = "<span class='loader'></span>Sto analizzando...";
    clearErr();
    try {
      const payload = JSON.stringify({ testo, lingua: $("lingua").value, immagini: foto.map(f => ({ data: f.data, mimeType: f.mimeType })) });
      const invia = () => fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: payload });
      let r = await invia(), d = await r.json().catch(() => null);
      if (r.status === 503) {
        btn.innerHTML = "<span class='loader'></span>Server occupato, riprovo...";
        await new Promise(res => setTimeout(res, 1500));
        r = await invia(); d = await r.json().catch(() => null);
      }
      if (r.status === 429) { showErr(/per day|giornalier/i.test(d?.error || "") ? "Limite giornaliero raggiunto. Riprova domani." : "Troppe richieste al momento. Attendi qualche minuto prima di riprovare."); return; }
      if (r.status === 503) { showErr("Il servizio di analisi è momentaneamente occupato. Riprova tra qualche minuto."); return; }
      if (r.status === 413) { showErr("Le foto sono troppo grandi. Usa meno pagine o incolla il testo."); return; }
      if (!r.ok || !d || d.error || !d.in_parole_semplici) { showErr(d?.error && r.status < 500 ? d.error : "Analisi non disponibile. Riprova tra qualche minuto."); return; }
      cur = { id: String(Date.now()), tipo: modalita, fatto: false, lingua: $("lingua").value, ricezione: "", ...d };
      renderRes(cur);
    } catch (e) {
      showErr("Impossibile raggiungere il servizio di analisi. Controlla la connessione e riprova.");
    } finally { btn.disabled = false; btn.textContent = "Spiegamelo in parole semplici"; }
  };

  /* ---------- scheda risultato ---------- */
  function renderRes(d) {
    openView("v-res");
    const urg = (d.urgenza || "Nessuna").toLowerCase();
    const body = $("resBody"); body.replaceChildren();
    body.dir = /العربية/.test(d.lingua || "") ? "rtl" : "ltr";
    const salvato = items.some(x => x.id === d.id);
    $("btnSave").textContent = salvato ? "✓ Già in Archivio" : "💾 Salva in Archivio";

    body.append(
      h("div", null, h("span", { class: "pill" }, d.categoria || "Generale"), " ",
        d.tipo !== "dubbio" ? h("span", { class: "pill " + (urg === "alta" ? "alta" : urg === "media" ? "media" : "") }, "Urgenza: " + (d.urgenza || "Nessuna")) : null),
      h("h2", { style: "margin:4px 0 4px;font-size:22px" }, d.titolo || "Chiarimento"),
      d.mittente ? h("p", { style: "margin:0 0 12px;color:#64748b;font-size:14px" }, d.mittente) : null
    );
    if (d.nota_salute) body.append(h("div", { class: "box blue", style: "font-weight:700" }, "🩺 " + d.nota_salute));

    // scadenze
    const sc = Array.isArray(d.scadenze) ? d.scadenze : [];
    if (sc.length) {
      const box = h("div", { class: "box" }, h("div", { class: "lbl" }, "Scadenze"));
      if (sc.some(s => !s.data && s.giorni_da_ricezione)) {
        box.append(h("div", { class: "field", style: "margin:8px 0 4px", dir: "ltr" },
          h("label", { for: "ricezione" }, "Quando l’hai ricevuta? (data di notifica)"),
          h("input", { type: "date", id: "ricezione", value: d.ricezione || "", onchange: (e) => { d.ricezione = e.target.value; if (items.some(x => x.id === d.id)) salvaItems(); renderRes(d); } }),
          h("span", { class: "note", style: "margin:0" }, "Serve per calcolare la scadenza esatta.")));
      }
      sc.forEach(s => {
        const data = dataScadenza(s, d.ricezione), g = data ? giorniA(data) : null;
        box.append(h("div", { class: "deadline" + (g != null && g >= 0 && g <= 7 ? " soon" : "") },
          h("b", null, s.cosa),
          data ? h("div", { class: "when" }, "📅 " + dataIt(data) + " · " + quando(g)) : s.giorni_da_ricezione ? h("div", { class: "when" }, s.giorni_da_ricezione + " giorni da quando l’hai ricevuta") : null,
          s.citazione ? h("div", { style: "margin-top:4px;font-size:13px", dir: "ltr" }, "Sul foglio: ", h("span", { class: "quote" }, "«" + s.citazione + "»")) : null));
      });
      body.append(box);
    } else if (haScadenzaTestuale(d)) {
      body.append(h("div", { class: "box" }, h("div", { class: "lbl" }, "Scadenza"), h("div", { style: "font-weight:600;margin-top:4px" }, d.scadenza_testo)));
    }

    // soldi
    const risp = Array.isArray(d.risparmi) ? d.risparmi : [];
    const imp = d.importo && d.importo.da_pagare != null;
    if (imp || risp.length) {
      const box = h("div", { class: "box green" }, h("div", { class: "lbl", style: "color:#047857" }, "Soldi"));
      if (imp) box.append(h("div", { style: "margin-top:4px" }, "Ti chiedono ", h("b", null, eur(d.importo.da_pagare)), d.importo.descrizione ? " · " + d.importo.descrizione : ""));
      risp.forEach(r => box.append(h("div", { class: "save" },
        h("b", null, r.titolo), r.importo ? h("div", { class: "amt" }, "Risparmi " + eur(r.importo)) : null,
        h("div", { style: "font-size:14px;margin-top:2px" }, r.spiegazione),
        r.condizione ? h("div", { style: "font-size:13px;color:#475569;margin-top:2px" }, "Condizione: " + r.condizione) : null,
        h("div", { class: "cert" }, r.certezza === "alta" ? "Molto probabile" : r.certezza === "bassa" ? "Possibile ma incerto: chiedi conferma" : "Da verificare"))));
      body.append(box);
    }

    // cosa fare
    const passi = Array.isArray(d.prossimo_passo) ? d.prossimo_passo : [];
    if (passi.length) body.append(h("div", { class: "box blue" }, h("div", { class: "lbl" }, "Cosa fare adesso"), h("ul", { class: "list" }, passi.map(p => h("li", null, p)))));
    body.append(h("div", { class: "box" }, h("div", { class: "lbl" }, "In parole semplici"), h("div", { style: "line-height:1.5;margin-top:4px" }, d.in_parole_semplici || "")));
    if (d.cosa_significa_per_te) body.append(h("div", { class: "box" }, h("div", { class: "lbl" }, "Cosa significa per te"), h("div", { style: "line-height:1.5;margin-top:4px" }, d.cosa_significa_per_te)));
    if (Array.isArray(d.attenzione) && d.attenzione.length) body.append(h("div", { class: "box amber" }, h("div", { class: "lbl", style: "color:#b45309" }, "Attenzione"), h("ul", { class: "list" }, d.attenzione.map(a => h("li", null, a)))));
    if (Array.isArray(d.termini) && d.termini.length) body.append(h("details", { class: "box" }, h("summary", { style: "font-weight:700;cursor:pointer" }, "Parole difficili spiegate (" + d.termini.length + ")"),
      ...d.termini.map(t => h("div", { style: "margin-top:8px;font-size:14px" }, h("b", null, t.termine), ": " + t.significato))));
    if (d.professionista && d.professionista.serve) body.append(h("div", { class: "box" }, h("div", { class: "lbl" }, "Fatti aiutare"), h("div", { style: "margin-top:4px" }, "Rivolgiti a: ", h("b", null, d.professionista.chi || "un professionista"), d.professionista.perche ? ". " + d.professionista.perche : "")));
    if (Array.isArray(d.dati_mancanti) && d.dati_mancanti.length) body.append(h("p", { class: "note" }, "Non ho potuto leggere o mi manca: " + d.dati_mancanti.join("; ") + "."));

    // bozza
    const az = d.azione_pronta && d.azione_pronta.testo_copiabile;
    if (az) body.append(h("div", { class: "box blue", dir: "ltr" },
      h("div", { class: "lbl", style: "color:#1e40af" }, d.azione_pronta.titolo_azione || "Bozza / Azione pronta"),
      h("div", { style: "white-space:pre-wrap;font-size:14px;line-height:1.45;margin:8px 0" }, az),
      h("p", { class: "note" }, "Completa i dati tra [parentesi quadre] e rileggila prima di inviarla."),
      h("button", { class: "btn btn-sec", onclick: async () => { try { await navigator.clipboard.writeText(az); toast("Bozza copiata"); } catch (e) { toast("Seleziona e copia il testo dal riquadro"); } } }, "📋 Copia bozza")));
  }

  $("btnShare").onclick = async () => {
    if (!cur) return;
    const testo = formattaDocumentoTesto(cur);
    if (navigator.share) { try { await navigator.share({ title: cur.titolo || "Chiaro", text: testo }); return; } catch (e) { if (e && e.name === "AbortError") return; } }
    try { await navigator.clipboard.writeText(testo); toast("Riepilogo copiato negli appunti"); } catch (e) { toast("Condivisione non supportata su questo browser"); }
  };
  $("btnDownload").onclick = () => {
    if (!cur) return;
    const blob = new Blob([formattaDocumentoTesto(cur)], { type: "text/plain;charset=utf-8" });
    const u = window.URL.createObjectURL(blob);
    const a = h("a", { href: u, download: nomeFilePulito(cur.titolo) });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => window.URL.revokeObjectURL(u), 1000);
  };
  $("btnSave").onclick = () => {
    if (!cur) return;
    if (!items.some(x => x.id === cur.id)) items.unshift(cur);
    salvaItems(); renderHome(); $("btnSave").textContent = "✓ Già in Archivio";
    toast(haScadenza(cur) ? "Salvato in Archivio e Scadenze" : "Salvato in Archivio");
  };

  /* ---------- scadenze ---------- */
  function renderScadList() {
    const el = $("listScad"); el.replaceChildren();
    const lista = items.filter(haScadenza).map(x => ({ x, p: prossima(x) })).sort((a, b) => (a.x.fatto - b.x.fatto) || ((a.p ? a.p.giorni : 9999) - (b.p ? b.p.giorni : 9999)));
    if (!lista.length) { el.append(h("div", { class: "box", style: "color:#64748b" }, "Nessuna scadenza con data precisa salvata.")); return; }
    lista.forEach(({ x, p }) => {
      const sc = scadenzeDi(x);
      el.append(h("div", { class: "box row-between" },
        h("label", { style: "flex:1;cursor:pointer" },
          h("input", { type: "checkbox", checked: !!x.fatto, onchange: (e) => { x.fatto = e.target.checked; salvaItems(); renderScadList(); renderHome(); } }), " ",
          h("b", { style: x.fatto ? "text-decoration:line-through;color:#94a3b8" : "" }, x.titolo),
          ...sc.map(s => h("div", { style: "font-size:13px;margin-top:4px;margin-left:24px;color:" + (s.giorni != null && s.giorni >= 0 && s.giorni <= 7 && !x.fatto ? "#b91c1c" : "#1d4ed8") },
            "📅 " + s.cosa + (s.data ? " · " + dataIt(s.data) + " · " + quando(s.giorni) : s.attesaRicezione ? " · indica la data di ricezione" : "")))),
        h("div", { style: "display:flex;flex-direction:column;gap:6px" },
          h("button", { class: "btn-del", style: "background:#eff6ff;color:#1d4ed8;border-color:#bfdbfe", onclick: () => { cur = x; renderRes(cur); } }, "Apri"),
          h("button", { class: "btn-del", onclick: () => { if (confirm("Eliminare questa voce?")) { items = items.filter(y => y !== x); salvaItems(); renderScadList(); renderHome(); } } }, "Elimina"))));
    });
  }

  /* ---------- archivio ---------- */
  function renderArcList() {
    const el = $("listArc"); el.replaceChildren();
    if (!items.length) { el.append(h("div", { class: "box", style: "color:#64748b" }, "Archivio vuoto.")); return; }
    items.forEach(x => el.append(h("div", { class: "box row-between" },
      h("div", { style: "flex:1;cursor:pointer", onclick: () => { cur = x; renderRes(cur); } },
        h("span", { class: "pill", style: "font-size:11px" }, x.categoria || "Generale"),
        h("div", { style: "font-weight:700;font-size:15px" }, x.titolo),
        h("div", { style: "font-size:13px;color:#64748b;margin-top:3px" }, (x.in_parole_semplici || "").slice(0, 85) + "...")),
      h("button", { class: "btn-del", onclick: () => { if (confirm("Eliminare questa voce dall'archivio?")) { items = items.filter(y => y !== x); salvaItems(); renderArcList(); renderHome(); } } }, "Elimina"))));
  }

  /* ---------- cosa mi spetta: regole fisse, non generate dall'IA ----------
     Soglie e importi noti per il 2025: da aggiornare ogni anno. */
  function calcolaSpetta(a) {
    const n = (x) => Number(x) || 0, eta = n(a.eta), figli = n(a.figli21), isee = a.isee || "no";
    const iseeVal = { "<9530": 9000, "9530-15000": 12000, "15000-25000": 20000, "25000-40000": 32000, ">40000": 50000 }[isee];
    const rf = a.redditoFam || "", rp = a.redditoPers || "", out = [];
    if (figli > 0 && !a.giaAUU) out.push({ t: "Assegno unico per i figli", v: Math.round(57 * 12 * figli), testo: "Da circa 57 a circa 200 € al mese per figlio, in base all’ISEE. Senza ISEE spetta il minimo.", come: "Domanda sul sito INPS con SPID o tramite patronato (gratis). Aggiorna l’ISEE ogni anno.", cert: "alta" });
    if (isee === "no" && (figli > 0 || eta >= 65 || a.lavoro === "disoccupato" || rf === "<8263" || rf === "8263-15000")) out.push({ t: "Fai l’ISEE: è gratis", v: null, testo: "Molte agevolazioni (bonus bollette, mense, asilo, assegno unico pieno) partono solo con l’ISEE.", come: "Gratis al CAF o sul sito INPS con l’ISEE precompilato.", cert: "alta" });
    if (iseeVal && (iseeVal < 9530 || (iseeVal < 20000 && figli >= 4)) && !a.giaBonusSociale) out.push({ t: "Bonus sociale su luce, gas e acqua", v: null, testo: "Uno sconto in bolletta di alcune centinaia di euro l’anno.", come: "Arriva in automatico dopo la DSU per l’ISEE. Controlla in bolletta che sia applicato.", cert: "alta" });
    if (eta >= 65 && rf && rf !== ">36152") out.push({ t: "Esenzione ticket per età e reddito (E01)", v: null, testo: "Non paghi il ticket su visite ed esami (fino a 36,15 € a ricetta più eventuali quote regionali).", come: "Chiedi al medico di base di indicare il codice E01. In alcune Regioni va richiesta all’ASL.", cert: "alta" });
    if (a.lavoro === "disoccupato" && (rf === "<8263" || rf === "8263-15000")) out.push({ t: "Esenzione ticket per disoccupati (E02)", v: null, testo: "Per disoccupati iscritti al Centro per l’impiego con reddito familiare sotto circa 8.263 € (più alto con coniuge e figli a carico).", come: "Autocertificazione all’ASL o tramite il medico di base.", cert: "media" });
    if (a.lavoro === "pensionato" && a.pensioneMinima && eta >= 60 && (rf === "<8263" || rf === "8263-15000")) out.push({ t: "Esenzione ticket per pensione al minimo (E04)", v: null, testo: "Per chi ha almeno 60 anni, la pensione al minimo e reddito familiare basso.", come: "Chiedi all’ASL o al medico di base.", cert: "media" });
    if (eta >= 75 && rp === "<8000" && a.canoneRai) out.push({ t: "Esenzione dal canone RAI", v: 90, testo: "Con almeno 75 anni e reddito (tuo e del coniuge) fino a 8.000 € l’anno non si paga il canone.", come: "Dichiarazione all’Agenzia delle Entrate, anche tramite CAF. Per l’anno intero entro il 30 aprile.", cert: "alta" });
    if ((eta >= 65 || a.figliSotto3) && iseeVal && iseeVal < 9530) out.push({ t: "Carta acquisti", v: null, testo: "Se il tuo ISEE è sotto circa 8.000 €: 40 € al mese (480 € l’anno) per spesa e bollette.", come: "Domanda all’ufficio postale con il modulo e l’ISEE.", cert: "media" });
    if (a.nido && !a.giaNido) out.push({ t: "Bonus asilo nido INPS", v: null, testo: "Rimborso delle rette fino a circa 3.000 € l’anno, in base all’ISEE.", come: "Domanda sul sito INPS con le ricevute delle rette.", cert: "media" });
    if (a.affittoGiovane && eta >= 20 && eta < 31 && rp && rp !== ">15493") out.push({ t: "Detrazione affitto per under 31", v: 991.6, testo: "Almeno 991,60 € l’anno di tasse in meno per i primi 4 anni di affitto, con reddito fino a 15.493,71 €.", come: "Nel 730 (quadro E) o al CAF, con il contratto registrato.", cert: "alta" });
    if (a.fuoriSede) out.push({ t: "Detrazione affitto studente fuori sede", v: 500.27, testo: "19% dell’affitto fino a 2.633 €: fino a 500,27 € l’anno.", come: "Nel 730 con contratto registrato e pagamenti tracciabili.", cert: "alta" });
    if (a.mezzi) out.push({ t: "Detrazione abbonamento mezzi pubblici", v: 47.5, testo: "19% fino a 250 € di abbonamento: fino a 47,50 € l’anno.", come: "Conserva abbonamento e prova di pagamento; inseriscilo nel 730.", cert: "alta" });
    if (n(a.figliSport) > 0) out.push({ t: "Detrazione sport dei figli", v: Math.round(39.9 * n(a.figliSport) * 100) / 100, testo: "19% fino a 210 € per ogni figlio tra 5 e 18 anni: fino a 39,90 € per figlio.", come: "Ricevuta dell’associazione sportiva pagata con mezzi tracciabili; nel 730.", cert: "alta" });
    if (a.lavoro === "pensionato" && eta >= 64 && (rp === "<8000" || rp === "8000-15493")) out.push({ t: "Quattordicesima della pensione", v: null, testo: "Una somma in più a luglio per pensionati con almeno 64 anni e reddito basso. Arriva in automatico.", come: "Controlla il cedolino di luglio; se manca chiedi a un patronato.", cert: "media" });
    if (iseeVal && iseeVal < 25000) out.push({ t: "Riduzioni del Comune", v: null, testo: "Molti Comuni riducono TARI, mensa, trasporti e centri estivi per ISEE bassi.", come: "Chiedi all’Ufficio Relazioni con il Pubblico del Comune.", cert: "media" });
    return { voci: out, totale: Math.round(out.reduce((s, x) => s + (x.v || 0), 0)) };
  }
  let spetta = {}; try { spetta = JSON.parse(localStorage.getItem(KEY_SPETTA) || "{}"); } catch (e) { spetta = {}; }
  function renderSpetta() {
    const v = $("v-spetta"); v.replaceChildren();
    const salva = () => { try { localStorage.setItem(KEY_SPETTA, JSON.stringify(spetta)); } catch (e) {} renderSpettaOut(); };
    const sel = (id, label, opts) => h("div", { class: "field" }, h("label", { for: "sp-" + id }, label),
      h("select", { id: "sp-" + id, onchange: (e) => { spetta[id] = e.target.value; salva(); } }, opts.map(([val, l]) => h("option", { value: val, selected: spetta[id] === val }, l))));
    const numF = (id, label, ph) => h("div", { class: "field" }, h("label", { for: "sp-" + id }, label),
      h("input", { type: "number", inputmode: "numeric", min: "0", id: "sp-" + id, value: spetta[id] || "", placeholder: ph, oninput: (e) => { spetta[id] = e.target.value; salva(); } }));
    const chk = (id, label) => h("label", { class: "toggle" }, h("input", { type: "checkbox", checked: !!spetta[id], onchange: (e) => { spetta[id] = e.target.checked; salva(); } }), h("span", null, label));
    v.append(
      h("h2", { style: "margin:4px 0 4px;font-size:22px" }, "Cosa mi spetta?"),
      h("p", { style: "margin:0 0 14px;font-size:14px;color:#64748b" }, "Rispondi a qualche domanda: ti diciamo quali aiuti e sconti potresti ricevere e come chiederli. Le risposte restano sul telefono."),
      h("div", { class: "box" },
        h("div", { class: "grid2" }, numF("eta", "Quanti anni hai?", "es. 68"),
          sel("lavoro", "Sei…", [["", "Scegli"], ["dipendente", "Dipendente"], ["autonomo", "Autonomo"], ["pensionato", "Pensionato"], ["disoccupato", "Disoccupato"], ["studente", "Studente"], ["altro", "Altro"]])),
        h("div", { class: "grid2" }, numF("figli21", "Figli a carico sotto i 21 anni", "0"), numF("figliSport", "Di cui tra 5 e 18 anni che fanno sport", "0")),
        sel("isee", "Hai un ISEE valido?", [["no", "No, non ce l’ho"], ["<9530", "Sì, sotto 9.530 €"], ["9530-15000", "Sì, 9.530–15.000 €"], ["15000-25000", "Sì, 15.000–25.000 €"], ["25000-40000", "Sì, 25.000–40.000 €"], [">40000", "Sì, oltre 40.000 €"]]),
        h("div", { class: "grid2" },
          sel("redditoPers", "Il tuo reddito annuo lordo", [["", "Scegli"], ["<8000", "Fino a 8.000 €"], ["8000-15493", "8.000–15.500 €"], [">15493", "Oltre 15.500 €"]]),
          sel("redditoFam", "Reddito di tutta la famiglia", [["", "Scegli"], ["<8263", "Fino a 8.263 €"], ["8263-15000", "8.263–15.000 €"], ["15000-36152", "15.000–36.152 €"], [">36152", "Oltre 36.152 €"]])),
        chk("figliSotto3", "Ho un figlio sotto i 3 anni"), chk("nido", "Pago un asilo nido"),
        chk("affittoGiovane", "Vivo in affitto e ho meno di 31 anni"),
        chk("fuoriSede", "Io o un figlio a carico studiamo all’università a più di 100 km da casa e paghiamo un affitto"),
        chk("mezzi", "Pago un abbonamento a bus, treno o metro"), chk("pensioneMinima", "Ricevo la pensione al minimo"), chk("canoneRai", "Pago il canone RAI in bolletta"),
        h("div", { class: "lbl", style: "margin-top:10px" }, "Ricevi già"),
        chk("giaAUU", "Assegno unico per i figli"), chk("giaBonusSociale", "Bonus sociale in bolletta"), chk("giaNido", "Bonus asilo nido")),
      h("div", { id: "spettaOut" }));
    renderSpettaOut();
  }
  function renderSpettaOut() {
    const el = $("spettaOut"); if (!el) return; el.replaceChildren();
    if (!spetta.eta) { el.append(h("p", { class: "note" }, "Inizia dall’età: i risultati compaiono qui mentre rispondi.")); return; }
    const r = calcolaSpetta(spetta);
    if (!r.voci.length) { el.append(h("div", { class: "box" }, h("b", null, "Per ora non troviamo aiuti per te"), h("p", { class: "note" }, "Se qualcosa cambia (figli, lavoro, reddito) rifai il controllo."))); return; }
    el.append(h("div", { class: "box green" }, h("div", null, "Potresti ricevere o risparmiare almeno"), h("div", { class: "total" }, eur(r.totale) + " l’anno"),
      h("div", { class: "note", style: "margin:0" }, r.voci.length + " possibilità trovate" + (r.voci.some(v => v.v == null) ? ", più altre il cui importo dipende dalla tua situazione." : "."))));
    r.voci.forEach(v => el.append(h("div", { class: "box" },
      h("div", { class: "row-between" }, h("b", null, v.t), v.v ? h("span", { style: "color:#047857;font-weight:800;white-space:nowrap" }, eur(v.v) + "/anno") : null),
      h("div", { style: "font-size:14px;margin-top:4px" }, v.testo), h("div", { style: "font-size:14px;margin-top:4px" }, h("b", null, "Come fare: "), v.come),
      v.cert !== "alta" ? h("div", { class: "cert", style: "margin-top:4px" }, "Da verificare con un CAF o un patronato") : null)));
    el.append(h("p", { class: "note" }, "Soglie e importi in vigore nel 2025, da aggiornare ogni anno. Chiedi anche al tuo Comune e alla tua Regione: CAF e patronati controllano la tua situazione gratis."));
  }

  $("goSpetta").onclick = () => { setTab("nSpetta"); openView("v-spetta"); renderSpetta(); };
  $("nHome").onclick = () => { setTab("nHome"); renderHome(); openView("v-home"); };
  $("nScad").onclick = () => { setTab("nScad"); openView("v-scad"); renderScadList(); };
  $("nSpetta").onclick = () => { setTab("nSpetta"); openView("v-spetta"); renderSpetta(); };
  $("nArc").onclick = () => { setTab("nArc"); openView("v-arc"); renderArcList(); };

  renderHome();
  window.__chiaro = { calcolaSpetta, scadenzeDi, formattaDocumentoTesto };
})();
</script>
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => { navigator.serviceWorker.register("/sw.js").catch(() => {}); });
  }
</script>
</body>
</html>
