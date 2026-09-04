"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/**
 * Mono text link with a hairline underneath (reference "see-all" links).
 * Reveals with a blur/rotate when in view; `dim` variant draws the line on hover only.
 */
export default function LineLink({
  href,
  children,
  className = "",
  reveal = true,
  dim = false,
  delay = 0,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold: 0.5 });

  return (
    <a
      ref={ref}
      href={href}
      className={cn("ll", reveal && "ll-reveal", (!reveal || inView) && "on", dim && "ll-dim", className)}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      <span className="ll-row">
        <span className="ll-txt">{children}</span>
      </span>
      <span className="ll-line" aria-hidden="true" />
    </a>
  );
}
