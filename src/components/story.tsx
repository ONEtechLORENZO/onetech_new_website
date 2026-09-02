"use client";

import { Fragment, useEffect, useRef } from "react";

const PARAGRAPHS = [
  "Dal 2022 sviluppiamo prodotti digitali che trasformano processi aziendali complessi in sistemi semplici e scalabili. Non soluzioni temporanee, ma tecnologie progettate per crescere insieme alle aziende che le utilizzano.",
  "Interveniamo sempre in profondità, collegando conversazioni, flussi di lavoro, documenti e dati per ridurre le attività manuali, accelerare le decisioni e migliorare l’esperienza del cliente.",
  "I nostri team sono piccoli, la responsabilità è condivisa e l’esecuzione è rapida. Uniamo l’ambizione e l’agilità di una startup al rigore necessario per costruire tecnologie su cui le aziende possano davvero fare affidamento.",
];

const LEAD = 16; // how many words are mid-reveal at once — the soft edge
const MAX_BLUR = 12;

export default function Story() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const words = Array.from(
      root.querySelectorAll<HTMLElement>(".story__word"),
    );
    const total = words.length;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((word) => {
        word.style.opacity = "1";
        word.style.filter = "none";
      });
      return;
    }

    let raf = 0;
    let last = -1;
    const prev = new Array<number>(total).fill(-1);

    const draw = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const start = window.innerHeight * 0.78;

      // 0 as the block enters, 1 once it has travelled most of its own height
      // past that point, so the reveal plays while the text is on screen
      const p = Math.min(
        Math.max((start - rect.top) / Math.max(rect.height * 0.9, 1), 0),
        1,
      );
      if (Math.abs(p - last) < 0.001) return;
      last = p;

      const front = p * (total + LEAD);
      for (let i = 0; i < total; i += 1) {
        const local = Math.min(Math.max((front - i) / LEAD, 0), 1);
        // most words are fully hidden or fully shown — only touch the band
        // that is actually mid-reveal
        const step = Math.round(local * 100) / 100;
        if (step === prev[i]) continue;
        prev[i] = step;
        const word = words[i];
        word.style.opacity = (0.18 + 0.82 * step).toFixed(3);
        word.style.filter =
          step >= 1 ? "none" : `blur(${((1 - step) * MAX_BLUR).toFixed(2)}px)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="story" id="chi-siamo" ref={rootRef}>
      <div className="story__inner">
        {PARAGRAPHS.map((paragraph, pi) => (
          <p className="story__p" key={pi}>
            {paragraph.split(" ").map((word, wi) => (
              <Fragment key={wi}>
                <span className="story__word">{word}</span>{" "}
              </Fragment>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
