"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "Home", href: "/#" },
  { label: "Chi siamo", href: "/#chi-siamo" },
  { label: "Prodotti", href: "/#prodotti" },
  { label: "News e Blog", href: "/#news" },
  { label: "Contatti", href: "/#contatti" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function SiteHeader({
  ctaLabel = "Lavora con noi",
  ctaHref = "/careers",
}: {
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const [open, setOpen] = useState(false);

  /* the sheet is gone above the mobile breakpoint — never leave it open */
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 801px)");
    const close = () => setOpen(false);
    if (mq.matches) close();
    mq.addEventListener("change", close);
    window.addEventListener("resize", close);
    return () => {
      mq.removeEventListener("change", close);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="site-header__logo" href="/#" aria-label="One Tech">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/o-color.svg" alt="" />
      </a>

      <nav className="site-header__nav">
        {NAV.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="site-header__end">
        <a className="pill" href={ctaHref}>
          {ctaLabel}
        </a>
        <button
          type="button"
          className={`site-header__burger${open ? " is-open" : ""}`}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={`site-header__sheet${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        {NAV.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a
          className="pill site-header__sheetCta"
          href={ctaHref}
          onClick={() => setOpen(false)}
        >
          {ctaLabel}
        </a>
      </nav>
    </header>
  );
}
