"use client";

import { useEffect, useRef, useState } from "react";
import SplitText from "@/components/animations/SplitText";
import { cn } from "@/lib/utils";

const FOCUS = ["MERN Stack", "Next.js Apps", "CMS Platforms", "REST APIs", "Animated UI"];

// Matches the SiteChrome intro curtain so the hero plays as it lifts.
const INTRO_DELAY = 1000;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 8 8 2M3 2h5v5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => setOn(true), reduced ? 0 : INTRO_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Pointer parallax (--mx/--my, -1..1) and scroll-out progress (--sp, 0..1),
  // eased and written straight to CSS variables.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { mx: 0, my: 0, sp: 0 };
    const current = { ...target };
    let raf = 0;

    function frame() {
      let moving = false;
      for (const key of ["mx", "my", "sp"]) {
        current[key] += (target[key] - current[key]) * 0.08;
        if (Math.abs(target[key] - current[key]) > 0.001) moving = true;
        else current[key] = target[key];
        node.style.setProperty(`--${key}`, current[key].toFixed(4));
      }
      raf = moving ? requestAnimationFrame(frame) : 0;
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    function onMove(e) {
      target.mx = (e.clientX / window.innerWidth) * 2 - 1;
      target.my = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    }
    function onScroll() {
      const rect = node.getBoundingClientRect();
      target.sp = Math.min(1, Math.max(0, -rect.top / rect.height));
      kick();
    }

    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" ref={ref} className={cn("hr", on && "on")}>
      <div className="hr-stage" aria-hidden="true">
        <span className="hr-sun" />
        <div className="hr-person">
          <img src="/images/ozo_photo-removebg-preview.png" alt="" draggable={false} />
        </div>
      </div>

      <div className="hr-copy">
        <p className="hr-hey">
          <span className="hr-hey-i">Hey, I&rsquo;m Muhammed Shifin</span>
        </p>
        <SplitText
          as="h1"
          text={["Full Stack", "Developer"]}
          mode="lines"
          className="hr-title"
          stagger={0.12}
          delay={0.15}
          duration={1.1}
          rotate={3}
          active={on}
        />
      </div>

      <div className="hr-aside">
        <p className="hr-lede">
          Portfolio of Muhammed Shifin — building scalable full-stack web apps and CMS platforms
          with MongoDB, Express.js, React, Next.js and Node.js.
        </p>
        <a href="#projects" className="hr-pill">
          <span>View my work</span>
          <span className="hr-pill-dot">
            <ArrowIcon />
          </span>
        </a>
        <a href="/resume/resume.pdf" download className="hr-resume">
          [ download resume ]
        </a>
      </div>

      <ul className="hr-focus">
        {FOCUS.map((label, i) => (
          <li key={label} style={{ transitionDelay: `${0.75 + i * 0.08}s` }}>
            <span className="hr-focus-num">
              <span className="hr-slash" aria-hidden="true" />
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="hr-focus-label">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
