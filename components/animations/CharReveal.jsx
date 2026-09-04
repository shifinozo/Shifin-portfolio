"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

function clamp(v) {
  return Math.min(1, Math.max(0, v));
}

/**
 * Statement with a 20%-opacity ghost copy; words rise in on entry, then the
 * solid characters fill in left-to-right as the block scrolls up the viewport.
 */
export default function CharReveal({ as: Tag = "h2", text, className = "", indent = true }) {
  const { ref, progress } = useScrollProgress({ mode: "viewport" });
  const words = text.split(" ");
  const total = text.replace(/ /g, "").length;
  const filled = Math.floor(clamp((progress - 0.12) / 0.4) * total);
  const on = progress > 0.08;
  let charIndex = 0;

  return (
    <Tag ref={ref} className={cn("cr", on && "on", className)} aria-label={text}>
      <span aria-hidden="true">
        {indent && <span className="cr-indent" />}
        {words.map((word, wi) => (
          <span key={wi} className="cr-wrap">
            <span className="cr-word" style={{ transitionDelay: `${wi * 0.03}s` }}>
              {[...word].map((ch, k) => {
                const idx = charIndex++;
                return (
                  <span key={k} className="cr-ch">
                    <span className="cr-ghost">{ch}</span>
                    <span className={cn("cr-c", idx < filled && "on")}>{ch}</span>
                  </span>
                );
              })}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
