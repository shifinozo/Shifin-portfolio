import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { SKILLS } from "@/data/skills";

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <Container>
        <div className="section-head">
          <SectionTitle eyebrow="What I Work With" title="Technical Skills" />
        </div>
        <div className="skills-grid">
          {SKILLS.map((skill) => (
            <Card className="skill-card" key={skill.title}>
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
