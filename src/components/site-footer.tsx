import FooterBrand from "@/components/footer-brand";

const PRODUCTS = [
  { label: "Kore", href: "#" },
  { label: "Allmessage", href: "https://allmessage.chat/" },
  { label: "Luvo", href: "https://acta.otech.one/" },
  { label: "Argo", href: "#" },
];

const FOLLOW = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/otech-one/" },
  { label: "Instagram", href: "https://www.instagram.com/onetech.one" },
  { label: "YouTube", href: "https://www.youtube.com/@Onetech22" },
];


function LinkList({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <ul className="foot__links">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function SiteFooter() {
  return (
    <footer className="foot" id="contatti">
      <div className="foot__inner">
        <div className="foot__cols">
          <div className="foot__col">
            <h3 className="foot__head">Prodotti</h3>
            <LinkList items={PRODUCTS} />
          </div>

          <div className="foot__col">
            <h3 className="foot__head">Seguici</h3>
            <LinkList items={FOLLOW} />
          </div>

          <div className="foot__col">
            <h3 className="foot__head">Richieste di partnership</h3>
            <a className="foot__inq" href="mailto:partnerships@otech.one">
              partnerships@otech.one
            </a>

            <h3 className="foot__head foot__head--stack">Richieste stampa</h3>
            <a className="foot__inq" href="mailto:press@otech.one">
              press@otech.one
            </a>
          </div>

          <div className="foot__col">
            <h3 className="foot__head">Sedi</h3>
            <p className="foot__address">
              Via Gustavo Fara 32, 20124 Milano MI
            </p>
            <a className="foot__mail" href="mailto:sales@otech.one">
              sales@otech.one
            </a>
          </div>
        </div>

        <hr className="foot__rule" />

        <FooterBrand />
      </div>
    </footer>
  );
}
