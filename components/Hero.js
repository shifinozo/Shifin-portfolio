import fs from "fs";
import path from "path";
import Image from "next/image";
import Reveal from "./Reveal";

function getProfileImage() {
  const filePath = path.join(process.cwd(), "public", "profile.jpg");
  return fs.existsSync(filePath) ? "/profile.jpg" : null;
}

export default function Hero() {
  const profileSrc = getProfileImage();

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <Reveal as="div" className="hero-image">
          {profileSrc ? (
            <Image
              src={profileSrc}
              alt="Muhammed Shifin"
              width={520}
              height={640}
              priority
            />
          ) : (
            <div className="hero-image-placeholder">
              <span>MS</span>
              <p>Add public/profile.jpg</p>
            </div>
          )}
        </Reveal>

        <div className="hero-text">
          <Reveal as="p" className="eyebrow">
            Malappuram, Kerala, India
          </Reveal>
          <Reveal as="h1" className="hero-title">
            Building Full-Stack
            <br />
            Products That <span className="gradient-text">Matter</span>.
          </Reveal>
          <Reveal as="p" className="hero-sub">
            MERN Stack Developer crafting scalable web applications with
            MongoDB, Express, React &amp; Node.js — from secure APIs to
            real-time, production-ready interfaces.
          </Reveal>
          <Reveal className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Get In Touch
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
