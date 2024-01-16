# Adorea Coding challenge: Fake ECommerce

---

## **Tabelle dei contenuti**

-   [Richiesta](#richiesta)
-   [Scelte implementative](#scelte-implementative)
-   [Installazione ed esecuzione del progetto](#install-execution)
-   [Pagine implementate](#pagine-implementate)
-   [Migliorie](#migliorie)
-   [Conclusioni](#conclusioni)

---

### Stack

-   NodeJS v20.9.0
-   pnpm v8.9.0
-   NextJS v14.0.4
-   React v18
-   json-server v0.17.4 (su github sono presenti anche versioni superiori, ma essendo in versione alpha non mi sono fidato 😅)

---

<a id="richiesta"></a>

### Richiesta

La richiesta è quella di implementare un paio di pagine di un ipotetico e-commerce: nello specifico viene richiesto di implementare, almeno, una pagina di lista prodotti e una pagina che mostra il contenuto del carrello. Le azioni da implementare sono quelle di aggiunta/rimozione prodotto nel/dal carrello.

---

<a id="scelte-implementative"></a>

### Scelte implementative

In questa sezione vengono esposte le scelte implementative fatte e le motivazioni che stanno dietro ad ogni scelta.

#### Il framework

Essendo un ecommerce, per la realizzazione del progetto è stato usato il framework react NextJS (v14.x) in modo tale da privilegiare la SEO e le performance, grazie all'utilizzo di **Server Side Rendering** e **Server Actions**.

#### Il linguaggio

Il linguaggio utilizzato col framework è **Typescript** in quanto rende più sicuro il codice scritto permettendo di intercettare diversi errori a compile time, anzichè a runtime come con JavaScript, e permette anche di scrivere codice più semantico grazie all'uso di oggetti, in questo modo gli sviluppatori che arrivano sul progetto hanno una comprensione del codice più accelerata e quindi possono concentrarsi maggiormente sull'aspetto funzionale piuttosto che quello tecnico.

#### Package manager

Come package manager è stato utilizzato PNPM al posto di NPM o di YARN in quanto PNPM risulta essere più performante in termini di velocità di installazione, gestione delle dipendenze e spazio su disco occupato.

#### Le dipendenze utilizzate

Le dipendenze installate, degne di nota, sono

-   **eslint, prettier**: per avere una formattazione uniforme del codice, molto utile se sul progetto lavorano persone diverse, in questo modo permette di avere il codice uniformemente formattato e in fase di code review non si hanno fastidiose changes di sola formattazione che rendono la review più lunga e/o difficile
-   **husky**: utility che permette di eseguire il lint nello stage di pre-commit di git, ovvero prima di fare il commit viene eseguito il lint (solo sui file in area di stage) in modo da assicurarsi di avere un commit pulito senza problemi di formattazione. **husky** è particolarmente utile perchè permette di rendere trasparente l'uso di prettier e eslint allo sviluppatore: senza husky è necessario far configurare l'IDE a seguire le regole di formattazione definite ad ogni sviluppatore che entra sul progetto, mentre husky rende trasparente questa cosa e lo fa in automatico.
-   **tailwind**: per velocizzare la realizzazione della UI è stata utilizzata questa dipendenza che rende molto semantico la scrittura di CSS tramite l'utilizzo di semplici classi. Permette di rendere lo sviluppo di UI molto più veloce e facile ma ha dei costi da tenere in considerazione: sporca l'html con le diverse classi CSS (potrebbe dare fastidio), ed è comunque una dipendenza in più del progetto che sarà da mantenere. Una mia piccola regola personale è quella di installare dipendenze solo se strettamente necessarie.

#### JSON SERVER

Link github https://github.com/typicode/json-server/tree/v0.17.4

**json-server** è una dipendenza che ho installato per simulare la comunicazione con un server creato al volo. Mi sono reso conto che utilizzando le API di, ad esempio, https://dummyjson.com/ avevo solamente la possibilità di effettuare chiamate vere in GET, mentre le chiamate in POST, PUT, PATCH e DELETE sono, ovviamente, tutte finte, nel senso che viene simulata una risposta dal server ma niente viene persistito. Volevo rendere l'ecommerce sviluppato quanto più verosimile possibile e per fare le feature di aggiunta/rimozione prodotti dal carrello stavo utilizzando la localstorage che però mi stava portando ad un utilizzato completamente sbagliato del framework NextJS, facendo un abuso di componenti con 'use client' (componenti client side, in quanto lo storage è una feature del browser che ovviamente sul server non c'è) e non sfruttando quindi tutte le ottimizzazioni messe a disposizione.

**json-server** è molto semplice da utilizzare, una volta installata la dipendenza è necessario creare un file **db.json** che fungerà da database, tutte le chiamate HTTP verranno fatte andando a leggere e scrivere su questo file, in questo modo ho potuto sfruttare a pieno il framework utilizzando i componenti client-side solamente quando necessario (ad esempio i diversi click sui vari bottoni per aggiungere/rimuovere prodotti da carrello e per modificare la quantità), mentre tutte le chiamate HTTP vengono fatte server side, e di conseguenza sono più veloci e più sicure, visto che nella console del browser non compaiono.

---

<a id="install-execution"></a>

### Installazione ed esecuzione

Per installare le dipendenze è necessario avere installato sulla proprio macchina pnpm, dopodichè i comandi da eseguire sono

-   `pnpm install` per installare le dipendenze
-   `npm run dev` per eseguire il progetto

> NB: Nessuno vieta di non usare pnpm ed utilizzare il classico npm (o yarn), probabilmente la prima installazione potrebbe essere più lenta perché dovrà crearsi pure il relativo \*-lock file. In un progetto reale probabilmente, però, avrei messo uno scripts che impedisce di usare package manager diversi da pnpm, così da essere tutti allineati e creare meno confusione possibile.

> NB2: Lo script "dev" è fatto in questo modo
>
> `concurrently --kill-others "npx json-server --watch db.json --port 3001 --delay 2000" "next dev"`.
>
> Praticamente grazie a [concurrently](https://github.com/open-cli-tools/concurrently) si eseguono in console due processi:
>
> 1. il primo quello che avvia json-server (col flag _--watch_ per stare in ascolto dei cambiamenti in sul file db.json in modo tale che lo possiamo editare il senza la necessità di riavviare il tutto) sulla porta 3001 (la 3000 la prende nextjs). Il flag _--delay 2000_ serve ad aggiungere un delay su tutte le chiamate, in modo da simulare latenza di rete.
> 2. il secondo, `next dev`, semplicemente avvia l'applicazione next in **development** mode.

---

<a id="pagine-implementate"></a>

### Pagine implementate

Le seguenti pagine sono state implementate:

-   **/** lista di prodotti: in questa pagina viene caricata la lista di prodotti. Per la lista è stata implementata la paginazione e ad ogni cambio di pagina l'URL viene aggiornato con la pagina che stiamo visualizzando. se avessi dovuto implemetare anche filtri di ricerca e ordinamento avrei usato la solita tecnica in quanto permette di creare link salvabili e condivisibili. Pagina che si apre appena l'applicazione viene avviata, in alternativa è sempre possibile navigare su questa pagina tramite click sul logo posto nell'header del sito;
-   **/[category]/[seoURL]/[id]** per la pagina di dettaglio prodotto ho sfruttato le rotte dinamiche in modo da creare un url che sia SEO friendly. In questa pagina, oltre a visualizzare il dettaglio del prodotto con alcune informazioni di base è possibile pure aggiungere il prodotto al carrello. L'azione viene fatta tramite una server action, quindi è eseguita lato server (velocità e maggiore sicurezza). Pecularietà: nel metodo che si occupa di aggiungere il prodotto al carrello faccio prima un controllo per vedere se ho già quel prodotto nel carrello e se così fosse faccio una patch della quantità del prodotto, altrimenti lo aggiungo semplicemente. È possibile arrivare su questa pagina tramite click sulla card del prodotto nella pagina di lista.
-   **/carrello** In questa pagina è possibile vedere tutti i prodotti che sono stati aggiunti al carrello e vedere il totale da pagare. Su ogni prodotto è possibile modificare la quantità (ho fatto la scelta di avere una quantità minima di 1, quindi il tastino "-" risulta disabilitato per evitare di andare a 0 o, peggio, su valori negativi) e rimuovere il prodotto dal carrello. È sempre possibile arrivare su questa pagina attraverso il click sull'iconcina del carrello posta sull'header del sito.

---

<a id="conclusioni"></a>

### Conclusioni

Sviluppare questo semplice progettino mi ha permesso di conoscere un po' meglio la versione 14 di NextJS e ho avuto la possibilità di sperimentare con le server action.

Per la parte di UI mi sono basato su gusto personale ma ammetto di aver "spiato" altri siti di ecommerce (stroilli, hollister, casio, cotton&silk) per avere spunti per la realizzazione delle diverse pagine.

In un progetto di sviluppo di un ecommerce reale presterei particolarmente attenzione alla gestione della cache delle diverse chiamate e la sua rivalidazione, in modo da sfruttare al massimo le potenzialità del framework. Attenzione ai metadati delle diverse pagine. Attenzione allo sviluppo delle pagine del sito utilizzato il tipo di rendering più adatto, quindi sfruttare i diversi tipi di rendering di NextJS come SSR, SSG, ISR o CSR. Tutte queste attenzioni favoriscono una migliore SEO e un punteggio più alto dei diversi crawler per avere una migliore indicizzazione nei risultati di ricerca.

Lato tecnico/sviluppo cercherei di seguire pattern di sviluppo condivisi in modo da essere più produttivi nello sviluppo software e sicuramente implementerei una qualche pipeline di CI/CD per automatizzare le procedure di rilascio. Cercherei anche di coprire il più possibile l'applicazione con test automatici in modo da cercare di ridurre al minimo il rischio di regressioni.
