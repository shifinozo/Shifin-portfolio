import Reveal from "@/components/animations/Reveal";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { SOCIAL_LINKS } from "@/data/socialLinks";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <Container>
        <Reveal className="contact-inner">
          <SectionTitle eyebrow="Get In Touch" title="Let&apos;s Build Something Great" />
          <p className="contact-sub">
            Open to full-stack developer opportunities and collaborations. Feel
            free to reach out — I usually reply within a day.
          </p>
          <div className="contact-links">
            <Button href="mailto:shifinshifu246@gmail.com" variant="primary">
              shifinshifu246@gmail.com
            </Button>
            <Button href="tel:+916282799461" variant="outline">
              +91 62827 99461
            </Button>
          </div>
          <div className="social-links">
            {SOCIAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
