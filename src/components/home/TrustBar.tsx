import { Star, CheckCircle, Clock, MapPin } from "lucide-react";

interface TrustBarProps {
  googleRating?: number;
  reviewCount?: number;
  projectsCompleted?: number;
  turnaroundDays?: string;
}

const DEFAULT_STATS = {
  googleRating: 4.8,
  reviewCount: 120,
  projectsCompleted: 200,
  turnaroundDays: "7-10 Day",
};

export function TrustBar(props: TrustBarProps) {
  const stats = { ...DEFAULT_STATS, ...props };

  const items = [
    {
      icon: <Star className="h-5 w-5 fill-gold text-gold" />,
      text: `${stats.googleRating} Google Rating`,
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-success" />,
      text: `${stats.projectsCompleted}+ Projects Completed`,
    },
    {
      icon: <MapPin className="h-5 w-5 text-navy" />,
      text: "Locally Owned & Operated",
    },
    {
      icon: <Clock className="h-5 w-5 text-navy" />,
      text: `${stats.turnaroundDays} Turnaround`,
    },
  ];

  return (
    <section className="border-b border-warm-medium bg-white py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-medium text-dark">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
