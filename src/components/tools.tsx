"use client";

import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/base-path";

type Spot = {
  src: string;
  /* resting offset from the centre of the stage */
  tx: string;
  ty: string;
  /* tile size and box colour */
  s: string;
  bg: string;
  /* knock the logo out to white for solid dark tiles */
  invert?: boolean;
  /* entrance delay (ms) and float rhythm */
  d: number;
  float: string;
};

const SPOTS: Spot[] = [
  { src: "/kore-mark.webp", tx: "-37vw", ty: "-20vh", s: "clamp(64px, 6vw, 104px)", bg: "#6432f0", invert: true, d: 0, float: "5.6s" },
  { src: "/o-color.svg", tx: "35vw", ty: "-23vh", s: "clamp(56px, 5.4vw, 94px)", bg: "#6F4DFF", invert: true, d: 80, float: "6.4s" },
  { src: "/acta.webp", tx: "-26vw", ty: "-33vh", s: "clamp(60px, 5.6vw, 98px)", bg: "#111111", invert: true, d: 160, float: "7.2s" },
  { src: "/allmessage.webp", tx: "24vw", ty: "-35vh", s: "clamp(68px, 6.5vw, 116px)", bg: "#7C5CFF", invert: true, d: 240, float: "6s" },
  { src: "/argo.svg", tx: "-41vw", ty: "8vh", s: "clamp(62px, 6.1vw, 108px)", bg: "#2C1967", invert: true, d: 320, float: "6.7s" },
  { src: "/kore-mark.webp", tx: "40vw", ty: "6vh", s: "clamp(52px, 4.8vw, 82px)", bg: "#ffffff", d: 400, float: "7.5s" },
  { src: "/o-color.svg", tx: "-27vw", ty: "26vh", s: "clamp(52px, 5vw, 86px)", bg: "#ffffff", d: 470, float: "5.9s" },
  { src: "/acta.webp", tx: "30vw", ty: "27vh", s: "clamp(62px, 6vw, 104px)", bg: "#ffffff", d: 540, float: "6.9s" },
  { src: "/allmessage.webp", tx: "-7vw", ty: "31vh", s: "clamp(68px, 6.8vw, 120px)", bg: "#ffffff", d: 610, float: "6.2s" },
  { src: "/argo.svg", tx: "11vw", ty: "35vh", s: "clamp(56px, 5.1vw, 88px)", bg: "#ffffff", d: 680, float: "7.8s" },
];

/* scroll progress where each line appears, and where it turns dark */
const CUR = [0.1, 0.42, 0.72];
const DONE = [0.42, 0.72, 0.9];


export default function Tools() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const rows = Array.from(stage.querySelectorAll<HTMLElement>("[data-row]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.classList.add("is-in");
      rows.forEach((row) => row.classList.add("is-cur", "is-done"));
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
      { threshold: 0.35 },
    );
    observer.observe(stage);

    let raf = 0;
    const draw = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight, 1);
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      rows.forEach((row, i) => {
        row.classList.toggle("is-cur", p >= CUR[i]);
        row.classList.toggle("is-done", p >= DONE[i]);
      });
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
      observer.disconnect();
    };
  }, []);

  return (
    <section className="lib" ref={rootRef}>
      <div className="lib__stage" ref={stageRef}>
        {SPOTS.map((spot, i) => (
          <span
            key={i}
            className="lib__spot"
            style={
              {
                "--tx": spot.tx,
                "--ty": spot.ty,
                "--s": spot.s,
                "--bg": spot.bg,
                "--d": `${spot.d}ms`,
                "--f": spot.float,
              } as React.CSSProperties
            }
          >
            <span
              className={`lib__tile${spot.invert ? " lib__tile--invert" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBasePath(spot.src)} alt="" loading="lazy" />
            </span>
          </span>
        ))}

        <div className="lib__copy">
          <p className="lib__kicker">Plug And Play</p>
          <h2 className="lib__title">
            <span className="lib__line" data-row>
              Ogni fase
            </span>
            <span className="lib__line" data-row>
              lo <em>strumento</em> giusto
            </span>
            <span className="lib__line" data-row>
              Tutto connesso in un unico <em>ecosistema</em>
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
