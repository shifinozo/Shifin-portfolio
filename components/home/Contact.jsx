"use client";

import { useRef, useState } from "react";
import CharReveal from "@/components/animations/CharReveal";
import { useInView } from "@/hooks/useInView";
import { CONTACT_CARDS, CONTACT_STATEMENT } from "@/data/contact";
import { cn } from "@/lib/utils";

function Words({ text, delay = 0 }) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="w">
      <span className="wi" style={{ transitionDelay: `${delay + i * 0.03}s` }}>
        {word}
      </span>
    </span>
  ));
}

/** Statement + expanding media cards (reference journal section). */
export default function Contact() {
  const [hovered, setHovered] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.15 });
  const videos = useRef([]);

  const enter = (i) => {
    setHovered(i);
    videos.current[i]?.play?.().catch(() => {});
  };
  const leave = (i) => {
    setHovered(null);
    const video = videos.current[i];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section id="contact" className={cn("jn", hovered !== null && "jn-tinted")}>
      <CharReveal text={CONTACT_STATEMENT} />

      <div className="jn-cards" ref={ref}>
        {CONTACT_CARDS.map((card, i) => (
          <a
            key={card.title}
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            className={cn("jn-card", inView && "on", hovered === i && "hover")}
            style={{ "--d": `${i * 0.08}s` }}
            onMouseEnter={() => enter(i)}
            onMouseLeave={() => leave(i)}
            onFocus={() => enter(i)}
            onBlur={() => leave(i)}
          >
            <span className="jn-tag">{card.tag}</span>

            <div className="jn-media">
              {card.image && (
                <img
                  src={card.image}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.remove();
                  }}
                />
              )}
              {card.video && (
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  src={card.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <div className="jn-tint" />
              <div className="jn-shade" />
            </div>

            <div className="jn-content">
              <h4 className="jn-title">
                <Words text={card.title} delay={i * 0.08} />
              </h4>
              <p className="jn-desc">
                <Words text={card.desc} delay={i * 0.08 + 0.1} />
              </p>
              <div className="jn-more">
                <span>{card.cta}</span>
                <span className="jn-more-line" />
              </div>
              <span className="jn-baseline" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
