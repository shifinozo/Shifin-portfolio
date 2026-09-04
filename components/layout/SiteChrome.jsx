"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Page-load intro curtain and the fixed "[ scroll down ]" indicator. */
export default function SiteChrome() {
  const [phase, setPhase] = useState("in"); // in → out → done
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setPhase("out"), reduced ? 0 : 1000);
    const t2 = setTimeout(() => setPhase("done"), reduced ? 0 : 1950);

    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {phase !== "done" && (
        <div className={cn("intro", phase === "out" && "out")} aria-hidden="true">
          <div className="intro-inner">
            <span className="intro-mark">
              MS<span>.</span>
            </span>
            <p className="intro-sub">MERN Stack Developer</p>
          </div>
        </div>
      )}

      <div className={cn("sdi", (scrolled || phase !== "done") && "off")} aria-hidden="true">
        <span>[</span> scroll down <span>]</span>
      </div>
    </>
  );
}
