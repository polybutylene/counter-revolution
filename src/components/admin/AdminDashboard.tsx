"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Loader2, Users, ClipboardList, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function AdminDashboard() {
  const projects = useQuery(api.projects.listAll);

  return (
    <div className="min-h-screen bg-warm-light">
      {/* Header */}
      <div className="border-b border-warm-medium bg-navy">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-heading text-lg font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="text-xs text-gray-400">Counter Revolution</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outlineGold" size="sm" asChild>
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/10 text-navy">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">{projects?.length ?? "—"}</p>
                <p className="text-xs text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">
                  {projects?.filter((p: any) => p.currentStage < 9).length ?? "—"}
                </p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">
                  {projects?.filter((p: any) => p.currentStage >= 9).length ?? "—"}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="mt-8 rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-warm-medium px-6 py-4">
            <h2 className="font-heading text-lg font-semibold text-navy">All Projects</h2>
          </div>

          {projects === undefined ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-navy" />
            </div>
          ) : projects.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No projects yet. Projects are created when leads are converted.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-medium text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Code</th>
                    <th className="px-6 py-3">Material</th>
                    <th className="px-6 py-3">Stage</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-medium">
                  {projects.map((project: any) => (
                    <tr key={project._id} className="hover:bg-warm-light/50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-dark">{project.customerName}</p>
                        <p className="text-xs text-muted-foreground">{project.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs font-mono text-navy">{project.projectCode}</code>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="capitalize">
                          {project.material}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full max-w-[80px] overflow-hidden rounded-full bg-warm-medium">
                            <div
                              className="h-full rounded-full bg-gold"
                              style={{
                                width: `${(project.currentStage / 9) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {project.currentStage}/9
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {project.stages[project.currentStage - 1]?.name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/projects/${project._id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-gold"
                        >
                          Manage <ArrowRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
