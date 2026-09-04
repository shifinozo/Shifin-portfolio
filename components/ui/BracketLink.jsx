import { cn } from "@/lib/utils";

/** "[ Label ]" mono link whose label swaps vertically on hover (reference nav/footer links). */
export default function BracketLink({ href, children, className = "", as: Tag = "a", ...rest }) {
  return (
    <Tag href={href} className={cn("bl", className)} {...rest}>
      <span>[</span>
      <span className="bl-swap">
        <span className="bl-a">{children}</span>
        <span className="bl-b" aria-hidden="true">
          {children}
        </span>
      </span>
      <span>]</span>
    </Tag>
  );
}
