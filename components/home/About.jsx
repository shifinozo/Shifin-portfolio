import PixelHeading from "@/components/animations/PixelHeading";
import SplitText from "@/components/animations/SplitText";
import LineLink from "@/components/animations/LineLink";
import TechMarquee from "@/components/animations/TechMarquee";

const STATEMENT = "Building scalable, user-focused web applications end to end.";

const SUMMARY =
  "I'm a Full Stack Developer with hands-on experience in building scalable full-stack web applications using MongoDB, Express.js, React, Next.js, and Node.js. Strong in developing RESTful APIs, responsive user interfaces, and dynamic web applications using modern frontend technologies. Experienced in implementing secure authentication, cloud-based media handling, and modern UI/UX practices. Skilled in leveraging AI-powered development tools such as Claude and Cursor to improve development workflows, solve complex problems, optimize code, and accelerate feature development. A quick learner with strong problem-solving skills, eager to build impactful, scalable, and user-focused digital products.";

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
