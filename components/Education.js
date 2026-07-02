import Reveal from "./Reveal";

const EDUCATION = [
  {
    date: "2022 — 2025",
    title: "Bachelor of Computer Applications (BCA)",
    org: "Nasra College of Arts and Science",
  },
  {
    date: "Jun 2025 — Oct 2025",
    title: "MERN Stack Developer Training",
    org: "Haris and Co Academy, Calicut, Kerala",
  },
];

export default function Education() {
  return (
    <section className="education" id="education">
      <div className="container">
        <div className="section-head">
          <Reveal className="section-tag">Background</Reveal>
          <Reveal as="h2" className="section-title">
            Education
          </Reveal>
        </div>
        <div className="edu-grid">
          {EDUCATION.map((edu) => (
            <Reveal as="div" className="edu-card" key={edu.title}>
              <span className="timeline-date">{edu.date}</span>
              <h3>{edu.title}</h3>
              <span className="timeline-org">{edu.org}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
