"use client";

import { useEffect, useRef, useState } from "react";
import PixelHeading from "@/components/animations/PixelHeading";
import LineLink from "@/components/animations/LineLink";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { EXPERIENCE } from "@/data/experience";
import { EDUCATION } from "@/data/education";
import { cn } from "@/lib/utils";

const CARDS = [
  ...EXPERIENCE.map((item) => ({ ...item, kind: "Experience" })),
  ...EDUCATION.map((item) => ({ ...item, kind: "Education" })),
];

const TICKS = 64;
const LONG_TEXT = 220;

function initials(name) {
  return name
    .split(/[\s,]+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !/^(and|of|&)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Pinned card carousel (reference testimonials) — scroll progress drives the horizontal travel. */
export default function Experience() {
  const { ref, progress } = useScrollProgress({ mode: "sticky", smooth: 0.12 });
  const trackRef = useRef(null);
  const [shift, setShift] = useState(0);
  const [broken, setBroken] = useState({});

  useEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      if (!track) return;
      // How far the track must travel for its last card to reach the viewport's
      // right edge. scrollWidth already includes the track's own left padding.
      const visible = track.parentElement?.clientWidth ?? window.innerWidth;
      setShift(Math.max(0, track.scrollWidth - visible));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <div className="tm-spacer" ref={ref}>
      <div className="tm-sticky">
        <section id="experience" className="tm">
          <div className="tm-head">
            <PixelHeading text={"Experience &\nEducation"} />
            <LineLink href="/resume/resume.pdf" download>
              download resume
            </LineLink>
          </div>

          <div className="tm-ruler" aria-hidden="true">
            <div className="tm-ticks">
              {Array.from({ length: TICKS }, (_, i) => (
                <span key={i} className={cn("tm-tick", i / TICKS <= progress && "on")} />
              ))}
            </div>
          </div>

          <div className="tm-carousel">
            <div
              className="tm-track"
              ref={trackRef}
              style={{ transform: `translate3d(${(-progress * shift).toFixed(1)}px, 0, 0)` }}
            >
              {CARDS.map((card, i) => (
                <article key={card.title} className="tm-card">
                  <div className="tm-card-top">
                    <div className="tm-logo">
                      {card.logo && !broken[i] ? (
                        <img
                          src={card.logo}
                          alt=""
                          onError={() => setBroken((prev) => ({ ...prev, [i]: true }))}
                        />
                      ) : (
                        <span>{initials(card.org)}</span>
                      )}
                    </div>
                    <div>
                      <h4>{card.org}</h4>
                      <p>{card.date}</p>
                    </div>
                  </div>

                  <div className="tm-body-wrap">
                    <p
                      className={cn(
                        "tm-body",
                        (card.desc?.length ?? 0) > LONG_TEXT && "tm-body-long"
                      )}
                    >
                      <strong>{card.title}</strong>
                      {card.desc ? ` — ${card.desc}` : ""}
                    </p>
                  </div>

                  <div className="tm-card-bottom">
                    <span>{card.kind}</span>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
