import Reveal from "@/components/animations/Reveal";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/images/hero/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 w-full px-[clamp(1.5rem,6vw,6rem)] py-[clamp(4rem,12vw,8rem)]">
        <div className="max-w-xl">
          <Reveal
            as="h1"
            className="text-[clamp(2.1rem,6vw,3.75rem)] font-bold leading-[1.05] text-white"
            style={{ fontFamily: "var(--font-display), var(--font-display-fallback)" }}
          >
            Muhammed Shifin
          </Reveal>
          <Reveal
            as="h2"
            className="mt-[clamp(0.4rem,1vw,0.75rem)] text-[clamp(1.35rem,3.4vw,2.25rem)] font-semibold"
            style={{
              background: "var(--gradient)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Full Stack Developer
          </Reveal>
          <Reveal as="p" className="mt-[clamp(1rem,2.5vw,1.5rem)] max-w-lg text-[clamp(0.95rem,1.6vw,1.125rem)] text-white/80">
            I specialize in building fast, scalable web applications using
            MongoDB, Express.js, React, Next.js, and Node.js
          </Reveal>
          <Reveal className="mt-[clamp(1.5rem,3.5vw,2.5rem)] flex flex-wrap gap-[clamp(0.75rem,1.5vw,1rem)]">
            <Button
              href="#projects"
              variant="unstyled"
              className="rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white no-underline transition hover:opacity-90"
            >
              View My Work
            </Button>
            <Button
              href="#contact"
              variant="unstyled"
              className="rounded-full border border-white/30 px-6 py-3 font-medium text-white no-underline transition hover:bg-white/10"
            >
              Contact Me
            </Button>
            <Button
              href="/resume/resume.pdf"
              download
              variant="unstyled"
              className="rounded-full border border-white/30 px-6 py-3 font-medium text-white no-underline transition hover:bg-white/10"
            >
              Download Resume
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
