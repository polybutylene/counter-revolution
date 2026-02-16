"use client";

import { ProjectTimeline } from "./ProjectTimeline";
import { ProjectDetails } from "./ProjectDetails";
import { MessageThread } from "./MessageThread";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortalDashboardProps {
  project: {
    _id: any;
    customerName: string;
    material: string;
    edgeProfile: string;
    colorPattern?: string;
    squareFootage?: number;
    estimatedCompletion?: string;
    installerFirstName?: string;
    currentStage: number;
    stages: { name: string; completedAt?: string; scheduledDate?: string }[];
    projectCode: string;
  };
}

export function PortalDashboard({ project }: PortalDashboardProps) {
  return (
    <div className="min-h-screen bg-warm-light">
      {/* Header */}
      <div className="border-b border-warm-medium bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-heading text-lg font-bold text-navy">
              Counter<span className="text-gold"> Revolution</span>
            </h1>
            <p className="text-xs text-muted-foreground">Project Tracker</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {project.customerName} · {project.projectCode}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main: Timeline + Messages */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold text-navy">
                Project Status
              </h2>
              <ProjectTimeline
                stages={project.stages}
                currentStage={project.currentStage}
              />
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-lg font-semibold text-navy">
                Messages
              </h2>
              <MessageThread
                projectId={project._id}
                customerName={project.customerName}
              />
            </div>
          </div>

          {/* Sidebar: Details */}
          <div>
            <ProjectDetails
              material={project.material}
              edgeProfile={project.edgeProfile}
              colorPattern={project.colorPattern}
              squareFootage={project.squareFootage}
              estimatedCompletion={project.estimatedCompletion}
              installerFirstName={project.installerFirstName}
              projectCode={project.projectCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
