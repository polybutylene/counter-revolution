import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { PreferredContact, ProjectTimeline } from "@/types/estimator";

interface StepContactProps {
  name: string;
  phone: string;
  email: string;
  preferredContact: PreferredContact | "";
  timeline: ProjectTimeline | "";
  notes: string;
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

const CONTACT_METHODS: { value: PreferredContact; label: string }[] = [
  { value: "call", label: "Call" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
];

const TIMELINES: { value: ProjectTimeline; label: string }[] = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1-3 Months" },
  { value: "3-6-months", label: "3-6 Months" },
  { value: "researching", label: "Just Researching" },
];

export function StepContact({ name, phone, email, preferredContact, timeline, notes, onChange, errors }: StepContactProps) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy">
        Almost there! How can we reach you?
      </h2>
      <p className="mt-2 text-muted-foreground">
        We&apos;ll contact you within 24 hours to discuss your project.
      </p>
      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="est-name" className="block text-sm font-medium text-dark">Full Name *</label>
          <Input id="est-name" value={name} onChange={(e) => onChange("name", e.target.value)} placeholder="John Smith" className="mt-1" />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="est-phone" className="block text-sm font-medium text-dark">Phone *</label>
            <Input id="est-phone" type="tel" value={phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="(850) 000-0000" className="mt-1" />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="est-email" className="block text-sm font-medium text-dark">Email *</label>
            <Input id="est-email" type="email" value={email} onChange={(e) => onChange("email", e.target.value)} placeholder="john@example.com" className="mt-1" />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark">Preferred Contact Method</label>
          <div className="mt-2 flex gap-2">
            {CONTACT_METHODS.map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => onChange("preferredContact", method.value)}
                className={cn(
                  "flex h-11 flex-1 items-center justify-center rounded-lg border-2 text-sm font-semibold transition-colors",
                  preferredContact === method.value ? "border-gold bg-gold/5 text-navy" : "border-warm-medium text-dark hover:border-gold/50"
                )}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark">Project Timeline</label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TIMELINES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => onChange("timeline", t.value)}
                className={cn(
                  "flex h-11 items-center justify-center rounded-lg border-2 text-xs font-semibold transition-colors",
                  timeline === t.value ? "border-gold bg-gold/5 text-navy" : "border-warm-medium text-dark hover:border-gold/50"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="est-notes" className="block text-sm font-medium text-dark">
            Additional Notes <span className="text-muted-foreground">(optional)</span>
          </label>
          <Textarea
            id="est-notes"
            value={notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Anything else we should know about your project?"
            rows={3}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
