"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const scrolled = useScroll(20);
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("navbar", scrolled && "scrolled")}>
      <Container className="nav-inner">
        <a href="#home" className="logo">
          MS<span className="logo-dot">.</span>
        </a>

        <nav className={cn("nav-links", open && "open")}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="#contact" variant="primary" className="nav-cta">
          Let&apos;s Talk
        </Button>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </Container>
    </header>
  );
}
