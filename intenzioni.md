# NASA70 — Documento di Intenzioni del Progetto

Questo documento descrive le intenzioni del progetto **NASA70**, definendone l'idea di base, la struttura dei contenuti e il target di riferimento.

---

## 1. Idea di Base
In occasione del 70° anniversario della fondazione della NASA (National Aeronautics and Space Administration), il progetto si propone di realizzare una piattaforma web celebrativa e istituzionale di terze parti. L'obiettivo principale è la creazione di un **archivio globale di visual design**, volto a raccogliere e mostrare al pubblico opere e progetti di comunicazione visiva, grafica e illustrativa provenienti da designer e artisti di tutto il mondo.

A differenza di un portfolio personale, la piattaforma si configura come un archivio pubblico, collaborativo e istituzionale per celebrare l'impatto scientifico, tecnologico e visivo delle missioni spaziali. 

Dal punto di vista del design, l'interfaccia adotta il codice comunicativo, i colori e i pattern strutturali della comunicazione ufficiale della NASA, garantendo un'esperienza utente immersiva, autorevole e familiare.

---

## 2. Contenuti e Relativa Strutturazione
L'applicazione web è strutturata per guidare l'utente attraverso una narrazione sia visiva/interattiva che informativa/funzionale.

### A. Landing Page ed Effetti Particellari (`index.html`)
*   **Animazione Generativa**: All'accesso, un sistema di punti dinamici si scompone e si ricompone via codice per formare visivamente quattro grandi tappe storiche dell'esplorazione spaziale:
    1.  **L'Allunaggio (Programma Apollo)**
    2.  **Curiosity Rover**
    3.  **La sonda Voyager**
    4.  **Lo Space Shuttle Columbia**
*   **Call to Action**: Un pulsante dedicato consente di accedere direttamente all'archivio dei progetti.

### B. Esplorazione della Home Page (`index.html` - Scrolling)
Proseguendo con lo scorrimento della pagina, l'utente incontra:
*   **About this Archive**: La sezione descrittiva che spiega la genesi, le motivazioni e lo scopo del portale.
*   **Curated Showcase**: Una selezione curata dei migliori progetti grafici scelti da esperti del settore.
*   **Project of the Day**: Un progetto singolo messo in evidenza giornalmente per dare visibilità ai singoli contributori.

### C. Archivio Completo dei Progetti (`archive.html`)
L'archivio è progettato per facilitare la ricerca e l'esplorazione:
*   **Layout a Schede (Cards)**: Griglia per la visualizzazione delle anteprime dei progetti.
*   **Filtri e Ricerca**:
    *   Una barra di ricerca testuale sulla sinistra.
    *   Un sistema di filtri basato su tag per categoria.
    *   Un menu a discesa in alto a destra per l'ordinamento (es. alfabetico, data, popolarità).
*   **Caricamento Ottimizzato (Lazy Loading)**: Mostra un massimo di 15 card alla volta, espandibili cliccando sul pulsante "Load more" per garantire performance fluide.
*   **Dettaglio Progetto**: Cliccando su ciascuna scheda si apre una vista a schermo intero dedicata al singolo progetto, con immagini e descrizioni dettagliate.

---

## 3. Design dell’interfaccia e modalità di interazione
Il layout e la struttura visiva del sito sono stati progettati per integrarsi coerentemente con l'identità istituzionale della NASA, adottando elementi moderni e ad alta leggibilità.

*   **Tipografia**:
    *   **Inter**: Utilizzato come carattere principale per l'intera interfaccia (titoli, testi, etichette e dati tecnici) per garantire un aspetto pulito, moderno e altamente leggibile.
    *   **Material Symbols Outlined**: Utilizzati per le icone e i simboli visivi del sistema.
*   **Palette Cromatica**:
    *   `#E03A3E` (**Nasa Red**): Il colore rosso ufficiale per i dettagli significativi, le chiamate all'azione (CTA) e gli stati attivi o hover.
    *   `#080808` / `#000000` (**Space Black / Surface**): Sfondi scuri e profondi che richiamano lo spazio profondo, riducendo l'affaticamento visivo e facendo risaltare i contenuti multimediali.
    *   `#102030` (**Void Blue / Primary Container**): Un blu scuro profondo per i contenitori e i pannelli informativi secondari.
    *   `#e2e2e2` (**On Surface**) e `#FFFFFF` (**Stellar White**): Colori ad alto contrasto per testi, titoli ed icone.
    *   `#F1C40F` (**Caution Yellow**) e `#2ECC71` (**Telemetry Green**): Colori d'accento per stati speciali e dati telemetrici.

---

## 4. Target del Progetto
Il portale è rivolto a due macro-categorie di destinatari:

*   **Appassionati di Spazio, Scienza e Astronomia**: Utenti che desiderano esplorare e rivivere le pietre miliari dell'esplorazione spaziale attraverso interpretazioni artistiche e grafiche alternative, suggestive ed emozionanti.
*   **Visual Designer, Grafici e Creativi**: Una community internazionale di professionisti e studenti interessati a scoprire approcci visivi innovativi, tendenze estetiche, l'uso della tipografia ed esperimenti di interaction design applicati a una tematica istituzionale e scientifica.
