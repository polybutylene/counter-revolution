import { Gem, Layers, Maximize2, Calendar, User, Hash } from "lucide-react";

interface ProjectDetailsProps {
  material: string;
  edgeProfile: string;
  colorPattern?: string;
  squareFootage?: number;
  estimatedCompletion?: string;
  installerFirstName?: string;
  projectCode: string;
}

export function ProjectDetails({
  material, edgeProfile, colorPattern, squareFootage,
  estimatedCompletion, installerFirstName, projectCode,
}: ProjectDetailsProps) {
  const details = [
    { icon: <Gem className="h-4 w-4" />, label: "Material", value: material },
    { icon: <Layers className="h-4 w-4" />, label: "Edge Profile", value: edgeProfile },
    ...(colorPattern ? [{ icon: <Gem className="h-4 w-4" />, label: "Color/Pattern", value: colorPattern }] : []),
    ...(squareFootage ? [{ icon: <Maximize2 className="h-4 w-4" />, label: "Square Footage", value: `${squareFootage} sq ft` }] : []),
    ...(estimatedCompletion ? [{ icon: <Calendar className="h-4 w-4" />, label: "Est. Completion", value: new Date(estimatedCompletion).toLocaleDateString() }] : []),
    ...(installerFirstName ? [{ icon: <User className="h-4 w-4" />, label: "Installer", value: installerFirstName }] : []),
    { icon: <Hash className="h-4 w-4" />, label: "Project Code", value: projectCode },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="font-heading text-lg font-semibold text-navy">
        Project Details
      </h2>
      <dl className="mt-4 divide-y divide-warm-medium">
        {details.map((detail, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warm-light text-navy">
              {detail.icon}
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">{detail.label}</dt>
              <dd className="text-sm font-medium capitalize text-dark">{detail.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
