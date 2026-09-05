"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { STATS, STATS_MEDIA } from "@/data/stats";

function clamp(v) {
  return Math.min(1, Math.max(0, v));
}

/**
 * Pinned section (600vh scroll) showing the showcase clip full-bleed.
 * Scroll position drives the video's timeline, so the footage advances only as
 * far as the reader has scrolled. The section carries no text — the clip is the
 * whole content — so the stat figures are exposed to assistive tech instead.
 */
export default function Stats() {
  // Heavily smoothed: raw scroll deltas make the scrubbed video snap between
  // frames. A low factor trades a little latency for a much steadier glide.
  const { ref, progress } = useScrollProgress({ mode: "sticky", smooth: 0.07 });
  const [mediaBroken, setMediaBroken] = useState(false);
  const videoRef = useRef(null);
  const seekRef = useRef({ target: 0, raf: 0 });

  // Scrub the clip with scroll: the section's progress maps onto the video's
  // timeline. Seeking is coalesced into one rAF to avoid thrashing the decoder.
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
        // Only seek when the target is at least a frame away (30fps ≈ 0.033s);
        // sub-frame seeks are work the viewer cannot see.
        if (video.readyState >= 2 && Math.abs(video.currentTime - state.target) > 0.033) {
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

  return (
    <section id="stats" className="sv" ref={ref}>
      <div className="sv-sticky">
        {hasMedia && (
          <div
            className="sv-media"
            style={{
              opacity: mediaEase,
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

        {/* The figures are no longer shown, but they still describe the work —
            keep them readable to screen readers and search engines. */}
        <ul className="sr-only">
          {STATS.map((item) => (
            <li key={item.id}>
              {item.stat} {item.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
