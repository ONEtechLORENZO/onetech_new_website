"use client";

import { useEffect, useRef, useState } from "react";

type Interview = {
  video?: string;
  poster?: string;
  /* a still LinkedIn post instead of a clip */
  image?: string;
  href: string;
};

const LINKEDIN = "https://www.linkedin.com/company/otech-one/";

const INTERVIEWS: Interview[] = [
  { video: "/itv-antonio.mp4", poster: "/itv-antonio-poster.jpg", href: LINKEDIN },
  {
    image: "/post-lorenzo.webp?v=2",
    href: "https://www.linkedin.com/posts/lorenzo-pone-one_il-90-delle-aziende-che-dicono-di-fare-activity-7493200264968130562-tTJS",
  },
  { video: "/itv-lorenzo.mp4", poster: "/itv-lorenzo-poster.jpg", href: LINKEDIN },
  {
    image: "/post-david.webp?v=2",
    href: "https://lnkd.in/p/eMNdcjxm",
  },
  { video: "/itv-one.mp4", poster: "/itv-one-poster.jpg", href: LINKEDIN },
];

/* doubled so the wrapping slide always moves while hidden — no visible pop */
const REEL = [...INTERVIEWS, ...INTERVIEWS];

export default function Interviews() {
  const [active, setActive] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  const n = REEL.length;

  /* only the front video plays; the sides hold on a frame */
  useEffect(() => {
    videos.current.forEach((video, i) => {
      if (!video) return;
      video.muted = true;
      if (i === active) void video.play().catch(() => {});
      else video.pause();
    });
  }, [active]);

  return (
    <section className="itv" id="news">
      <h2 className="itv__title">News e Blog</h2>

      <div className="itv__track">
        {REEL.map((interview, i) => {
          let offset = (i - active + n) % n;
          if (offset > n / 2) offset -= n;
          const role =
            offset === 0 ? "active" : Math.abs(offset) === 1 ? "side" : "hidden";

          return (
            <div
              key={i}
              className={`itv__slide itv__slide--${role}`}
              style={{ order: offset + n }}
              onClick={role === "side" ? () => setActive(i) : undefined}
              aria-hidden={role === "hidden"}
            >
              {interview.image ? (
                role === "active" ? (
                  <a
                    className="itv__postLink"
                    href={interview.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="itv__post" src={interview.image} alt="" />
                    <span className="itv__more">
                      See more <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img className="itv__post" src={interview.image} alt="" />
                )
              ) : (
                <>
                  <video
                    ref={(node) => {
                      videos.current[i] = node;
                    }}
                    src={interview.video}
                    poster={interview.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                  />
                  {role === "active" && (
                    <a
                      className="itv__more"
                      href={interview.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      See more <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="itv__nav">
        <button
          type="button"
          className="itv__arrow"
          onClick={() => setActive((i) => (i - 1 + n) % n)}
          aria-label="Contenuto precedente"
        >
          ←
        </button>
        <button
          type="button"
          className="itv__arrow"
          onClick={() => setActive((i) => (i + 1) % n)}
          aria-label="Contenuto successivo"
        >
          →
        </button>
      </div>
    </section>
  );
}
