import { ChefHat, Bath, Sun, Building2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectType } from "@/types/estimator";

interface StepProjectTypeProps {
  value: ProjectType | "";
  onChange: (value: ProjectType) => void;
}

const OPTIONS: { value: ProjectType; label: string; icon: React.ReactNode; description: string }[] = [
  { value: "kitchen", label: "Kitchen", icon: <ChefHat className="h-8 w-8" />, description: "Countertops, islands, prep areas" },
  { value: "bathroom", label: "Bathroom", icon: <Bath className="h-8 w-8" />, description: "Vanity tops, tub surrounds" },
  { value: "outdoor", label: "Outdoor Kitchen", icon: <Sun className="h-8 w-8" />, description: "Grill stations, outdoor bars" },
  { value: "commercial", label: "Commercial", icon: <Building2 className="h-8 w-8" />, description: "Offices, restaurants, retail" },
  { value: "other", label: "Other", icon: <HelpCircle className="h-8 w-8" />, description: "Laundry, fireplace, custom" },
];

export function StepProjectType({ value, onChange }: StepProjectTypeProps) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy">
        What type of project is this?
      </h2>
      <p className="mt-2 text-muted-foreground">Select the area you want new countertops for.</p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border-2 p-6 text-center transition-all",
              value === option.value
                ? "border-gold bg-gold/5 text-navy"
                : "border-warm-medium bg-white text-dark hover:border-gold/50"
            )}
          >
            <div className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl",
              value === option.value ? "bg-gold/10 text-gold" : "bg-warm-light text-navy"
            )}>
              {option.icon}
            </div>
            <span className="font-heading text-base font-semibold">{option.label}</span>
            <span className="text-xs text-muted-foreground">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
