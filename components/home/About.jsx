import PixelHeading from "@/components/animations/PixelHeading";
import SplitText from "@/components/animations/SplitText";
import LineLink from "@/components/animations/LineLink";
import TechMarquee from "@/components/animations/TechMarquee";

const STATEMENT = "Building scalable, user-focused web applications with the MERN stack.";

const SUMMARY =
  "I'm a MERN Stack Developer with hands-on experience in designing and building scalable full-stack web applications using MongoDB, Express.js, React, and Node.js. Strong in developing RESTful APIs, responsive user interfaces, and real-time features using Socket.io. Experienced in implementing secure authentication, cloud-based media handling, and modern UI/UX practices — with a proven ability to contribute to production-level applications through internships and projects. A quick learner with strong problem-solving skills, eager to build impactful and user-focused digital products.";

export default function About() {
  return (
    <section id="about" className="ab">
      <div className="ab-statement">
        <PixelHeading text={STATEMENT} />
      </div>

      <div className="ab-row">
        <SplitText as="p" text={SUMMARY} className="ab-para" stagger={0.006} duration={0.8} />
        <LineLink href="#contact">LET&apos;S TALK</LineLink>
      </div>

      <TechMarquee />
    </section>
  );
}
