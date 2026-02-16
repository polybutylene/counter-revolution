"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectTimeline } from "@/components/portal/ProjectTimeline";
import { MessageThread } from "@/components/portal/MessageThread";
import { ProjectDetails } from "@/components/portal/ProjectDetails";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

interface AdminProjectPageProps {
  params: { id: string };
}

export default function AdminProjectPage({ params }: AdminProjectPageProps) {
  const projectId = params.id as Id<"projects">;
  const project = useQuery(api.projects.getById, { id: projectId });
  const updateStage = useMutation(api.projects.updateStage);
  const [updating, setUpdating] = useState<number | null>(null);

  if (project === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  const handleCompleteStage = async (stageIndex: number) => {
    setUpdating(stageIndex);
    try {
      await updateStage({
        id: projectId,
        stageIndex,
        completedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to update stage:", err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="min-h-screen bg-warm-light">
      {/* Header */}
      <div className="border-b border-warm-medium bg-navy">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link href="/admin" className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-heading text-lg font-bold text-white">
              {project.customerName}
            </h1>
            <p className="font-mono text-xs text-gray-400">{project.projectCode}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-8 lg:col-span-2">
            {/* Stage Management */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold text-navy">
                Stage Management
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Click &quot;Complete&quot; to advance to the next stage.
              </p>
              <div className="mt-4 space-y-3">
                {project.stages.map((stage, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-warm-medium bg-warm-light/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      {stage.completedAt ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-warm-medium" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-dark">{stage.name}</p>
                        {stage.completedAt && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(stage.completedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    {!stage.completedAt && i + 1 === project.currentStage && (
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => handleCompleteStage(i)}
                        disabled={updating === i}
                      >
                        {updating === i ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Complete"
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-heading text-lg font-semibold text-navy">
                Messages (Send as Team)
              </h2>
              <AdminMessageThread
                projectId={projectId}
              />
            </div>
          </div>

          {/* Sidebar */}
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

function AdminMessageThread({ projectId }: { projectId: Id<"projects"> }) {
  const messages = useQuery(api.messages.getByProject, { projectId });
  const sendMessage = useMutation(api.messages.send);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!body.trim()) return;
    setSending(true);
    try {
      await sendMessage({
        projectId,
        senderType: "team",
        senderName: "Countertop Revolution",
        body: body.trim(),
      });
      setBody("");
    } catch (err) {
      console.error("Failed to send:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="max-h-72 space-y-3 overflow-y-auto">
        {messages === undefined && (
          <div className="py-4 text-center">
            <Loader2 className="mx-auto h-5 w-5 animate-spin text-navy" />
          </div>
        )}
        {messages?.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">No messages yet.</p>
        )}
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`rounded-lg p-3 text-sm ${
              msg.senderType === "team" ? "bg-navy/5" : "bg-gold/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-navy">{msg.senderName}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(msg._creationTime).toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-dark">{msg.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Send a message as the team..."
          rows={2}
          className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
        />
        <Button
          variant="gold"
          size="sm"
          onClick={handleSend}
          disabled={!body.trim() || sending}
          className="self-end"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
