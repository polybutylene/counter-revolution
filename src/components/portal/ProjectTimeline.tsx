import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectTimelineProps {
  stages: { name: string; completedAt?: string; scheduledDate?: string }[];
  currentStage: number;
}

export function ProjectTimeline({ stages, currentStage }: ProjectTimelineProps) {
  return (
    <div className="mt-6 space-y-0">
      {stages.map((stage, i) => {
        const stageNum = i + 1;
        const isCompleted = stage.completedAt;
        const isCurrent = stageNum === currentStage;
        const isPending = stageNum > currentStage;

        return (
          <div key={i} className="flex gap-4">
            {/* Connector Line + Icon */}
            <div className="flex flex-col items-center">
              {isCompleted ? (
                <CheckCircle className="h-6 w-6 shrink-0 text-success" />
              ) : isCurrent ? (
                <div className="relative">
                  <Loader2 className="h-6 w-6 shrink-0 animate-spin text-gold" />
                </div>
              ) : (
                <Circle className="h-6 w-6 shrink-0 text-warm-medium" />
              )}
              {i < stages.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-[24px]",
                    isCompleted ? "bg-success" : "bg-warm-medium"
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className={cn("pb-6", i === stages.length - 1 && "pb-0")}>
              <p
                className={cn(
                  "text-sm font-semibold",
                  isCompleted && "text-success",
                  isCurrent && "text-navy",
                  isPending && "text-muted-foreground"
                )}
              >
                {stage.name}
                {isCurrent && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-gold/10 px-2 py-0.5 text-xs font-semibold text-gold">
                    In Progress
                  </span>
                )}
              </p>
              {stage.completedAt && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Completed {new Date(stage.completedAt).toLocaleDateString()}
                </p>
              )}
              {!stage.completedAt && stage.scheduledDate && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Scheduled for {new Date(stage.scheduledDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
