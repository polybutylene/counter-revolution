import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ["Project", "Details", "Material", "Edge", "Contact", "Estimate"];

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                i + 1 < currentStep && "bg-success text-white",
                i + 1 === currentStep && "bg-gold text-navy",
                i + 1 > currentStep && "bg-warm-medium text-muted-foreground"
              )}
            >
              {i + 1 < currentStep ? "✓" : i + 1}
            </div>
            <span
              className={cn(
                "mt-1 hidden text-xs sm:block",
                i + 1 <= currentStep ? "font-semibold text-navy" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-warm-medium">
        <div
          className="h-full rounded-full bg-gold transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
