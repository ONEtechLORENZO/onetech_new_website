"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";

type Slide = {
  caption: string;
  video: string;
  poster: string;
};

/* Captions describe the footage — swap them for real ones. */
const SLIDES: Slide[] = [
  { caption: "Ingegneria, 2026", video: "/careers-1.mp4", poster: "/careers-1-poster.jpg" },
  { caption: "Dove lavoriamo, 2026", video: "/careers-2.mp4", poster: "/careers-2-poster.jpg" },
  { caption: "Dentro lo studio, 2026", video: "/careers-3.mp4", poster: "/careers-3-poster.jpg" },
  { caption: "Lavorare insieme, 2026", video: "/careers-4.mp4", poster: "/careers-4-poster.jpg" },
];

/* doubled so a card leaving the left has somewhere hidden to go */
const REEL = [...SLIDES, ...SLIDES];

const INTERVAL = 4000;

export default function CareersMedia() {
  const [active, setActive] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  /* only the centre clip plays — the side ones hold on a frame */
  useEffect(() => {
    videos.current.forEach((video, i) => {
      if (video && i !== active) video.pause();
    });

    const el = videos.current[active];
    if (!el) return;
    el.muted = true;

    // seek once on activation; the retry only re-issues play(), because
    // re-seeking drops readyState and re-fires canplay in a loop
    try {
      el.currentTime = 0;
    } catch {
      /* metadata not in yet — it will start from wherever it is */
    }

    const play = () => void el.play().catch(() => {});
    play();
    el.addEventListener("canplay", play);

    return () => {
      el.removeEventListener("canplay", play);
    };
  }, [active]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      // step forwards so the row travels right to left
      setActive((i) => (i + 1) % REEL.length);
    }, INTERVAL);

    return () => window.clearInterval(id);
  }, []);

  const n = REEL.length;

  return (
    <div className="careers__media">
      {REEL.map((slide, i) => {
        // signed distance from the centre, wrapped so the row can loop
        let offset = (i - active + n) % n;
        if (offset > n / 2) offset -= n;

        const role =
          offset === 0 ? "active" : Math.abs(offset) === 1 ? "side" : "hidden";

        return (
          <div
            key={i}
            className={`careers__slide careers__slide--${role}`}
            /* flex order keeps the loop in sequence no matter the DOM order */
            style={{ order: offset + n }}
            aria-hidden={role === "hidden"}
          >
            <span className="careers__slideArt">
              <video
                ref={(node) => {
                  videos.current[i] = node;
                }}
                src={withBasePath(slide.video)}
                poster={withBasePath(slide.poster)}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}
