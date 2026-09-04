"use client";

import { useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { STATS, STATS_HEADLINE, STATS_MEDIA } from "@/data/stats";
import { cn } from "@/lib/utils";

// Desktop placements for the floating points (reference: absolute % positions around the object).
const POSITIONS = [
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
  const { ref, progress } = useScrollProgress({ mode: "sticky" });
  const [mediaBroken, setMediaBroken] = useState(false);

  const mediaP = clamp(progress / 0.35);
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
              transform: `translate(-50%, -50%) scale(${0.7 + 0.3 * mediaEase}) rotate(${((1 - mediaEase) * -6).toFixed(2)}deg)`,
            }}
          >
            {STATS_MEDIA.video ? (
              <video
                src={STATS_MEDIA.video}
                poster={STATS_MEDIA.poster || undefined}
                muted
                loop
                autoPlay
                playsInline
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
