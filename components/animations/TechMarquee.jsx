"use client";

import { useEffect, useRef, useState } from "react";
import {
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiAxios,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiCloudinary,
  SiSocketdotio,
  SiJsonwebtokens,
  SiGit,
  SiGreensock,
  SiFramer,
  SiThreedotjs,
  SiClaude,
  SiPerplexity,
} from "react-icons/si";
import { TbApi, TbMail, TbSparkles } from "react-icons/tb";
import SplitText from "@/components/animations/SplitText";
import CursorFollower from "@/components/animations/CursorFollower";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const TECH = [
  { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { label: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { label: "CSS", Icon: SiCss, color: "#2965F1" },
  { label: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { label: "React (Vite)", Icon: SiReact, color: "#61DAFB" },
  { label: "Context API", Icon: SiReact, color: "#61DAFB" },
  { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { label: "Axios", Icon: SiAxios, color: "#5A29E4" },
  { label: "Node.js", Icon: SiNodedotjs, color: "#539E43" },
  { label: "Express.js", Icon: SiExpress, color: "#FFFFFF" },
  { label: "REST APIs", Icon: TbApi, color: "#4FD1FF" },
  { label: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { label: "Cloudinary", Icon: SiCloudinary, color: "#3448C5" },
  { label: "Socket.io", Icon: SiSocketdotio, color: "#FFFFFF" },
  { label: "Nodemailer", Icon: TbMail, color: "#7C5CFF" },
  { label: "JWT", Icon: SiJsonwebtokens, color: "#FB015B" },
  { label: "GSAP", Icon: SiGreensock, color: "#88CE02" },
  { label: "Framer Motion", Icon: SiFramer, color: "#FFFFFF" },
  { label: "React Three Fiber", Icon: SiThreedotjs, color: "#FFFFFF" },
  { label: "Git", Icon: SiGit, color: "#F05032" },
  { label: "Claude", Icon: SiClaude, color: "#D97757" },
  { label: "Cursor", Icon: TbSparkles, color: "#4FD1FF" },
  { label: "Perplexity", Icon: SiPerplexity, color: "#20808D" },
];

const AUTO_SPEED = 0.6; // px per frame
const MAX_FLING = 40;

/** Draggable, auto-scrolling row of bordered logo cards (reference "Trusted by" strip). */
export default function TechMarquee() {
  const trackRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.15 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let half = track.scrollWidth / 2;
    let raf = 0;
    let dragging = false;
    let startX = 0;
    let startOffset = 0;
    let lastX = 0;
    let lastT = 0;
    let fling = 0;

    const resize = () => {
      half = track.scrollWidth / 2;
    };

    const loop = () => {
      if (!dragging) {
        x -= AUTO_SPEED + fling;
        fling *= 0.95;
        if (Math.abs(fling) < 0.01) fling = 0;
      }
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const down = (e) => {
      dragging = true;
      startX = e.clientX;
      startOffset = x;
      lastX = e.clientX;
      lastT = performance.now();
      fling = 0;
    };
    const move = (e) => {
      if (!dragging) return;
      x = startOffset + (e.clientX - startX);
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      fling = Math.max(-MAX_FLING, Math.min(MAX_FLING, (-(e.clientX - lastX) / dt) * 16));
      lastX = e.clientX;
      lastT = now;
    };
    const up = () => {
      dragging = false;
    };

    track.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="lg" ref={ref} aria-label="Technologies I work with">
      <div className="lg-head">
        <SplitText as="h3" text="Technologies I work with." className="lg-title" />
      </div>

      <div
        className="lg-viewport"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="lg-track" ref={trackRef}>
          {[0, 1].map((copy) =>
            TECH.map((tech, i) => (
              <div
                key={`${copy}-${tech.label}`}
                className={cn("lg-card", inView && "on")}
                style={{ transitionDelay: copy === 0 ? `${Math.min(i, 8) * 0.06}s` : "0s" }}
                aria-hidden={copy === 1 || undefined}
              >
                <div className="lg-card-inner">
                  <tech.Icon style={{ color: tech.color }} />
                  <span>{tech.label}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <CursorFollower active={hover}>
        <span className="cf-inner cf-label">Tech stack</span>
      </CursorFollower>
    </div>
  );
}
