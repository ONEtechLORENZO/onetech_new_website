"use client";

import { Fragment, useEffect, useRef } from "react";

const LEAD = 16; // words mid-reveal at once — the soft edge
const MAX_BLUR = 12;

/*
 * Sharpens its words in sequence as the block scrolls up the viewport.
 * Whitespace runs are left outside the spans so line breaks survive.
 */
export default function BlurText({
  paragraphs,
  className = "",
}: {
  paragraphs: string[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const words = Array.from(root.querySelectorAll<HTMLElement>(".blurword"));
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
      const p = Math.min(
        Math.max((start - rect.top) / Math.max(rect.height * 0.9, 1), 0),
        1,
      );
      if (Math.abs(p - last) < 0.001) return;
      last = p;

      const front = p * (total + LEAD);
      for (let i = 0; i < total; i += 1) {
        const local = Math.min(Math.max((front - i) / LEAD, 0), 1);
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
  }, [paragraphs]);

  return (
    <div className={className} ref={rootRef}>
      {paragraphs.map((paragraph, pi) => (
        <p key={pi}>
          {paragraph.split(/(\s+)/).map((token, i) =>
            /^\s+$/.test(token) ? (
              <Fragment key={i}>{token}</Fragment>
            ) : (
              <span className="blurword" key={i}>
                {token}
              </span>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
