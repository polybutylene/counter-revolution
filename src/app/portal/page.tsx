"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, AlertCircle } from "lucide-react";
import { PortalDashboard } from "@/components/portal/PortalDashboard";

export default function PortalPage() {
  const [email, setEmail] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", projectCode: "" });

  const project = useQuery(
    api.projects.getByProjectCode,
    loggedIn ? { projectCode: credentials.projectCode, email: credentials.email } : "skip"
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !projectCode) {
      setError("Please enter both your email and project code.");
      return;
    }
    setCredentials({ email, projectCode: projectCode.toUpperCase() });
    setLoggedIn(true);
  };

  if (loggedIn && project === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warm-light">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  if (loggedIn && project === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warm-light p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
          <h2 className="mt-4 font-heading text-xl font-semibold text-navy">
            Project Not Found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn&apos;t find a project matching that email and project code. Please check your
            credentials and try again.
          </p>
          <Button
            variant="gold"
            className="mt-6"
            onClick={() => { setLoggedIn(false); setError(""); }}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (loggedIn && project) {
    return <PortalDashboard project={project} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-light p-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy">
            <Lock className="h-6 w-6 text-gold" />
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold text-navy">
            Project Tracker
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email and project code to view your project status and communicate
            with our team.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="portal-email" className="block text-sm font-medium text-dark">
              Email Address
            </label>
            <Input
              id="portal-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="portal-code" className="block text-sm font-medium text-dark">
              Project Code
            </label>
            <Input
              id="portal-code"
              type="text"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value.toUpperCase())}
              placeholder="CR-XXXXXX"
              className="mt-1 font-mono uppercase"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Your project code was provided when your project was booked.
            </p>
          </div>
          {error && (
            <p className="flex items-center gap-1.5 text-sm text-red-500">
              <AlertCircle className="h-4 w-4" /> {error}
            </p>
          )}
          <Button type="submit" variant="gold" size="lg" className="w-full">
            View My Project
          </Button>
        </form>
      </div>
    </div>
  );
}
