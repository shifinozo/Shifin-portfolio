import { TbBrandGithub, TbBrandLinkedin, TbMail } from "react-icons/tb";
import BracketLink from "@/components/ui/BracketLink";
import LineLink from "@/components/animations/LineLink";
import Reveal from "@/components/animations/Reveal";
import { SOCIAL_LINKS } from "@/data/socialLinks";

const NAV = [
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const EMAIL = "shifinshifu246@gmail.com";

const ICONS = {
  LinkedIn: TbBrandLinkedin,
  GitHub: TbBrandGithub,
  Email: TbMail,
};

/** Square tile with layered clip-path fills and an icon that swaps upward on hover. */
function SocialTile({ href, label, Icon, external = true }) {
  return (
    <a
      href={href}
      className="soc"
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span className="soc-bg soc-bg-1" />
      <span className="soc-bg soc-bg-2" />
      <span className="soc-bg soc-bg-3" />
      <span className="soc-icons">
        <span className="soc-ic">
          <Icon />
        </span>
        <span className="soc-ic" aria-hidden="true">
          <Icon />
        </span>
      </span>
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="ft-grid">
        <div className="ft-col ft-menu">
          <h5>Menu/</h5>
          <div className="ft-links">
            {NAV.map((link) => (
              <BracketLink key={link.href} href={link.href}>
                {link.label}
              </BracketLink>
            ))}
          </div>
        </div>

        <nav className="ft-mobile-menu" aria-label="Footer">
          {NAV.map((link) => (
            <a key={link.href} href={link.href} className="ft-mlink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ft-col ft-hq">
          <div>
            <h5>Based in/</h5>
            <p>Malappuram, Kerala</p>
            <p>India</p>
          </div>
        </div>

        <div className="ft-col ft-reach">
          <h5>Get in touch/</h5>
          <div className="ft-reach-row">
            <a className="ft-input" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <SocialTile href={`mailto:${EMAIL}`} label="Email" Icon={TbMail} external={false} />
          </div>
          <p>Open to full-stack developer opportunities and collaborations.</p>
        </div>

        <div className="ft-col ft-social">
          <h5>socials/</h5>
          <div className="ft-socials">
            {SOCIAL_LINKS.filter((l) => l.label !== "Email").map((link) => (
              <SocialTile key={link.label} href={link.href} label={link.label} Icon={ICONS[link.label] ?? TbMail} />
            ))}
          </div>
        </div>
      </div>

      <Reveal className="reveal-strip ft-strip">
        <span className="ft-mark">Muhammed Shifin</span>
      </Reveal>

      <div className="ft-bottom">
        <div className="ft-bottom-links">
          <LineLink href="/resume/resume.pdf" download dim reveal={false} className="ft-ll">
            Resume
          </LineLink>
          <LineLink href="#home" dim reveal={false} className="ft-ll">
            Back to top
          </LineLink>
        </div>
        <p>© {year} Muhammed Shifin. All rights reserved.</p>
      </div>
    </footer>
  );
}
