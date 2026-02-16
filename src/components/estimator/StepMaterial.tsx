import { cn } from "@/lib/utils";
import type { MaterialPreference } from "@/types/estimator";

interface StepMaterialProps {
  value: MaterialPreference | "";
  onChange: (value: MaterialPreference) => void;
}

const OPTIONS: { value: MaterialPreference; label: string; priceRange: string; description: string; gradient: string }[] = [
  { value: "granite", label: "Granite", priceRange: "$40–$80/LF", description: "Natural stone. Unique patterns. Extremely durable and heat-resistant.", gradient: "from-amber-800/20 to-stone-600/20" },
  { value: "quartz", label: "Quartz", priceRange: "$50–$100/LF", description: "Engineered stone. Consistent patterns. Zero maintenance, no sealing.", gradient: "from-gray-400/20 to-slate-300/20" },
  { value: "marble", label: "Marble", priceRange: "$60–$120/LF", description: "Timeless elegance. Distinctive veining. The luxury choice.", gradient: "from-gray-100/40 to-gray-200/30" },
  { value: "quartzite", label: "Quartzite", priceRange: "$55–$110/LF", description: "Natural stone. Marble look with granite durability. Best of both worlds.", gradient: "from-stone-300/20 to-neutral-400/20" },
  { value: "not-sure", label: "Not Sure Yet", priceRange: "We'll help!", description: "No worries — our team will guide you through the options.", gradient: "from-blue-100/30 to-sky-200/20" },
];

export function StepMaterial({ value, onChange }: StepMaterialProps) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy">
        What material do you prefer?
      </h2>
      <p className="mt-2 text-muted-foreground">
        Don&apos;t worry if you&apos;re not sure — we&apos;ll help you choose during the consultation.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all",
              value === option.value
                ? "border-gold bg-gold/5"
                : "border-warm-medium bg-white hover:border-gold/50"
            )}
          >
            <div className={cn("flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br", option.gradient)}>
              <span className="font-heading text-xl font-bold text-navy/40">
                {option.label[0]}
              </span>
            </div>
            <span className="font-heading text-base font-semibold text-navy">
              {option.label}
            </span>
            <span className="text-sm font-semibold text-gold">{option.priceRange}</span>
            <span className="text-xs text-muted-foreground">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
