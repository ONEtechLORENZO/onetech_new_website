"use client";

import { useEffect, useRef } from "react";

/* Logo e tagline scendono da dietro la riga quando il footer entra in vista. */
export default function FooterBrand() {
  const clipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clip = clipRef.current;
    if (!clip) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clip.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(clip);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="foot__brandClip" ref={clipRef}>
      <div className="foot__brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="foot__brandLogo"
          src="/footer-lockup.png"
          alt="onetech — Difficile? Non per noi!"
        />
      </div>
    </div>
  );
}
