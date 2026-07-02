"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/animations/Reveal";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  const scrollSpaceRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    function handleScroll() {
      const node = scrollSpaceRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 0;
      const clamped = Math.min(Math.max(raw, 0), 1);

      const scaled = clamped * PROJECTS.length;
      const idx = Math.min(PROJECTS.length - 1, Math.floor(scaled));
      setActiveIndex(idx);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="projects" id="projects">
      <div
        className="projects-scroll-space"
        ref={scrollSpaceRef}
        style={{ height: `${PROJECTS.length * 100}vh` }}
      >
        <div className="projects-sticky">
          <Container>
            <div className="projects-head-row">
              <div>
                <SectionTitle eyebrow="Selected Work" title="Projects" />
              </div>
              <Reveal as="p" className="projects-intro">
                A closer look at full-stack applications I&apos;ve designed,
                built, and shipped — from production dashboards to real-time
                social platforms.
              </Reveal>
            </div>

            <div className="projects-showcase">
              <div className="projects-visual">
                {PROJECTS.map((project, i) => (
                  <div
                    key={project.slug}
                    className={`project-visual-frame ${i === activeIndex ? "active" : ""}`}
                  >
                    {!imgErrors[i] ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 860px) 100vw, 440px"
                        style={{ objectFit: "cover" }}
                        priority={i === 0}
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [i]: true }))
                        }
                      />
                    ) : (
                      <div className="project-visual-placeholder">
                        <span>{project.index}</span>
                        <p>{project.slug}.jpg</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="projects-card-stack">
                {PROJECTS.map((project, i) => (
                  <div
                    key={project.title}
                    className={`project-stack-card ${i === activeIndex ? "active" : ""}`}
                    style={{ zIndex: i === activeIndex ? 10 : PROJECTS.length - i }}
                  >
                    <div className="project-stack-top">
                      <span className="project-stack-index">{project.index}</span>
                      <span className="project-stack-arrow">↗</span>
                    </div>

                    <div>
                      <h3 className="project-stack-title">{project.title}</h3>
                      <div className="project-stack-body">
                        <div className="project-tag">{project.tag}</div>
                        <p>{project.desc}</p>
                        <ul className="project-stack">
                          {project.stack.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
