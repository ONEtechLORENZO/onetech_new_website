"use client";

/*
 * ═══════════════════════════════════════════════════════════════════
 *  DESIGN CONSERVATO — hero "Partner & Clienti"
 *  Copia integrale del carosello con le card di partner e clienti
 *  (Aessefin, Cofidis, Ecommerce Italia, Magenta, ElevenLabs, AWS,
 *  StarBrixia, Istituto G. B. Montini), con gli stessi video, loghi,
 *  didascalie Partners/Clienti e stile. Non è montato in nessuna
 *  pagina: per ripristinarlo, in src/app/page.tsx importare
 *  HeroPartners da questo file al posto di Hero.
 * ═══════════════════════════════════════════════════════════════════
 */

import { useEffect, useRef } from "react";

type Tile = {
  name: string;
  background: string;
  color: string;
  /* logo art replaces the wordmark when present */
  logo?: string;
  logoScale?: number;
  /* knock a dark mark out to white so it reads on video */
  logoInvert?: boolean;
  /* small line under the logo, e.g. AWS "Partner Network" */
  sub?: string;
  /* small uppercase line above the name, e.g. "Supported by" */
  kicker?: string;
  /* video plays behind the logo / wordmark */
  video?: string;
  poster?: string;
};

/* Tiles in the 3D row — order runs left to right, then loops. */
const TILES: Tile[] = [
  {
    name: "Aessefin",
    background: "#f6f6f4",
    color: "#ffffff",
    logo: "/aessefin.webp",
    logoScale: 0.58,
    sub: "Clienti",
    video: "/aessefin.mp4",
    poster: "/aessefin-poster.jpg",
  },
  {
    name: "Cofidis",
    background: "#f6f6f4",
    color: "#ffffff",
    logo: "/cofidis.webp",
    logoScale: 0.56,
    sub: "Clienti",
    video: "/cofidis.mp4",
    poster: "/cofidis-poster.jpg",
  },
  {
    name: "Ecommerce Italia",
    background: "#f6f6f4",
    color: "#111111",
    logo: "/ecommerce-italia.webp",
    logoScale: 0.74,
    sub: "Partners",
  },
  {
    name: "Magenta",
    background: "#e20074",
    color: "#fff0f8",
    logo: "/magenta-white.webp",
    logoScale: 0.6,
    sub: "Clienti",
    video: "/magenta.mp4",
    poster: "/magenta-poster.jpg",
  },
  {
    name: "ElevenLabs",
    background: "#0a0a0a",
    color: "#ffffff",
    kicker: "Supported by",
    logo: "/elevenlabs-logo.webp",
    logoScale: 0.72,
    logoInvert: true,
    sub: "Partners",
    video: "/elevenlabs.mp4",
    poster: "/elevenlabs-poster.jpg",
  },
  {
    name: "AWS",
    background: "#0a0a0a",
    color: "#ffffff",
    logo: "/aws-white.webp",
    logoScale: 0.4,
    sub: "Partners",
  },
  {
    name: "StarBrixia",
    /* the mark ships on an opaque white plate, so the card matches it */
    background: "#ffffff",
    color: "#111111",
    logo: "/starbrixia.webp",
    logoScale: 0.66,
    sub: "Clienti",
  },
  {
    name: "Istituto G. B. Montini",
    background: "#f6f6f4",
    color: "#111111",
    logo: "/istituto-montini.webp",
    logoScale: 0.54,
    sub: "Clienti",
  },
];

const SETS = 3; // duplicated so the row can loop seamlessly
const EDGE_SCALE = 1.85; // how much larger a card is at the screen edge
const MAX_ROT = 34; // degrees of yaw once a card reaches the edge
const PERSPECTIVE = 1200; // camera distance; must match .hero__stage
const SPEED = 0.042; // px per millisecond

/* Long wordmarks get a smaller size so every tile stays on one line. */
function nameScale(name: string) {
  return Math.min(0.155, 1.35 / name.length);
}

export default function HeroPartners() {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const videos = cards.map((card) => card.querySelector("video"));
    const playing = cards.map(() => false);
    cards.forEach((card) => {
      card.style.visibility = "hidden";
    });
    videos.forEach((video) => {
      if (video) video.muted = true;
    });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cardW = 0;
    let step = 0;
    let totalW = 0;
    let stageW = 0;
    let half = 0;
    let offset = 0;

    // screen-space curve: cards grow toward the edges, tilting as they go
    const scaleAt = (x: number) =>
      1 + (EDGE_SCALE - 1) * Math.min((x / half) ** 2, 1.6);
    const rotAt = (x: number) =>
      Math.min(Math.abs(x) / half, 1) * MAX_ROT * Math.sign(x);

    // how much one unit of card surface stretches on screen: foreshortened by
    // the tilt, then widened slightly by the card's own perspective
    const magAt = (x: number) => {
      const th = (Math.abs(rotAt(x)) * Math.PI) / 180;
      const halfDepth = (cardW * scaleAt(x) * Math.sin(th)) / 2;
      return (
        (Math.cos(th) * PERSPECTIVE ** 2) / (PERSPECTIVE ** 2 - halfDepth ** 2)
      );
    };

    // xs[i] is the screen position reached after i * DQ of travel along the row
    const DQ = 2;
    let xs: number[] = [0];
    let qMax = 0;

    const measure = () => {
      stageW = stage.clientWidth || window.innerWidth;
      half = stageW / 2;
      cardW =
        stageW >= 1280 ? 245 : stageW >= 900 ? 212 : stageW >= 640 ? 178 : 148;
      step = cardW + Math.round(cardW * 0.08);
      totalW = step * cards.length;
      track.style.setProperty("--card-w", `${cardW}px`);
      track.style.setProperty("--card-h", `${Math.round(cardW * 1.22)}px`);

      // march outward, advancing by the local scale so tiles stay evenly
      // gapped once perspective has stretched them
      xs = [0];
      let x = 0;
      while (x < half * 1.7 && xs.length < 4000) {
        x += DQ * scaleAt(x) * magAt(x);
        xs.push(x);
      }
      qMax = (xs.length - 1) * DQ;
    };

    const xAt = (q: number) => {
      const sign = q < 0 ? -1 : 1;
      const a = Math.abs(q);
      const i = Math.floor(a / DQ);
      if (i >= xs.length - 1) return sign * xs[xs.length - 1];
      return sign * (xs[i] + (xs[i + 1] - xs[i]) * (a / DQ - i));
    };

    const layout = () => {
      for (let i = 0; i < cards.length; i += 1) {
        const card = cards[i];
        const video = videos[i];

        // distance along the row from centre, wrapped for the loop
        let q = ((i * step - offset) % totalW + totalW) % totalW;
        if (q > totalW / 2) q -= totalW;

        const onScreen = Math.abs(q) <= qMax;
        if (onScreen !== playing[i]) {
          playing[i] = onScreen;
          card.style.visibility = onScreen ? "visible" : "hidden";
          if (video) {
            if (onScreen) void video.play().catch(() => {});
            else video.pause();
          }
        }
        if (!onScreen) continue;

        const x = xAt(q);
        const scale = scaleAt(x);
        card.style.transform = `translateX(${x.toFixed(2)}px) perspective(${PERSPECTIVE}px) rotateY(${(-rotAt(x)).toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.style.zIndex = String(Math.round(scale * 100));
      }
    };

    const onResize = () => {
      measure();
      layout();
    };

    measure();
    layout();
    window.addEventListener("resize", onResize);

    let raf = 0;
    if (!reduceMotion) {
      let last = 0;
      const frame = (now: number) => {
        const dt = last ? Math.min(now - last, 50) : 16;
        last = now;
        offset = (offset + SPEED * dt) % totalW;
        layout();
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      videos.forEach((video) => video?.pause());
    };
  }, []);

  const tiles = Array.from({ length: SETS }, () => TILES).flat();

  return (
    <section className="hero">
      <div className="hero__copy">
        <h1 className="hero__title">
          <span className="hero__line">
            Sviluppiamo software <em>verticali</em>
          </span>{" "}
          <span className="hero__line">
            per <em>settori</em> specifici.
          </span>
        </h1>
      </div>

      <p className="hero__rowLabel">Partner &amp; Clienti</p>

      <div className="hero__stage" ref={stageRef} aria-hidden="true">
        <div className="hero__track" ref={trackRef}>
          {tiles.map((tile, i) => (
            <div
              key={`${tile.name}-${i}`}
              className={`hero__card${tile.video ? " hero__card--media" : ""}`}
              style={{ background: tile.background, color: tile.color }}
            >
              {tile.video && (
                <>
                  <video
                    className="hero__cardMedia"
                    src={tile.video}
                    poster={tile.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                  />
                  <span className="hero__cardScrim" />
                </>
              )}

              {tile.logo ? (
                <span
                  className="hero__cardBrand"
                  style={{
                    width: `calc(var(--card-w) * ${(tile.logoScale ?? 0.62).toFixed(2)})`,
                  }}
                >
                  {tile.kicker && (
                    <span className="hero__cardKicker hero__cardKicker--overLogo">
                      {tile.kicker}
                    </span>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={`hero__cardLogo${tile.logoInvert ? " hero__cardLogo--invert" : ""}`}
                    src={tile.logo}
                    alt=""
                  />
                  {tile.sub && (
                    <span className="hero__cardSub">{tile.sub}</span>
                  )}
                </span>
              ) : (
                <span className="hero__cardNameWrap">
                  {tile.kicker && (
                    <span className="hero__cardKicker">{tile.kicker}</span>
                  )}
                  <span
                    className="hero__cardName"
                    style={{
                      fontSize: `calc(var(--card-w) * ${nameScale(tile.name).toFixed(3)})`,
                    }}
                  >
                    {tile.name}
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
