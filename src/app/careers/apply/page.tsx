import type { Metadata } from "next";
import ApplyForm from "@/components/apply-form";
import SiteHeader from "@/components/site-header";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Candidati — One Tech",
  description: "Invia la tua candidatura a One Tech.",
};

export default function ApplyPage() {
  return (
    <main className="flex-1">
      <div className="apply">
        <SiteHeader ctaLabel="Careers" ctaHref="/careers" />

        <div className="apply__inner">
          <aside className="apply__side">
            <a className="apply__back" href={withBasePath("/careers")}>
              <span aria-hidden="true">←</span> Torna a Careers
            </a>

            <h1 className="apply__title">
              Cresci con noi.
              <br />
              Lascia il <em>segno</em>.
            </h1>

            <p className="apply__meta">
              Cerchiamo persone che abbiano voglia di crescere e lasciare il
              segno. Qui potrai fare esperienza sul campo, portare avanti le
              tue idee e avere sempre più autonomia sul tuo lavoro.
            </p>
          </aside>

          <ApplyForm />
        </div>
      </div>
    </main>
  );
}
