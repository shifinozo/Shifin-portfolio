import Reveal from "./Reveal";

const SKILLS = [
  {
    icon: "</>",
    title: "Programming",
    desc: "JavaScript, HTML, CSS",
  },
  {
    icon: "◧",
    title: "Frontend",
    desc: "React (Vite), Next.js, Context API, Tailwind CSS, Axios",
  },
  {
    icon: "⌘",
    title: "Backend",
    desc: "Node.js, Express.js, REST API Development",
  },
  {
    icon: "☁",
    title: "Database & Cloud",
    desc: "MongoDB, Cloudinary",
  },
  {
    icon: "⚙",
    title: "Tools",
    desc: "Socket.io, Nodemailer, JWT Authentication, Git",
  },
  {
    icon: "✦",
    title: "Soft Skills",
    desc: "Problem Solving, Communication, Team Collaboration, Adaptability",
  },
];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="section-head">
          <Reveal className="section-tag">What I Work With</Reveal>
          <Reveal as="h2" className="section-title">
            Technical Skills
          </Reveal>
        </div>
        <div className="skills-grid">
          {SKILLS.map((skill) => (
            <Reveal as="div" className="skill-card" key={skill.title}>
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
