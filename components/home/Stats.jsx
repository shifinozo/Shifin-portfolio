"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { STATS, STATS_HEADLINE, STATS_MEDIA } from "@/data/stats";
import { cn } from "@/lib/utils";

// Desktop placements for the floating points (reference: absolute % positions around the object).
const POSITIONS = [
  // The media is full-bleed behind these, so they can spread across the frame;
  // a scrim over the clip keeps them legible.
  { top: "40%", left: "16.5%" },
  { top: "15%", right: "24%" },
  { top: "68%", right: "8%" },
  { top: "74%", left: "34%" },
];

function clamp(v) {
  return Math.min(1, Math.max(0, v));
}

function Square({ large }) {
  return (
    <span className={cn("sv-sq", large && "sv-sq-lg")} aria-hidden="true">
      <span className="sv-sq-outline" />
      <span className="sv-sq-inner" />
    </span>
  );
}

/** Pinned section (600vh scroll) — headline words, floating points and the centre media resolve with progress. */
export default function Stats() {
  // Smoothed: raw scroll deltas make the scrubbed video snap between frames.
  const { ref, progress } = useScrollProgress({ mode: "sticky", smooth: 0.14 });
  const [mediaBroken, setMediaBroken] = useState(false);
  const videoRef = useRef(null);
  const seekRef = useRef({ target: 0, raf: 0 });

  // Scrub the clip with scroll: the section's progress maps onto the video's
  // timeline, so the footage advances only as far as the reader has scrolled.
  // Seeking is coalesced into one rAF to avoid thrashing the decoder.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // The video must never play on its own — scroll is the only clock.
    video.pause();

    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    if (!duration) return;

    // Hold a hair short of the end; seeking to exactly duration can bounce
    // back to frame 0 in some browsers.
    const state = seekRef.current;
    state.target = Math.min(clamp(progress) * duration, duration - 0.05);

    if (!state.raf) {
      state.raf = requestAnimationFrame(() => {
        state.raf = 0;
        if (video.readyState >= 1 && Math.abs(video.currentTime - state.target) > 0.02) {
          video.currentTime = state.target;
        }
      });
    }
  }, [progress, mediaBroken]);

  // Duration is unknown until metadata loads; seek once it arrives so the
  // first frame matches the reader's position rather than starting at 0.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      if (!Number.isFinite(video.duration)) return;
      video.pause();
      video.currentTime = Math.min(clamp(progress) * video.duration, video.duration - 0.05);
    };

    video.addEventListener("loadedmetadata", onMeta);
    return () => video.removeEventListener("loadedmetadata", onMeta);
    // Intentionally not re-bound on progress: this only needs the value at load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaBroken]);

  useEffect(() => {
    const state = seekRef.current;
    return () => cancelAnimationFrame(state.raf);
  }, []);

  const mediaP = clamp(progress / 0.2);
  const mediaEase = 1 - Math.pow(1 - mediaP, 3);
  const hasMedia = !mediaBroken && (STATS_MEDIA.video || STATS_MEDIA.image);

  let wordIndex = 0;

  return (
    <section id="stats" className="sv" ref={ref}>
      <div className="sv-sticky">
        {hasMedia && (
          <div
            className="sv-media"
            style={{
              opacity: mediaEase,
              // Full-bleed: a gentle push-in only. The old scale/rotate framed
              // the clip as an object, which reads wrong as a background.
              transform: `scale(${(1.06 - 0.06 * mediaEase).toFixed(3)})`,
            }}
          >
            {STATS_MEDIA.video ? (
              <video
                ref={videoRef}
                src={STATS_MEDIA.video}
                poster={STATS_MEDIA.poster || undefined}
                muted
                playsInline
                // Scroll drives the timeline, so no autoplay or loop; the whole
                // clip is preloaded so seeking lands on a decoded frame.
                preload="auto"
                onError={() => setMediaBroken(true)}
              />
            ) : (
              <img src={STATS_MEDIA.image} alt="" onError={() => setMediaBroken(true)} />
            )}
          </div>
        )}

        <div className="sv-headline">
          <h2>
            {STATS_HEADLINE.map((line, li) => (
              <span key={li} className="sv-line">
                {line.split(" ").map((word, wi) => {
                  const on = progress > 0.06 + wordIndex++ * 0.03;
                  return (
                    <span key={wi} className="sv-w-wrap">
                      <span className={cn("sv-w", on && "on")}>{word}</span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>
        </div>

        {STATS.map((item, i) => {
          const on = progress > 0.38 + i * 0.09;
          const squareFirst = i % 2 === 1;
          const text = `${item.stat} ${item.description}`;
          return (
            <div key={item.id} className={cn("sv-point", on && "on")} style={POSITIONS[i]}>
              {squareFirst && <Square large={i === 1} />}
              <p className="sv-point-text">
                {text.split(" ").map((word, k) => (
                  <span key={k} className="sv-pw-wrap">
                    <span className="sv-pw" style={{ transitionDelay: `${k * 0.06}s` }}>
                      {word}
                    </span>
                  </span>
                ))}
              </p>
              {!squareFirst && <Square large={i === 0} />}
            </div>
          );
        })}

        <div className="sv-mobile">
          {STATS.map((item, i) => {
            const on = progress > 0.38 + i * 0.09;
            return (
              <div key={item.id} className={cn("sv-mrow", on && "on")}>
                <p>
                  <span className="sv-mrow-i">
                    {item.stat} {item.description}
                  </span>
                </p>
                <div className="sv-mline" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
