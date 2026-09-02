import BannerVideo from "@/components/banner-video";
import ComingSoonCta from "@/components/coming-soon";
import { withBasePath } from "@/lib/base-path";

type Cta = {
  label: string;
  href: string;
  primary?: boolean;
};

type Banner = {
  name: string;
  anchor: string;
  /* logo art replaces the text name when present */
  logo?: string;
  href?: string;
  logoScale?: number;
  /* shrinks the text name when there is no logo and the name is long */
  nameScale?: number;
  /* logo already carries dark-card-ready colours — skip the white knockout */
  logoOriginal?: boolean;
  paras: string[];
  facts?: string[];
  video?: string;
  poster?: string;
  /* still art instead of a clip */
  image?: string;
  /* replaces the Learn more link entirely */
  ctas?: Cta[];
  /* colour behind the copy once the card stacks on phones — sampled from
     the clip's own backdrop so the two read as one surface */
  tint: string;
  /* dark footage needs the copy knocked out to white */
  dark?: boolean;
  /* not launched yet: Learn more opens the coming-soon card */
  comingSoon?: boolean;
};

const BANNERS: Banner[] = [
  {
    name: "KORE",
    anchor: "kore",
    logo: "/kore.webp",
    logoScale: 0.85,
    video: "/banner-kore.mp4?v=hq",
    poster: "/banner-kore-poster.webp?v=hq",
    tint: "#c5dcf9",
    paras: [
      "KORE è il software che qualifica automaticamente i lead più interessati e li accompagna verso la firma, gestendo in autonomia le principali fasi del processo commerciale.",
      "Centralizza le informazioni, avvia conversazioni personalizzate e aiuta il team a concentrarsi sulle opportunità con maggiori probabilità di conversione.",
    ],
    facts: ["Mercato: Italia", "Industria: Credito al consumo"],
  },
  {
    name: "ARGO",
    anchor: "argo",
    logo: "/argo.svg",
    video: "/banner-argo.mp4?v=hq",
    poster: "/banner-argo-poster.webp?v=hq",
    tint: "#95a086",
    paras: [
      "ARGO è il primo software di lettura documentale progettato interamente per il credito al consumo italiano.",
      "Legge ed estrae automaticamente le informazioni dai documenti, riducendo le attività manuali, gli errori di trascrizione e i tempi necessari per lavorare ogni pratica.",
    ],
    facts: ["Mercato: Italia", "Industria: Credito al consumo"],
  },
  {
    name: "ALL MESSAGE",
    anchor: "all-message",
    logo: "/allmessage-dark.png",
    logoOriginal: true,
    href: "https://allmessage.chat/",
    logoScale: 0.96,
    video: "/banner-allmessage.mp4?v=hq",
    poster: "/banner-allmessage-poster.webp?v=hq",
    tint: "#282a2d",
    dark: true,
    paras: [
      "All Message riunisce WhatsApp, Instagram, Facebook ed e-mail in un unico strumento.",
      "Disponibile tramite API o web app, permette di gestire tutte le conversazioni da una sola schermata, senza passare continuamente da una piattaforma all’altra.",
    ],
    facts: ["Mercato: Italia e internazionale", "Industria: Trasversale"],
  },
  {
    name: "LUVO",
    anchor: "luvo",
    logo: "/luvo-logo.png?v=2",
    logoScale: 0.62,
    comingSoon: true,
    video: "/banner-acta.mp4?v=hq",
    poster: "/banner-acta-poster.webp?v=hq",
    tint: "#f5ccc6",
    paras: [
      "LUVO è la piattaforma AI-powered che riunisce conversazioni, campagne, automazioni e dati commerciali in un unico ambiente.",
      "Gestisce WhatsApp, Instagram, Facebook ed e-mail da un’unica interfaccia e consente di creare campagne multicanale e agenti AI conversazionali e vocali per le vendite.",
      "Collegata a e-commerce, Google Ads e Meta Business Suite, LUVO centralizza i dati e offre una visione completa delle performance aziendali.",
    ],
    facts: ["Mercato: Italia e internazionale", "Industria: E-commerce e retail"],
  },
  {
    name: "Software e AI agent su misura",
    anchor: "software-ai-su-misura",
    nameScale: 0.42,
    video: "/banner-custom.mp4",
    poster: "/banner-custom-poster.webp",
    tint: "#d6e4e3",
    paras: [
      "Contattaci per sviluppare insieme software e AI agent progettati specificamente per le esigenze della tua azienda.",
    ],
    ctas: [
      {
        label: "Scrivici via e-mail",
        href: "mailto:sales@otech.one",
        primary: true,
      },
      { label: "Scrivici su WhatsApp", href: "https://wa.me/393314016174" },
    ],
  },
];

export default function Products() {
  return (
    <section className="products" id="prodotti">
      <h2 className="products__title">Prodotti</h2>

      {BANNERS.map((banner) => (
        <div className="koreb" id={banner.anchor} key={banner.name}>
          <h3 className="koreb__kicker">{banner.name}</h3>

          <div
            className={`koreb__card${banner.dark ? " koreb__card--dark" : ""}`}
            style={{ background: banner.tint }}
          >
            {banner.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img className="koreb__video" src={withBasePath(banner.image)} alt="" />
            ) : (
              banner.video && (
                <BannerVideo
                  src={withBasePath(banner.video)}
                  poster={banner.poster ? withBasePath(banner.poster) : undefined}
                />
              )
            )}

            <div className="koreb__copy">
              {banner.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  className={`koreb__logo${
                    banner.logoOriginal ? " koreb__logo--original" : ""
                  }`}
                  src={withBasePath(banner.logo)}
                  alt={banner.name}
                  style={
                    banner.logoScale
                      ? {
                          height: `calc(var(--koreb-logo-h) * ${banner.logoScale})`,
                        }
                      : undefined
                  }
                />
              ) : (
                <span
                  className="koreb__name"
                  style={
                    banner.nameScale
                      ? {
                          fontSize: `calc(var(--koreb-logo-h) * ${banner.nameScale})`,
                        }
                      : undefined
                  }
                >
                  {banner.name}
                </span>
              )}

              {banner.paras.map((para) => (
                <p className="koreb__body" key={para.slice(0, 24)}>
                  {para}
                </p>
              ))}

              {banner.facts && (
                <ul className="koreb__facts">
                  {banner.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              )}

              {banner.ctas ? (
                <div className="koreb__ctas">
                  {banner.ctas.map((cta) => (
                    <a
                      key={cta.label}
                      className={`product__cta koreb__cta${
                        cta.primary ? " koreb__cta--primary" : ""
                      }`}
                      href={cta.href}
                      {...(cta.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {cta.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              ) : banner.comingSoon ? (
                <ComingSoonCta
                  logo={withBasePath("/luvo-logo.png?v=2")}
                  art={withBasePath("/luvo-coming-soon.webp")}
                />
              ) : (
                <a
                  className="product__cta koreb__cta"
                  href={banner.href ?? "#"}
                  {...(banner.href
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  Learn more <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
