"use client";

import { useEffect, useRef, useState } from "react";
import SplitText from "@/components/animations/SplitText";
import LineLink from "@/components/animations/LineLink";
import { PROJECTS } from "@/data/projects";
import { SOCIAL_LINKS } from "@/data/socialLinks";
import { cn } from "@/lib/utils";

// Editorial "article inner" sequence: each project is a pinned spread whose cover
// opens from an inset card to full-bleed while the headline splits apart, then
// the article meta/body reveal and the spread recedes as the next one arrives.
const OPEN_END = 0.5; // cover fully open
const DETAILS_AT = 0.42; // body copy reveals
const EXIT_START = 0.82; // spread starts receding

function clamp(v) {
  return Math.min(1, Math.max(0, v));
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1 5h8M5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

// Writes scroll progress straight to CSS variables so the pinned spread animates
// without re-rendering; React state only flips when the body copy should reveal.
function useArticleProgress() {
  const ref = useRef(null);
  const [details, setDetails] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let target = 0;
    let current = 0;
    let entry = 0;

    function apply(p) {
      const open = reduced ? 1 : easeInOut(clamp(p / OPEN_END));
      const exit = reduced ? 0 : clamp((p - EXIT_START) / (1 - EXIT_START));
      node.style.setProperty("--in", reduced ? "1" : entry.toFixed(4));
      node.style.setProperty("--o", open.toFixed(4));
      node.style.setProperty("--pan", p.toFixed(4));
      node.style.setProperty("--x", exit.toFixed(4));
      setDetails(reduced || p >= DETAILS_AT);
    }

    function measure() {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      target = clamp(-rect.top / Math.max(1, rect.height - vh));
      // 0 while the spread is still below the fold, 1 once it has docked at the top.
      entry = clamp(1 - rect.top / (vh * 0.5));
    }

    function frame() {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;
      else raf = requestAnimationFrame(frame);
      apply(current);
      if (current === target) raf = 0;
    }

    function onScroll() {
      measure();
      if (!raf) raf = requestAnimationFrame(frame);
    }

    measure();
    current = target;
    apply(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, details];
}

function Article({ project, total }) {
  const [ref, details] = useArticleProgress();
  const [broken, setBroken] = useState(false);
  const [first, second = ""] = project.headline ?? [project.title];
  const tags = project.tags ?? project.stack.slice(0, 4);

  return (
    <article ref={ref} className={cn("wk-article", details && "on")}>
      <div className="wk-pin">
        <div className="wk-cover">
          {!broken ? (
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              onError={() => setBroken(true)}
            />
          ) : (
            <div className="wk-cover-fallback" />
          )}
          <span className="wk-shade" aria-hidden="true" />
        </div>

        <header className="wk-meta">
          <span className="wk-num">
            {project.index}
            <span className="wk-num-total"> / {String(total).padStart(2, "0")}</span>
          </span>
          <span className="wk-kicker">{project.tag}</span>
        </header>

        <h3 className="wk-headline" aria-label={project.title}>
          <span className="wk-hl wk-hl-a" aria-hidden="true">
            {first}
          </span>
          {second && (
            <span className="wk-hl wk-hl-b" aria-hidden="true">
              {second}
            </span>
          )}
        </h3>

        <div className="wk-body">
          <SplitText
            as="p"
            text={project.tagline}
            className="wk-lede"
            stagger={0.03}
            duration={0.8}
            active={details}
          />
          <div className="wk-foot">
            <ul className="wk-tags">
              {tags.map((tag, i) => (
                <li key={tag} className="wk-tag" style={{ transitionDelay: `${0.25 + i * 0.06}s` }}>
                  {tag}
                </li>
              ))}
            </ul>
            {project.href && (
              <a
                className="wk-cta"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="wk-cta-label">View project</span>
                <span className="wk-cta-box">
                  <ArrowIcon />
                </span>
              </a>
            )}
          </div>
        </div>

        <span className="wk-veil" aria-hidden="true" />
      </div>
    </article>
  );
}

export default function Projects() {
  const github = SOCIAL_LINKS.find((link) => link.label === "GitHub")?.href ?? "#";

  return (
    <section id="projects" className="wk">
      <div className="wk-head">
        <div className="wk-head-row">
          <span className="wk-label">( Work )</span>
          <span className="wk-label">Index — {String(PROJECTS.length).padStart(2, "0")} projects</span>
        </div>
        <SplitText
          as="h2"
          text={["Selected", "projects"]}
          className="wk-title"
          stagger={0.08}
          duration={1.1}
          rotate={4}
        />
        <div className="wk-head-row wk-head-foot">
          <span className="wk-label">Scroll to read</span>
          <LineLink href={github} target="_blank" rel="noopener noreferrer">
            view all works
          </LineLink>
        </div>
      </div>

      {PROJECTS.map((project) => (
        <Article key={project.slug} project={project} total={PROJECTS.length} />
      ))}
    </section>
  );
}
