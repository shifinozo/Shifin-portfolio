"use client";

import { useEffect, useState } from "react";
import BracketLink from "@/components/ui/BracketLink";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="nv">
        <a href="#home" className="nv-logo" onClick={() => setOpen(false)}>
          MS<span>.</span>
        </a>

        <nav className="nv-links" aria-label="Primary">
          {LINKS.map((link) => (
            <BracketLink key={link.href} href={link.href}>
              {link.label}
            </BracketLink>
          ))}
        </nav>

        <BracketLink
          as="button"
          type="button"
          className="nv-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Close" : "Menu"}
        </BracketLink>
      </header>

      <div id="site-menu" className={cn("nv-overlay", open && "open")} aria-hidden={!open}>
        <div className="nv-overlay-inner">
          <div className="nv-image">
            <img src="/images/ozo_photo-removebg-preview.png" alt="Muhammed Shifin" draggable={false} />
          </div>

          <nav className="nv-big" aria-label="Menu">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${0.25 + i * 0.06}s` : "0s" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nv-overlay-foot">
            <a href="mailto:shifinshifu246@gmail.com">shifinshifu246@gmail.com</a>
            <span>Malappuram, Kerala, India</span>
          </div>
        </div>
      </div>
    </>
  );
}
