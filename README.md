# Adorea Coding challenge: Fake ECommerce

---

## **Tabelle dei contenuti**

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
-   json-server v0.17.4

---

<a id="scelte-implementative"></a>

### Scelte implementative

In questa sezione vengono esposte le scelte implementative fatte e le motivazioni che stanno dietro ad ogni scelta.

#### Il framework

Essendo un ecommerce, per la realizzazione del progetto è stato scelto di utilizzare il framework react NextJS (v14.x) in modo tale da privilegiare la SEO e le performance, grazie all'utilizzo di diverse feature messe a disposizione come i diversi tipi di rendering della pagine e le **Server Actions**.

#### Il linguaggio

Il linguaggio utilizzato col framework è **Typescript**. La scelta di questo linguaggio è stata una naturale scelta in modo tale da favorire la robustezza dell'applicazione prevendo molti errori che con JavaScript potrebbero presentarsi a runtime. Oltre alla robustezza dell'applicazione secondo me Typescript contribuisce a rendere anche il codice scritto più semantico e facilmente comprensibile, in questo modo il tempo speso da altri sviluppatori per comprendere il codice scritto è minore e possono concentrarsi maggiormente sugli aspetti funzionale, piuttosto che su quelli applicativi.

#### Package manager

Come package manager è stato utilizzato PNPM al posto di NPM o di YARN in quanto PNPM risulta essere più performante in termini di velocità di installazione, gestione delle dipendenze e spazio su disco occupato.

#### Le dipendenze utilizzate

Le dipendenze installate, degne di nota, sono

-   **eslint, prettier**: per avere una formattazione uniforme del codice, molto utile se sul progetto lavorano persone diverse, in questo modo permette di avere il codice uniformemente formattato e in fase di code review non si hanno fastidiose changes di sola formattazione che rendono la review più lunga e/o difficile
-   **husky**: utility che permette di eseguire il lint nello stage di pre-commit di git, ovvero prima di fare il commit viene eseguito il lint (solo sui file in area di stage) in modo da assicurarsi di avere un commit pulito senza problemi di formattazione. **husky** è particolarmente utile perchè permette di rendere trasparente l'uso di prettier e eslint allo sviluppatore: senza husky è necessario far configurare l'IDE a seguire le regole di formattazione definite ad ogni sviluppatore che entra sul progetto, mentre husky rende trasparente questa cosa e lo fa in automatico.
-   **tailwind**: per velocizzare la realizzazione della UI è stata utilizzata questa dipendenza che rende molto semantico la scrittura di CSS tramite l'utilizzo di semplici classi. Permette di rendere lo sviluppo di UI molto più veloce e facile ma ha dei costi da tenere in considerazione: sporca l'html con le diverse classi CSS (potrebbe dare fastidio), ed è comunque una dipendenza in più del progetto che sarà da mantenere. Una mia piccola regola personale è quella di installare dipendenze solo se strettamente necessarie.

#### JSON SERVER

Link github https://github.com/typicode/json-server/tree/v0.17.4

**json-server** è una dipendenza che ho installato per simulare la comunicazione con un server che viene creato "al volo". Mi sono reso conto che utilizzando API mockate, come ad esempio https://dummyjson.com/, avevo solamente la possibilità di effettuare chiamate vere in GET, mentre le chiamate in POST, PUT, PATCH e DELETE sono, ovviamente, tutte finte, nel senso che viene simulata una risposta dal server ma niente viene persistito. La mia idea era quella di sviluppare un e-commerce quanto più verosimile possibile e quindi la mia scelta è ricaduta su questa dipendenza che mi permette, in modo molto semplice, di tirare su un server sul quale è possibile fare sia operazioni di scrittura che operazioni di lettura.

L'utilizzo di **json-server** è molto semplice, una volta installata la dipendenza è necessario creare un file **db.json** che fungerà da database, tutte le chiamate HTTP verranno fatte andando a leggere e scrivere su questo file.

---

<a id="install-execution"></a>

### Installazione ed esecuzione

Per installare le dipendenze è necessario avere installato sulla propria macchina pnpm, dopodichè i comandi da eseguire sono

-   `pnpm install` per installare le dipendenze
-   `npm run dev` per eseguire il progetto

> NB: Nessuno vieta di non usare pnpm ed utilizzare il classico npm (o yarn), probabilmente la prima installazione potrebbe essere più lenta perché dovrà crearsi pure il relativo \*-lock file. In un progetto reale probabilmente, però, avrei messo uno scripts che impedisce di usare package manager diversi da pnpm, così da essere tutti allineati e creare meno confusione possibile.

> NB2: Lo script "dev" è fatto in questo modo
>
> `concurrently --kill-others "npx json-server --watch db.json --port 3001 --delay 2000" "next dev"`.
>
> Praticamente grazie a [concurrently](https://github.com/open-cli-tools/concurrently) si eseguono in console due processi:
>
> 1. il primo quello che avvia json-server (col flag _--watch_ per stare in ascolto dei cambiamenti in sul file db.json in modo tale che lo possiamo editare senza la necessità di riavviare il tutto) sulla porta 3001 (la 3000 la prende nextjs). Il flag _--delay 2000_ serve ad aggiungere un delay su tutte le chiamate, in modo da simulare latenza di rete.
> 2. il secondo, `next dev`, semplicemente avvia l'applicazione next in **development** mode.

Se si vuole eseguire la versione ottimizzata è necessario eseguire in una console a parte il comando per eseguire il server `npx json-server --watch db.json --port 3001 --delay 2000` prima di eseguire `npm run build`, in quanto questo comando fa una build dell'applicazione contattando i servizi per scaricare i dati e costruire le pagine. Una volta che il processo di build è finito è possibile eseguire `npm run start`.

---

<a id="pagine-implementate"></a>

### Pagine implementate

Le seguenti pagine sono state implementate:

-   **/** lista di prodotti: in questa pagina viene caricata la lista di prodotti. Per la lista è stata implementata la paginazione e ad ogni cambio di pagina l'URL viene aggiornato con la pagina che stiamo visualizzando. se avessi dovuto implemetare anche filtri di ricerca e ordinamento avrei usato la solita tecnica in quanto permette di creare link salvabili e condivisibili. Pagina che si apre appena l'applicazione viene avviata, in alternativa è sempre possibile navigare su questa pagina tramite click sul logo posto nell'header del sito;
-   **/[category]/[seoURL]/[id]** per la pagina di dettaglio prodotto ho sfruttato le rotte dinamiche in modo da creare un url che sia SEO friendly. In questa pagina, oltre a visualizzare il dettaglio del prodotto con alcune informazioni di base è possibile pure aggiungere il prodotto al carrello. L'azione viene fatta tramite una server action, quindi è eseguita lato server (velocità e maggiore sicurezza). Pecularietà: nel metodo che si occupa di aggiungere il prodotto al carrello faccio prima un controllo per vedere se ho già quel prodotto nel carrello e se così fosse faccio una patch della quantità del prodotto, altrimenti lo aggiungo semplicemente. È possibile arrivare su questa pagina tramite click sulla card del prodotto nella pagina di lista.
-   **/carrello** In questa pagina è possibile vedere tutti i prodotti che sono stati aggiunti al carrello e vedere il totale da pagare. Su ogni prodotto è possibile modificare la quantità (ho fatto la scelta di avere una quantità minima di 1, quindi il tastino "-" risulta disabilitato per evitare di andare a 0 o, peggio, su valori negativi) e rimuovere il prodotto dal carrello. È sempre possibile arrivare su questa pagina attraverso il click sull'iconcina del carrello posta sull'header del sito.

---

<a id="errori"></a>

### Gestione errori

Per simulare la gestione degli errori sono stati inseriti, volutamente, alcuni errori legati a determinati prodotti. In particolare abbiamo

-   A pagina 1 il prodotto **OPPOF19** da errore nell'azione di aggiunta al carrello, sia nella pagina di lista prodotti sia nella pagina di dettaglio del prodotto;
-   A pagina 1 il prodotto **Infinix INBOOK** il click per entrare nel dettaglio naviga verso una pagina non esistente e mostra la pagina di 404
-   A pagina 2 il prodotto **Brown Perfume** una volta aggiunto al carrello l'azione per aumentare la quantità va in errore
-   A pagina 1 il prodotto **MacBook Pro** una volta aggiunto al carrello l'azione di eliminazione va in errore

---

<a id="conclusioni"></a>

### Conclusioni

Sviluppare questo semplice progettino mi ha permesso di conoscere un po' meglio la versione 14 di NextJS e ho avuto la possibilità di sperimentare con le server action.

Per la parte di UI mi sono basato su gusto personale anche se ammetto di aver preso qualche spunto da altri siti di ecommerce (stroilli, hollister, casio, cotton&silk).

In un progetto di sviluppo di un ecommerce reale presterei particolarmente attenzione alla gestione della cache delle diverse chiamate e la sua rivalidazione, in modo da sfruttare al massimo le potenzialità del framework. Attenzione ai metadati delle diverse pagine. Attenzione allo sviluppo delle pagine del sito utilizzato il tipo di rendering più adatto, quindi sfruttare i diversi tipi di rendering di NextJS come SSR, SSG, ISR o CSR. Tutte queste attenzioni favoriscono una migliore SEO e un punteggio più alto dei diversi crawler per avere una migliore indicizzazione nei risultati di ricerca.

Lato tecnico/sviluppo cercherei di seguire pattern di sviluppo condivisi in modo da essere più produttivi nello sviluppo software e sicuramente implementerei una qualche pipeline di CI/CD per automatizzare le procedure di rilascio. Cercherei anche di coprire il più possibile l'applicazione con test automatici in modo da cercare di ridurre al minimo il rischio di regressioni.
