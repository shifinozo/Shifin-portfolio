"use client";

import { useRef, useState } from "react";
import PixelHeading from "@/components/animations/PixelHeading";
import { useInView } from "@/hooks/useInView";
import { SKILLS } from "@/data/skills";
import { cn } from "@/lib/utils";

/** Numbered list (reference "Where We Contribute") with a cursor-following preview on hover. */
export default function Skills() {
  const [active, setActive] = useState(null);
  const previewRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.15 });

  const onMove = (e) => {
    const preview = previewRef.current;
    const section = ref.current;
    if (!preview || !section) return;
    const rect = section.getBoundingClientRect();
    preview.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0) translate(-50%, -50%)`;
  };

  const current = active !== null ? SKILLS[active] : null;

  return (
    <section id="skills" className="ct" ref={ref} onMouseMove={onMove}>
      <PixelHeading text={"What I\nWork With"} />

      <div className="ct-list">
        {SKILLS.map((skill, i) => (
          <div
            key={skill.slug}
            className={cn("ct-item", inView && "on", active === i && "active")}
            style={{ "--d": `${0.1 + i * 0.1}s` }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="ct-row">
              <h4 className="ct-label">
                <span className="ct-label-i">{skill.title}</span>
              </h4>
              <p className="ct-num">{String(i + 1).padStart(2, "0")}</p>
            </div>
            <p className="ct-inline">{skill.desc}</p>
            <div className="ct-divider" />
          </div>
        ))}
      </div>

      <div ref={previewRef} className={cn("ct-preview", current && "on")} aria-hidden="true">
        {current && (
          <>
            {current.image && (
              <img
                key={current.slug}
                src={current.image}
                alt=""
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <p>{current.desc}</p>
          </>
        )}
      </div>
    </section>
  );
}
