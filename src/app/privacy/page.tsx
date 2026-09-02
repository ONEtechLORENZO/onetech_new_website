import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy — One Tech",
  description:
    "Condizioni contrattuali centralizzate di ONE S.r.l.: privacy policy, DPA, SLA, policy di utilizzo accettabile, sub-responsabili e sicurezza.",
};

type Block =
  | { t: "h"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "kv"; rows: [string, string][] };

type Doc = {
  id: string;
  title: string;
  /* word of the title rendered in the accent italic serif */
  em?: string;
  kicker: string;
  updated?: string;
  version?: string;
  blocks: Block[];
};

const DOCS: Doc[] = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    kicker: "Legal · Informativa privacy",
    updated: "24/03/2026",
    version: "1.0",
    blocks: [
      {
        t: "p",
        text: "La presente Privacy Policy spiega come ONE S.r.l. tratta dati personali in relazione al proprio sito web, alle attività commerciali e ai servizi.",
      },
      {
        t: "p",
        text: "Quando ONE tratta dati personali per conto di un cliente in qualità di responsabile, tale trattamento è disciplinato dal framework contrattuale applicabile e, in particolare, dal Data Processing Agreement applicabile, salvo ove la legge richieda diversamente.",
      },
      { t: "h", text: "1. Titolare del trattamento" },
      {
        t: "kv",
        rows: [
          ["Società", "ONE S.r.l."],
          ["Indirizzo", "Via Antonio Gramsci 13, 80122 Napoli, Italia"],
          ["Email", "info@one.com"],
          ["PEC", "One@pec.cloud"],
        ],
      },
      { t: "h", text: "2. Dati che possiamo trattare" },
      { t: "p", text: "A seconda del contesto, ONE può trattare:" },
      {
        t: "ul",
        items: [
          "dati di contatto e dati aziendali;",
          "dati di account e onboarding;",
          "dati di fatturazione e transazione;",
          "dati di supporto e comunicazione;",
          "dati tecnici di utilizzo del sito e dei servizi;",
          "log di sicurezza e accesso.",
        ],
      },
      { t: "h", text: "3. Finalità del trattamento" },
      { t: "p", text: "Possiamo trattare dati personali per:" },
      {
        t: "ul",
        items: [
          "fornire e gestire il sito web e i servizi;",
          "gestire onboarding, supporto e rapporto con i clienti;",
          "amministrare contratti e fatturazione;",
          "proteggere la sicurezza, prevenire abusi e gestire incidenti;",
          "adempiere obblighi di legge;",
          "migliorare prestazioni, affidabilità e operatività dei servizi.",
        ],
      },
      { t: "h", text: "4. Basi giuridiche" },
      {
        t: "p",
        text: "ONE si basa, a seconda dei casi, su una o più delle seguenti basi giuridiche:",
      },
      {
        t: "ul",
        items: [
          "esecuzione del contratto;",
          "misure precontrattuali;",
          "obblighi di legge;",
          "legittimi interessi;",
          "consenso, ove richiesto dalla legge.",
        ],
      },
      { t: "h", text: "5. Condivisione" },
      {
        t: "p",
        text: "Possiamo condividere dati personali con fornitori di servizi, sub-responsabili, consulenti professionali, autorità competenti e società affiliate o aventi causa ove consentito dalla legge e necessario.",
      },
      { t: "h", text: "6. Trasferimenti internazionali" },
      {
        t: "p",
        text: "Ove necessario, i trasferimenti internazionali sono effettuati utilizzando adeguate garanzie ai sensi della legge applicabile.",
      },
      { t: "h", text: "7. Conservazione" },
      {
        t: "p",
        text: "Conserviamo i dati personali solo per il tempo necessario a finalità contrattuali, legali, operative, contabili, di sicurezza e probatorie.",
      },
      { t: "h", text: "8. Sicurezza" },
      {
        t: "p",
        text: "ONE applica misure tecniche e organizzative destinate a proteggere i dati personali, inclusi controlli di accesso, comunicazioni sicure, monitoraggio, logging e procedure interne.",
      },
      {
        t: "p",
        text: "Il framework contrattuale include sicurezza, gestione incidenti e salvaguardie DPA.",
      },
      { t: "h", text: "9. Diritti" },
      {
        t: "p",
        text: "Ove previsto dalla legge, gli interessati possono avere diritti di:",
      },
      {
        t: "ul",
        items: [
          "accesso;",
          "rettifica;",
          "cancellazione;",
          "limitazione;",
          "opposizione;",
          "portabilità;",
          "revoca del consenso, ove applicabile;",
          "reclamo a un'autorità competente.",
        ],
      },
      { t: "h", text: "10. Modifiche" },
      {
        t: "p",
        text: "Possiamo aggiornare periodicamente questa Privacy Policy. La versione aggiornata verrà pubblicata su questa pagina con la data di efficacia aggiornata.",
      },
    ],
  },
  {
    id: "dpa",
    title: "Data Processing Agreement",
    em: "Agreement",
    kicker: "Legal · Data Processing Agreement",
    updated: "24/03/2026",
    version: "1.0",
    blocks: [
      {
        t: "p",
        text: "Questo Data Processing Agreement (“DPA”) si applica quando ONE S.r.l. tratta dati personali per conto di un cliente in relazione ai servizi. Il presente DPA forma parte integrante dell'accordo tra le parti.",
      },
      { t: "h", text: "1. Ruoli" },
      {
        t: "p",
        text: "Il Cliente agisce quale Titolare del trattamento. ONE agisce quale Responsabile del trattamento nella misura in cui tratta dati personali per conto del Cliente al fine di fornire, proteggere, supportare e mantenere i servizi.",
      },
      { t: "h", text: "2. Istruzioni" },
      {
        t: "p",
        text: "ONE tratterà i dati personali solo sulla base delle istruzioni documentate del Cliente, salvo diverso obbligo di legge.",
      },
      { t: "h", text: "3. Impegni del Responsabile" },
      { t: "p", text: "ONE si impegna a:" },
      {
        t: "ul",
        items: [
          "assicurare che il personale autorizzato sia vincolato da obblighi di riservatezza;",
          "implementare misure tecniche e organizzative appropriate;",
          "assistere il Cliente, ove ragionevolmente necessario, per richieste degli interessati e obblighi di conformità;",
          "notificare senza ingiustificato ritardo ogni violazione dei dati personali rilevante ai sensi del DPA;",
          "restituire o cancellare i dati personali al termine dei servizi, fatti salvi obblighi di legge e legittime esigenze di conservazione;",
          "mettere a disposizione informazioni ragionevolmente necessarie a dimostrare la conformità, nel rispetto di riservatezza, proporzionalità e sicurezza.",
        ],
      },
      { t: "h", text: "4. Impegni del Cliente" },
      { t: "p", text: "Il Cliente è responsabile di:" },
      {
        t: "ul",
        items: [
          "disporre di una valida base giuridica per il trattamento;",
          "fornire le informative privacy e le informazioni DPA eventualmente richieste agli interessati e alle controparti;",
          "assicurare liceità e accuratezza dei dati trasmessi;",
          "fornire istruzioni documentate lecite;",
          "proteggere propri sistemi, integrazioni, credenziali ed endpoint.",
        ],
      },
      { t: "h", text: "5. Sicurezza" },
      {
        t: "p",
        text: "ONE applica misure tecniche e organizzative appropriate ai rischi del trattamento, considerando natura dei servizi, tecnologia disponibile, costi di implementazione e requisiti legali.",
      },
      { t: "h", text: "6. Sub-responsabili" },
      {
        t: "p",
        text: "Il Cliente autorizza ONE a utilizzare sub-responsabili che supportano hosting, monitoraggio, comunicazioni e fornitura tecnica dei servizi, soggetti ad adeguate garanzie contrattuali. ONE resta responsabile nei limiti previsti dalla legge. L'elenco corrente è disponibile nella sezione Sub-responsabili di questa pagina.",
      },
      { t: "h", text: "7. Audit e assistenza" },
      {
        t: "p",
        text: "Quando richiesto dalla legge applicabile, ONE fornirà informazioni ragionevoli e una cooperazione limitata per audit, soggette a preavviso, proporzionalità, riservatezza e restrizioni di sicurezza.",
      },
      { t: "h", text: "8. Restituzione e cancellazione" },
      {
        t: "p",
        text: "Alla cessazione dei servizi, ONE restituirà e/o cancellerà i dati personali su richiesta documentata, fatti salvi obblighi di legge, cicli di backup, esigenze di prova, gestione di controversie e altre legittime esigenze di conservazione.",
      },
      { t: "h", text: "9. Prevalenza" },
      {
        t: "p",
        text: "In caso di conflitto tra questo DPA e altri termini contrattuali relativi al trattamento di dati personali, prevale il presente DPA.",
      },
      { t: "h", text: "10. Allegato — Dettagli del trattamento" },
      {
        t: "kv",
        rows: [
          ["Titolare del trattamento", "Cliente"],
          ["Responsabile del trattamento", "ONE S.r.l."],
          ["Oggetto", "Fornitura dei servizi"],
          [
            "Durata",
            "Durata dei servizi e periodo di conservazione applicabile",
          ],
          [
            "Finalità",
            "Erogazione del servizio, supporto, sicurezza e manutenzione",
          ],
        ],
      },
    ],
  },
  {
    id: "sla",
    title: "Service Level Agreement",
    em: "Agreement",
    kicker: "Legal · Service Level Agreement",
    updated: "24/03/2026",
    version: "1.0",
    blocks: [
      {
        t: "p",
        text: "Questo Service Level Agreement (“SLA”) si applica quando richiamato espressamente in un Order Form o contratto di servizi.",
      },
      { t: "h", text: "1. Obiettivo di disponibilità" },
      {
        t: "p",
        text: "ONE si propone un uptime mensile del 99,5% per i servizi in produzione, salvo diverso accordo scritto.",
      },
      { t: "h", text: "2. Obiettivi operativi" },
      { t: "p", text: "Salvo diverso accordo:" },
      {
        t: "kv",
        rows: [
          ["Uptime mensile", "99,5%"],
          ["Tempo di risposta API (P99)", "600 ms"],
          ["Tempo di elaborazione documenti (P95)", "40 secondi"],
          ["Presa in carico ticket critici", "1 ora lavorativa"],
          ["Ore di supporto", "lunedì–venerdì, 09:00–18:00 CET"],
        ],
      },
      { t: "h", text: "3. Esclusioni" },
      { t: "p", text: "I periodi di downtime non includono:" },
      {
        t: "ul",
        items: [
          "manutenzione programmata con preavviso;",
          "forza maggiore;",
          "problemi lato cliente o di terze parti fuori dal ragionevole controllo di ONE;",
          "uso improprio dei servizi;",
          "sospensioni per violazione, abuso, mancato pagamento o motivi di sicurezza;",
          "cyberattacchi su larga scala o incidenti di provider non attribuibili a ONE.",
        ],
      },
      { t: "h", text: "4. Service credit" },
      {
        t: "p",
        text: "Se l'uptime scende sotto la soglia obiettivo, il Cliente può avere diritto ai seguenti service credit:",
      },
      {
        t: "kv",
        rows: [
          ["Sotto 99,5% e almeno 98,0%", "5%"],
          ["Sotto 98,0% e almeno 95,0%", "10%"],
          ["Sotto 95,0%", "20%"],
        ],
      },
      {
        t: "p",
        text: "I credit si applicano al canone ricorrente del servizio e del mese interessato e sono riconosciuti sulle fatture future, salvo diverso accordo.",
      },
      { t: "h", text: "5. Richieste ed esclusività del rimedio" },
      {
        t: "p",
        text: "Le richieste di credit devono essere inviate per iscritto entro trenta (30) giorni dal mese interessato e devono includere ragionevoli elementi di supporto. I service credit costituiscono il rimedio principale ed esclusivo del Cliente per i disservizi SLA ammissibili, salvo quanto previsto da norme inderogabili.",
      },
      { t: "h", text: "6. Mancato raggiungimento ripetuto" },
      {
        t: "p",
        text: "Se l'uptime scende sotto il 95,0% in due mesi nell'arco di qualunque periodo di sei mesi, il Cliente può risolvere l'Order Form interessato con preavviso scritto di trenta (30) giorni.",
      },
    ],
  },
  {
    id: "aup",
    title: "Policy di utilizzo accettabile",
    em: "accettabile",
    kicker: "Legal · Acceptable Use Policy",
    updated: "24/03/2026",
    version: "1.0",
    blocks: [
      {
        t: "p",
        text: "I servizi possono essere utilizzati solo per finalità commerciali lecite e in conformità all'accordo, alla documentazione e alla legge applicabile.",
      },
      { t: "h", text: "Utilizzi vietati" },
      { t: "p", text: "Il Cliente non deve:" },
      {
        t: "ul",
        items: [
          "utilizzare i servizi in modo illecito o abusivo;",
          "caricare o trattare dati senza i diritti o la base giuridica necessari;",
          "interferire con la sicurezza, l'integrità o la disponibilità dei servizi;",
          "eludere autenticazione, controlli di accesso o rate limit;",
          "effettuare reverse engineering, scraping, benchmark, scansioni o probe dei servizi senza autorizzazione;",
          "introdurre malware o codice dannoso;",
          "utilizzare i servizi per sviluppare prodotti concorrenti;",
          "presentare gli output come risultati certificati o legalmente vincolanti emessi da ONE.",
        ],
      },
      {
        t: "p",
        text: "Il Cliente resta l'unico responsabile dei dati trasmessi e dell'uso a valle degli output. ONE può limitare, sospendere o terminare l'accesso in risposta a violazioni o rischi di sicurezza.",
      },
      { t: "h", text: "Segnalazioni" },
      {
        t: "p",
        text: "Le segnalazioni di uso improprio possono essere inviate a support@otech.one oppure info@one.com.",
      },
    ],
  },
  {
    id: "sub-responsabili",
    title: "Sub-responsabili",
    kicker: "Legal · Subprocessors",
    updated: "24/03/2026",
    version: "1.0",
    blocks: [
      { t: "p", text: "ONE può utilizzare sub-responsabili per supportare:" },
      {
        t: "ul",
        items: [
          "hosting;",
          "infrastruttura;",
          "monitoraggio;",
          "comunicazioni;",
          "sicurezza;",
          "fornitura tecnica del servizio.",
        ],
      },
      {
        t: "p",
        text: "Tali sub-responsabili sono incaricati con adeguate garanzie contrattuali come richiesto dalla legge e dal DPA. Per domande sui sub-responsabili, contattare info@one.com.",
      },
    ],
  },
  {
    id: "sicurezza",
    title: "Panoramica sulla sicurezza",
    em: "sicurezza",
    kicker: "Security",
    updated: "24/03/2026",
    blocks: [
      {
        t: "p",
        text: "ONE applica misure tecniche e organizzative destinate a proteggere la riservatezza, l'integrità e la disponibilità dei propri servizi e dei dati dei clienti.",
      },
      { t: "p", text: "Il framework contrattuale include:" },
      {
        t: "ul",
        items: [
          "trasporto sicuro;",
          "controlli sulle credenziali;",
          "monitoraggio;",
          "logging;",
          "gestione degli incidenti;",
          "processi di manutenzione;",
          "salvaguardie per i sub-responsabili;",
          "protezioni basate sul DPA.",
        ],
      },
      { t: "h", text: "Principi di sicurezza" },
      {
        t: "ul",
        items: [
          "comunicazioni sicure tramite trasporto cifrato;",
          "gestione controllata di credenziali e accessi;",
          "monitoraggio e logging per sicurezza e affidabilità;",
          "procedure di risposta agli incidenti e di remediation;",
          "controlli di manutenzione e change management;",
          "salvaguardie sui sub-responsabili nell'ambito di controlli contrattuali.",
        ],
      },
      {
        t: "p",
        text: "La sicurezza è una responsabilità condivisa. I clienti restano responsabili della protezione dei propri sistemi, integrazioni, credenziali, endpoint e dell'uso a valle degli output.",
      },
    ],
  },
];

function renderBlock(block: Block, i: number) {
  if (block.t === "h") {
    return (
      <h3 className="legal__h3" key={i}>
        {block.text}
      </h3>
    );
  }
  if (block.t === "p") {
    return (
      <p className="legal__p" key={i}>
        {block.text}
      </p>
    );
  }
  if (block.t === "ul") {
    return (
      <ul className="legal__list" key={i}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <dl className="legal__kv" key={i}>
      {block.rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Privacy() {
  return (
    <main className="flex-1">
      <SiteHeader />
      <div className="legal">
        <div className="legal__inner">
          <p className="legal__eyebrow">ONE — Condizioni contrattuali centralizzate</p>
          <h1 className="legal__title">
            Privacy <em>Policy</em>
          </h1>

          <nav className="legal__toc" aria-label="Indice">
            {DOCS.map((doc) => (
              <a key={doc.id} href={`#${doc.id}`}>
                {doc.title}
              </a>
            ))}
          </nav>

          {DOCS.map((doc) => (
            <section className="legal__doc" id={doc.id} key={doc.id}>
              <p className="legal__kicker">{doc.kicker}</p>
              <h2 className="legal__h2">
                {doc.em ? (
                  <>
                    {doc.title.slice(0, doc.title.lastIndexOf(doc.em))}
                    <em>{doc.em}</em>
                  </>
                ) : (
                  doc.title
                )}
              </h2>
              <p className="legal__meta">
                Ultimo aggiornamento: {doc.updated}
                {doc.version && <> · Versione: {doc.version}</>}
              </p>
              {doc.blocks.map(renderBlock)}
            </section>
          ))}

          <p className="legal__copyright">
            © 2026 ONE S.r.l. — Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </main>
  );
}
