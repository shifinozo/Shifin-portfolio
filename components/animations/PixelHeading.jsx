"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/**
 * Heading rendered to a canvas that resolves from coarse pixels to sharp text
 * (reference "Pixel Text Reveal"). The real text stays in the DOM for a11y/SEO.
 * Sizes are in vw per breakpoint; explicit "\n" breaks are honoured and long
 * lines wrap greedily to the container width.
 */
export default function PixelHeading({
  as: Tag = "h2",
  text,
  size = 4.44,
  sizeMd = 7.25,
  sizeSm = 11.9,
  lineHeight = 1.1,
  weight = 500,
  color = "#f2f2f2",
  duration = 1100,
  maxPixel = 0.16,
  className = "",
}) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const canvasRef = useRef(null);
  const offRef = useRef(null);
  const tinyRef = useRef(null);
  const revealedRef = useRef(false);
  const [height, setHeight] = useState(null);

  const paint = useCallback(
    (t) => {
      const canvas = canvasRef.current;
      const off = offRef.current;
      if (!canvas || !off) return;
      const ctx = canvas.getContext("2d");
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const eased = 1 - Math.pow(1 - t, 3);
      const px = Math.round((1 - eased) * H * maxPixel);

      if (px <= 1) {
        ctx.imageSmoothingEnabled = true;
        ctx.globalAlpha = 1;
        ctx.drawImage(off, 0, 0);
        return;
      }

      const sw = Math.max(1, Math.round(W / px));
      const sh = Math.max(1, Math.round(H / px));
      const tiny = tinyRef.current || (tinyRef.current = document.createElement("canvas"));
      tiny.width = sw;
      tiny.height = sh;
      const tctx = tiny.getContext("2d");
      tctx.imageSmoothingEnabled = true;
      tctx.clearRect(0, 0, sw, sh);
      tctx.drawImage(off, 0, 0, sw, sh);

      ctx.imageSmoothingEnabled = false;
      ctx.globalAlpha = Math.min(1, t * 2.5);
      ctx.drawImage(tiny, 0, 0, W, H);
      ctx.globalAlpha = 1;
    },
    [maxPixel]
  );

  // Lay the text out offscreen at the container's current width.
  const build = useCallback(async () => {
    const wrap = ref.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const vw = window.innerWidth;
    const sizeVw = vw <= 640 ? sizeSm : vw <= 1024 ? sizeMd : size;
    let fsCss = (sizeVw * vw) / 100;
    const width = wrap.clientWidth;
    if (!width) return;

    const family = getComputedStyle(wrap).fontFamily;
    try {
      await document.fonts.load(`${weight} 20px ${family}`);
    } catch {
      /* font may not be loadable by name; the fallback stack still renders */
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const measure = document.createElement("canvas").getContext("2d");
    const setFont = (px) => {
      measure.font = `${weight} ${px}px ${family}`;
      if (!measure.font.includes("px")) measure.font = `${weight} ${px}px sans-serif`;
    };
    setFont(fsCss);

    // Shrink to fit when the longest single word would overflow (narrow screens).
    const longest = Math.max(
      ...text.split(/[\s\n]+/).map((word) => measure.measureText(word).width)
    );
    if (longest > width) {
      fsCss = Math.max(12, fsCss * (width / longest));
      setFont(fsCss);
    }

    // Greedy wrap within the width, honouring explicit breaks.
    const lines = [];
    text.split("\n").forEach((para) => {
      let line = "";
      para.split(" ").forEach((word) => {
        const trial = line ? `${line} ${word}` : word;
        if (line && measure.measureText(trial).width > width) {
          lines.push(line);
          line = word;
        } else {
          line = trial;
        }
      });
      lines.push(line);
    });

    const lineH = fsCss * lineHeight;
    const cssHeight = Math.ceil(lines.length * lineH);
    setHeight(cssHeight);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(cssHeight * dpr);

    const off = document.createElement("canvas");
    off.width = canvas.width;
    off.height = canvas.height;
    const ctx = off.getContext("2d");
    ctx.font = measure.font.replace(/[\d.]+px/, `${fsCss * dpr}px`);
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    if ("letterSpacing" in ctx) ctx.letterSpacing = `${-0.015 * fsCss * dpr}px`;
    lines.forEach((ln, i) => ctx.fillText(ln, 0, (i + 0.5) * lineH * dpr));
    offRef.current = off;

    if (revealedRef.current) paint(1);
  }, [text, size, sizeMd, sizeSm, lineHeight, weight, color, paint, ref]);

  useEffect(() => {
    build();
    let timer = 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(build, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, [build]);

  useEffect(() => {
    if (!inView || revealedRef.current) return;
    revealedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      paint(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, duration, paint]);

  const lineCount = text.split("\n").length;
  const fallbackHeight = `calc(${lineCount} * ${lineHeight} * var(--t-h2))`;

  return (
    <Tag
      ref={ref}
      className={cn("ph", className)}
      style={{ height: height ? `${height}px` : fallbackHeight }}
    >
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <canvas ref={canvasRef} aria-hidden="true" />
    </Tag>
  );
}
