import Reveal from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

export default function Card({ className = "", children, ...rest }) {
  return (
    <Reveal as="div" className={cn("card", className)} {...rest}>
      {children}
    </Reveal>
  );
}
