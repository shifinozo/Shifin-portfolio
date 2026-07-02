import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  primary: "btn btn-primary",
  outline: "btn btn-outline",
  unstyled: "",
};

export default function Button({
  href,
  download,
  variant = "primary",
  className = "",
  children,
  ...rest
}) {
  return (
    <a
      href={href}
      download={download}
      className={cn(VARIANT_CLASSES[variant], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
