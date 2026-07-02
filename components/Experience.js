import Reveal from "./Reveal";

const EXPERIENCE = [
  {
    date: "Aug 2025 — Present",
    title: "Full Stack Developer Intern",
    org: "Haris & Co, Calicut, Kerala",
    desc: "Collaborated in building and maintaining full-stack web applications in a production environment. Designed and developed scalable RESTful APIs using Node.js and Express.js to support dynamic frontend features. Built responsive, user-friendly interfaces using React, Next.js, and Tailwind CSS. Implemented secure authentication and authorization using JWT and encrypted password handling. Integrated Cloudinary for media storage and Nodemailer for automated email workflows. Debugged and optimized application performance, improving reliability while working closely with the team to ship new features.",
  },
  {
    date: "Jun 2025 — Oct 2025",
    title: "MERN Stack Developer Training",
    org: "Haris and Co Academy, Calicut, Kerala",
    desc: "Intensive, hands-on training covering the full MERN stack — building production-style applications end to end.",
  },
];

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="section-head">
          <Reveal className="section-tag">Career</Reveal>
          <Reveal as="h2" className="section-title">
            Experience
          </Reveal>
        </div>
        <div className="timeline">
          {EXPERIENCE.map((item) => (
            <Reveal as="div" className="timeline-item" key={item.title}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">{item.date}</span>
                <h3>{item.title}</h3>
                <span className="timeline-org">{item.org}</span>
                <p>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
