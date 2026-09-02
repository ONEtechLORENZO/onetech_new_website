"use client";

import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/base-path";

type Tile = {
  name: string;
  productHref: string;
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
  /* long text names wrap over two lines instead of shrinking */
  nameWrap?: boolean;
  /* which part of the footage the portrait crop keeps */
  mediaPos?: string;
  /* extra zoom, e.g. to push baked-in letterbox bars out of the crop */
  mediaScale?: number;
  /* light footage with dark marks reads better without the dark scrim */
  noScrim?: boolean;
  /* video plays behind the logo / wordmark */
  video?: string;
  poster?: string;
};

/* Tiles in the 3D row — order runs left to right, then loops. */
const TILES: Tile[] = [
  {
    name: "Kore",
    productHref: "#kore",
    background: "#c5dcf9",
    color: "#111111",
    logo: "/kore.webp",
    logoScale: 0.58,
    video: "/banner-kore.mp4",
    poster: "/banner-kore-poster.webp",
    mediaPos: "24% 20%",
    noScrim: true,
  },
  {
    name: "LUVO",
    productHref: "#luvo",
    background: "#f5ccc6",
    color: "#111111",
    logo: "/luvo-logo.png",
    logoScale: 0.6,
    video: "/banner-acta.mp4",
    poster: "/banner-acta-poster.webp",
    mediaPos: "10% 50%",
    noScrim: true,
  },
  {
    name: "All Message",
    productHref: "#all-message",
    background: "#282a2d",
    color: "#ffffff",
    logo: "/allmessage-dark.png",
    logoScale: 0.66,
    video: "/banner-allmessage.mp4",
    poster: "/banner-allmessage-poster.webp",
    /* the clip ships with letterbox bars — zoom past them */
    mediaScale: 1.34,
    mediaPos: "40% 50%",
  },
  {
    name: "Argo",
    productHref: "#argo",
    background: "#95a086",
    color: "#111111",
    logo: "/argo.svg",
    logoScale: 0.5,
    video: "/banner-argo.mp4",
    poster: "/banner-argo-poster.webp",
    mediaPos: "12% 50%",
    noScrim: true,
  },
  {
    name: "Software e AI agent su misura",
    productHref: "#software-ai-su-misura",
    background: "#d6e4e3",
    color: "#111111",
    nameWrap: true,
    video: "/banner-custom.mp4",
    poster: "/banner-custom-poster.webp",
    mediaPos: "0% 60%",
    noScrim: true,
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

export default function Hero() {
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

      <div className="hero__stage" ref={stageRef}>
        <div className="hero__track" ref={trackRef}>
          {tiles.map((tile, i) => (
            <a
              key={`${tile.name}-${i}`}
              href={tile.productHref}
              aria-label={`Vai al prodotto ${tile.name}`}
              className={`hero__card hero__card--flat${
                tile.video ? " hero__card--media" : ""
              }`}
              style={{ background: tile.background, color: tile.color }}
            >
              {tile.video && (
                <>
                  <video
                    className="hero__cardMedia"
                    src={withBasePath(tile.video)}
                    poster={tile.poster ? withBasePath(tile.poster) : undefined}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    style={{
                      ...(tile.mediaPos && {
                        objectPosition: tile.mediaPos,
                      }),
                      ...(tile.mediaScale && {
                        transform: `scale(${tile.mediaScale})`,
                      }),
                    }}
                  />
                  {!tile.noScrim && <span className="hero__cardScrim" />}
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
                    src={withBasePath(tile.logo)}
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
                    className={`hero__cardName${
                      tile.nameWrap ? " hero__cardName--wrap" : ""
                    }`}
                    style={{
                      fontSize: `calc(var(--card-w) * ${
                        tile.nameWrap ? "0.105" : nameScale(tile.name).toFixed(3)
                      })`,
                    }}
                  >
                    {tile.name}
                  </span>
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
