"use client";

import { useEffect, useState } from "react";

/*
 * "Learn more" per un prodotto non ancora lanciato: invece di navigare,
 * apre una piccola card con il logo, l'artwork e la scritta "Coming soon".
 * Si chiude con la X, cliccando fuori o con Esc.
 */
export default function ComingSoonCta({ logo, art }: { logo: string; art: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="product__cta koreb__cta"
        onClick={() => setOpen(true)}
      >
        Learn more <span aria-hidden="true">↗</span>
      </button>

      {open && (
        <div
          className="csoon"
          role="dialog"
          aria-modal="true"
          aria-label="LUVO — coming soon"
          onClick={() => setOpen(false)}
        >
          <div className="csoon__card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="csoon__close"
              aria-label="Chiudi"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="csoon__logo" src={logo} alt="LUVO" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="csoon__art" src={art} alt="" />

            <p className="csoon__text" aria-label="Coming soon">
              {"Coming soon".split("").map((ch, i) => (
                <span
                  key={i}
                  style={{ "--d": `${i * 0.07}s` } as React.CSSProperties}
                >
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
