import BlurText from "@/components/blur-text";
import CareersMedia from "@/components/careers-media";
import Reveal from "@/components/reveal";
import SiteHeader from "@/components/site-header";
import { withBasePath } from "@/lib/base-path";

/* ── content ───────────────────────────────────────────────────────
 * Items marked "Add …" are placeholders awaiting real One Tech copy.
 */



const GROWTH_CARDS = [
  {
    title: "Responsabilità dal primo giorno",
    image: "/growth-ownership.webp",
    body: "Lavori da subito su progetti veri, con decisioni tue e risultati visibili.",
    strong: "Più responsabilità ti prendi, prima cresce il tuo ruolo.",
  },
  {
    title: "Opportunità più ampie",
    image: "/growth-broader.webp",
    body: "Siamo piccoli e cresciamo. Vedi come funzionano prodotto, vendite e clienti, non solo il tuo pezzo.",
    strong: "Più cose capisci, più strade hai per crescere.",
  },
  {
    title: "Impara più in fretta",
    image: "/growth-learn.webp",
    body: "Costruiamo prodotti difficili, in settori che nessuno ha ancora digitalizzato. Ti troverai a risolvere problemi che non hanno una risposta pronta.",
    strong: "Ogni problema risolto è competenza che resta.",
  },
  {
    title: "Crescita basata sull’impatto",
    image: "/growth-impact.webp",
    body: "I passi avanti dipendono da quello che ottieni, non da quanto tempo sei qui.",
    strong: "Risultati buoni portano ruoli più grandi. In fretta.",
  },
];


const STATEMENT = [
  "In One Tech cerchiamo persone curiose, ambiziose e pronte a lasciare il segno.",
  "Lavoriamo su prodotti reali, affrontiamo problemi complessi e trasformiamo le idee in soluzioni utilizzate ogni giorno. Qui avrai spazio per crescere, assumerti responsabilità e contribuire direttamente alla costruzione del futuro dell’azienda.",
  "Non cerchiamo semplicemente persone che ricoprano un ruolo. Cerchiamo persone che vogliano costruire, sperimentare e crescere insieme a noi.",
];

function Cta({ label = "Candidati" }: { label?: string }) {
  return (
    <a className="careers__cta" href={withBasePath("/careers/apply")}>
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Careers() {
  return (
    <div className="careers">
      <SiteHeader ctaLabel="Candidati" ctaHref="/careers/apply" />

      {/* hero */}
      <section className="careers__hero">
        <Reveal>
          <h1 className="careers__title">
            Possibilità <em>infinite</em>. Il tuo prossimo passo inizia qui.
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <CareersMedia />
        </Reveal>

        <Reveal delay={240}>
          <div className="careers__heroCta">
            <Cta />
          </div>
        </Reveal>

      </section>

      {/* statement */}
      <section className="careers__statement">
        <BlurText className="careers__statementInner" paragraphs={STATEMENT} />
      </section>

      {/* career growth */}
      <section className="growth">
        <div className="growth__inner">
          <div className="growth__col">
            {GROWTH_CARDS.slice(0, 2).map((card, i) => (
              <Reveal className="growth__card" delay={i * 120} key={card.title}>
                <h3>{card.title}</h3>
                <div className="growth__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBasePath(card.image)} alt="" loading="lazy" />
                </div>
                <p>{card.body}</p>
                <p className="growth__strong">{card.strong}</p>
              </Reveal>
            ))}
          </div>

          <div className="growth__centre">
            <Reveal>
              <h2 className="careers__h2">Retribuzione e benefit</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="growth__lead">
                Cresci in base a quello che fai, non al titolo sul
                biglietto da visita. Prendi responsabilità, impara in
                fretta, ottieni risultati: ogni volta che il tuo contributo
                aumenta, aumentano anche le tue possibilità.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Cta />
            </Reveal>
          </div>

          <div className="growth__col growth__col--right">
            {GROWTH_CARDS.slice(2).map((card, i) => (
              <Reveal className="growth__card" delay={90 + i * 120} key={card.title}>
                <h3>{card.title}</h3>
                <div className="growth__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBasePath(card.image)} alt="" loading="lazy" />
                </div>
                <p>{card.body}</p>
                <p className="growth__strong">{card.strong}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="retreat">
        <div className="retreat__inner">
          <Reveal className="retreat__side">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="retreat__logo"
              src={withBasePath("/otech-travel.webp")}
              alt=""
            />
            <p className="retreat__tag">
              Partiamo insieme.
              <br />
              Torniamo più uniti.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="retreat__card">
              <video
                src={withBasePath("/retreat.mp4")}
                poster={withBasePath("/retreat-poster.jpg")}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
              />
              <h2 className="retreat__title">
                <em>Indimenticabile</em> ritiro annuale
              </h2>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="retreat__cta">
            <Cta />
          </div>
        </Reveal>
      </section>

    </div>
  );
}
