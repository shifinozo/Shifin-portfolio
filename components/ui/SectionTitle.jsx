import Reveal from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

export default function SectionTitle({ eyebrow, title, className = "" }) {
  return (
    <>
      <Reveal className="section-tag">{eyebrow}</Reveal>
      <Reveal as="h2" className={cn("section-title", className)}>
        {title}
      </Reveal>
    </>
  );
}
