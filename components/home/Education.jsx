import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { EDUCATION } from "@/data/education";

export default function Education() {
  return (
    <section className="education" id="education">
      <Container>
        <div className="section-head">
          <SectionTitle eyebrow="Background" title="Education" />
        </div>
        <div className="edu-grid">
          {EDUCATION.map((edu) => (
            <Card className="edu-card" key={edu.title}>
              <span className="timeline-date">{edu.date}</span>
              <h3>{edu.title}</h3>
              <span className="timeline-org">{edu.org}</span>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
