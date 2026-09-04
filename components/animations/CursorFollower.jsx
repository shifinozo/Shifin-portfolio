"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Fixed element that eases toward the cursor while `active` (desktop only via CSS). */
export default function CursorFollower({ active, children, className = "" }) {
  const ref = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!active) return;
    current.current = { ...target.current };
    let raf = 0;

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div ref={ref} className={cn("cf", active && "on", className)} aria-hidden="true">
      {children}
    </div>
  );
}
