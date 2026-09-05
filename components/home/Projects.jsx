"use client";

import { useState } from "react";
import PixelHeading from "@/components/animations/PixelHeading";
import SplitText from "@/components/animations/SplitText";
import LineLink from "@/components/animations/LineLink";
import CursorFollower from "@/components/animations/CursorFollower";
import { useInView } from "@/hooks/useInView";
import { PROJECTS } from "@/data/projects";
import { SOCIAL_LINKS } from "@/data/socialLinks";
import { cn } from "@/lib/utils";

// Row layouts cycle through the reference grid: [7 | 4 bottom-aligned], [10 centred], [4 top | 7].
const ROW_LAYOUTS = [
  ["pj-c7", "pj-c4-end pj-bottom"],
  ["pj-c10"],
  ["pj-c4", "pj-c7-end"],
];

const VIEW_LABEL = "View Project";

function buildRows(projects) {
  const rows = [];
  let i = 0;
  let r = 0;
  while (i < projects.length) {
    let layout = ROW_LAYOUTS[r % ROW_LAYOUTS.length];
    const remaining = projects.length - i;
    // A row that would take more cards than are left leaves a lone card in a
    // narrow slot; give a trailing single card the wide centred treatment.
    if (remaining < layout.length) layout = ["pj-c10"];
    rows.push(
      projects.slice(i, i + layout.length).map((project, k) => ({ project, cls: layout[k] }))
    );
    i += layout.length;
    r += 1;
  }
  return rows;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1 5h8M5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ProjectCard({ project, cls, onHover }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [broken, setBroken] = useState(false);

  const tags = project.tags ?? project.stack.slice(0, 4);
  const external = Boolean(project.href);

  return (
    <a
      ref={ref}
      href={project.href || "#projects"}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn("pj-card", cls, inView && "on")}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="pj-media">
        <div className="pj-media-inner">
          {!broken ? (
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              onError={() => setBroken(true)}
            />
          ) : (
            <div className="pj-media-fallback">
              <span>{project.index}</span>
            </div>
          )}
        </div>
        <div className="pj-tags">
          {tags.map((tag, i) => (
            <span key={tag} className="pj-tag" style={{ transitionDelay: `${0.2 + i * 0.07}s` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pj-info">
        <span className="pj-pointer" aria-hidden="true" />
        <div className="pj-text">
          <SplitText as="h3" text={project.title} className="pj-title" stagger={0.06} />
          <SplitText
            as="p"
            text={project.tagline}
            className="pj-desc"
            stagger={0.015}
            duration={0.7}
          />
        </div>
        <span className="pj-view" aria-hidden="true">
          <span className="pj-view-box">
            <ArrowIcon />
          </span>
          <span className="pj-view-letters">
            {VIEW_LABEL.split("").map((ch, i) => (
              <span key={i} className="pj-view-lw">
                <span className="pj-view-l" style={{ transitionDelay: `${i * 0.025}s` }}>
                  {ch === " " ? " " : ch}
                </span>
              </span>
            ))}
          </span>
        </span>
      </div>
    </a>
  );
}

export default function Projects() {
  const [hover, setHover] = useState(false);
  const github = SOCIAL_LINKS.find((link) => link.label === "GitHub")?.href ?? "#";
  const rows = buildRows(PROJECTS);

  return (
    <section id="projects" className="pj">
      <div className="pj-head">
        <PixelHeading text="Selected projects" />
        <LineLink href={github} target="_blank" rel="noopener noreferrer">
          view all works
        </LineLink>
      </div>

      <div className="pj-rows">
        {rows.map((row, ri) => (
          <div key={ri} className="pj-grid">
            {row.map(({ project, cls }) => (
              <ProjectCard key={project.slug} project={project} cls={cls} onHover={setHover} />
            ))}
          </div>
        ))}
      </div>

      <CursorFollower active={hover}>
        <span className="cf-inner pj-cf">
          <span className="pj-cf-box">
            <ArrowIcon />
          </span>
          <span className="pj-cf-label">View</span>
        </span>
      </CursorFollower>
    </section>
  );
}
