import { cn } from "@/lib/utils";
import type { EdgeProfile } from "@/types/estimator";

interface StepEdgeProfileProps {
  value: EdgeProfile | "";
  onChange: (value: EdgeProfile) => void;
}

const OPTIONS: { value: EdgeProfile; label: string; adder: string; description: string }[] = [
  { value: "straight", label: "Straight / Eased", adder: "Included", description: "Clean, modern look with a slightly eased top edge." },
  { value: "beveled", label: "Beveled", adder: "+$5/LF", description: "Angled cut for a subtle transitional look." },
  { value: "bullnose", label: "Bullnose", adder: "+$8/LF", description: "Fully rounded edge for a soft, classic feel." },
  { value: "ogee", label: "Ogee", adder: "+$12/LF", description: "Elegant S-curve profile for a traditional or formal look." },
  { value: "waterfall", label: "Waterfall", adder: "+$15/LF", description: "Stone flows down the side of the cabinet for a dramatic modern statement." },
  { value: "not-sure", label: "Not Sure / Show Me", adder: "No charge", description: "We'll show you all options during your showroom visit." },
];

export function StepEdgeProfile({ value, onChange }: StepEdgeProfileProps) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy">
        Choose your edge profile
      </h2>
      <p className="mt-2 text-muted-foreground">
        The edge profile affects both look and cost. &quot;Not Sure&quot; is always a valid choice.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all",
              value === option.value
                ? "border-gold bg-gold/5"
                : "border-warm-medium bg-white hover:border-gold/50"
            )}
          >
            {/* Simple edge profile visual */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-warm-light">
              <div className={cn(
                "h-6 w-6 border-2 border-navy/30",
                option.value === "straight" && "rounded-sm",
                option.value === "beveled" && "rounded-sm [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]",
                option.value === "bullnose" && "rounded-full",
                option.value === "ogee" && "rounded-tl-full rounded-br-full",
                option.value === "waterfall" && "rounded-b-full",
                option.value === "not-sure" && "rounded-lg border-dashed"
              )} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-semibold text-navy">{option.label}</span>
                <span className="text-xs font-semibold text-gold">{option.adder}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
