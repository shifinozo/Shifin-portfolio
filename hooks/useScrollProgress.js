"use client";

import { useEffect, useRef, useState } from "react";

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

/**
 * Progress (0..1) of an element through the viewport.
 *  - "sticky": for tall spacers with a sticky child — 0 when the spacer top hits
 *    the viewport top, 1 when its bottom reaches the viewport bottom.
 *  - "viewport": 0 when the element's top enters from below, 1 when its bottom leaves the top.
 */
export function useScrollProgress({ mode = "sticky", smooth = 0 } = {}) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    let target = 0;
    let current = 0;
    let last = -1;

    function measure() {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      target =
        mode === "sticky"
          ? clamp(-rect.top / Math.max(1, rect.height - vh))
          : clamp((vh - rect.top) / (vh + rect.height));
    }

    function frame() {
      raf = 0;
      if (smooth > 0) {
        current += (target - current) * smooth;
        if (Math.abs(target - current) > 0.0005) raf = requestAnimationFrame(frame);
        else current = target;
      } else {
        current = target;
      }
      const rounded = Math.round(current * 1000) / 1000;
      if (rounded !== last) {
        last = rounded;
        setProgress(rounded);
      }
    }

    function onScroll() {
      measure();
      if (!raf) raf = requestAnimationFrame(frame);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mode, smooth]);

  return { ref, progress };
}
