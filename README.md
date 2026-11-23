# Chiaro

Documenti, bollette, lettere e dubbi spiegati in parole semplici: cosa significano, le scadenze, i soldi in gioco e il prossimo passo.

App web installabile (PWA) + una funzione server su Vercel che usa Google Gemini.

## Configurazione su Vercel

Variabili d'ambiente:

| Nome | Obbligatoria | Descrizione |
|---|---|---|
| `GEMINI_API_KEY` | sì | Chiave API di Google Gemini |
| `GEMINI_MODEL` | no | Modello da usare (default `gemini-3.5-flash-lite`) |
| `ALLOWED_ORIGINS` | no | Domini extra da cui accettare richieste, separati da virgola (es. `https://www.chiaro.it`). Il dominio su cui gira l'app è sempre ammesso. |

## Protezioni della funzione `/api/analizza-chiaro`

- accetta richieste solo dal sito dell'app (controllo dell'origine);
- limite di 20 richieste ogni 10 minuti per indirizzo IP (per singola istanza: per un limite globale serve un archivio condiviso, es. Vercel KV / Upstash);
- massimo 5 foto e circa 3 MB di immagini per richiesta (l'app riduce le foto prima di inviarle);
- la risposta del modello viene validata e ripulita prima di arrivare all'app.

## Privacy

Le foto vengono inviate a Google Gemini solo per l'analisi e l'app non le conserva; archivio e scadenze restano sul telefono (localStorage).
Con il piano gratuito delle API Gemini, Google può usare i contenuti inviati per migliorare i propri servizi: prima di aprire l'app al pubblico usa un piano a pagamento e pubblica un'informativa privacy.

## Regole italiane e "Cosa mi spetta?"

Le regole che fanno risparmiare (multe, bollette, fisco, contratti…) sono in `api/analizza-chiaro.js` (`REGOLE`); soglie e importi di "Cosa mi spetta?" sono in `index.html` (`calcolaSpetta`). Sono aggiornati alla normativa nota per il 2025 e vanno ricontrollati a ogni legge di bilancio, idealmente da un CAF o un patronato.
