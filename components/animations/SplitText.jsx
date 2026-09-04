"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/**
 * Splits text into masked words that slide up with a stagger once in view.
 * `text` may be a string or an array of lines. `mode="lines"` animates whole lines.
 * Pass `active` to drive the reveal externally (e.g. from scroll progress).
 */
export default function SplitText({
  as: Tag = "span",
  text,
  mode = "words",
  stagger = 0.045,
  delay = 0,
  duration = 0.9,
  rotate = 0,
  blur = 0,
  active,
  threshold = 0.2,
  className = "",
  wordClassName = "",
  style,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold });
  const on = active ?? inView;
  const lines = Array.isArray(text) ? text : [text];
  let index = 0;

  const vars = {
    "--st-dur": `${duration}s`,
    "--st-rot": `${rotate}deg`,
    "--st-blur": `${blur}px`,
    ...style,
  };

  return (
    <Tag ref={ref} className={cn("st", on && "on", className)} style={vars} {...rest}>
      {lines.map((line, li) => {
        const words = mode === "lines" ? [line] : String(line).split(" ");
        const content = words.map((word, wi) => {
          const d = delay + index++ * stagger;
          return (
            <span key={wi}>
              <span className={cn("st-w", wordClassName)}>
                <span className="st-i" style={{ transitionDelay: `${d}s` }}>
                  {word}
                </span>
              </span>
              {wi < words.length - 1 ? " " : ""}
            </span>
          );
        });
        return lines.length > 1 || mode === "lines" ? (
          <span key={li} className="st-line">
            {content}
          </span>
        ) : (
          content
        );
      })}
    </Tag>
  );
}
