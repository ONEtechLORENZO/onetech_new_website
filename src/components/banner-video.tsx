"use client";

import { useEffect, useRef } from "react";

/*
 * Il video del banner parte quando il blocco entra in vista, va una volta
 * sola e resta fermo sull'ultimo fotogramma. Se esci e rientri nel blocco,
 * riparte da capo.
 */
export default function BannerVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* armato = è uscito dalla vista, quindi al rientro può ripartire */
    let armed = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!armed) return;
            armed = false;
            video.currentTime = 0;
            void video.play().catch(() => {});
          } else {
            armed = true;
            video.pause();
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="koreb__video"
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
    />
  );
}
