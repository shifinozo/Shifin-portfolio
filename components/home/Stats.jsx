import Reveal from "@/components/animations/Reveal";
import StatCounter from "@/components/animations/StatCounter";
import Container from "@/components/ui/Container";

const STATS = [
  { target: 3, suffix: "+", label: "Full-Stack Projects" },
  { target: 1, suffix: "", label: "Production Application Shipped" },
  { target: 10, suffix: "+", label: "Technologies & Tools" },
  { target: 100, suffix: "%", label: "Committed to Clean Code" },
];

export default function Stats() {
  return (
    <section className="stats">
      <Container className="stats-grid">
        {STATS.map((stat) => (
          <Reveal as="div" className="stat-card" key={stat.label}>
            <StatCounter target={stat.target} suffix={stat.suffix} />
            <span className="stat-label">{stat.label}</span>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
