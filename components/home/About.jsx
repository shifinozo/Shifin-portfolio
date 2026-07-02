import Reveal from "@/components/animations/Reveal";
import Container from "@/components/ui/Container";

export default function About() {
  return (
    <section className="about" id="about">
      <Container className="about-inner">
        <Reveal className="section-tag">About Me</Reveal>
        <Reveal as="p" className="about-text">
          I&apos;m a MERN Stack Developer with hands-on experience designing and
          building scalable full-stack web applications using MongoDB,
          Express.js, React, and Node.js. Strong in developing RESTful APIs,
          responsive user interfaces, and real-time features using Socket.io.
          Experienced in implementing secure authentication, cloud-based media
          handling, and modern UI/UX practices — with a proven ability to
          contribute to production-level applications through internships and
          personal projects.
        </Reveal>
      </Container>
    </section>
  );
}
