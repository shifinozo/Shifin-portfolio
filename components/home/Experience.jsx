import Reveal from "@/components/animations/Reveal";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { EXPERIENCE } from "@/data/experience";

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <Container>
        <div className="section-head">
          <SectionTitle eyebrow="Career" title="Experience" />
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
      </Container>
    </section>
  );
}
