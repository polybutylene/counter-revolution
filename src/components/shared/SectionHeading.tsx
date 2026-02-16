import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
          {label}
        </p>
      )}
      <h2 className="mt-2 font-heading text-3xl font-bold text-navy sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
