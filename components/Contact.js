import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <Reveal className="container contact-inner">
        <div className="section-tag">Get In Touch</div>
        <h2 className="section-title">Let&apos;s Build Something Great</h2>
        <p className="contact-sub">
          Open to full-stack developer opportunities and collaborations. Feel
          free to reach out — I usually reply within a day.
        </p>
        <div className="contact-links">
          <a href="mailto:shifinshifu246@gmail.com" className="btn btn-primary">
            shifinshifu246@gmail.com
          </a>
          <a href="tel:+916282799461" className="btn btn-outline">
            +91 62827 99461
          </a>
        </div>
        <div className="social-links">
          <a href="#" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
