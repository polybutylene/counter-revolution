import type { Metadata } from "next";
import dynamic from "next/dynamic";

const EstimatorWizard = dynamic(
  () => import("@/components/estimator/EstimatorWizard").then((m) => m.EstimatorWizard),
  { ssr: false, loading: () => <div className="mx-auto h-96 max-w-3xl animate-pulse rounded-xl bg-warm-medium" /> }
);
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Instant Countertop Estimator | Free Quote in 60 Seconds",
  description: "Get a free ballpark estimate for your countertop project in 60 seconds. No phone call required. Granite, quartz, marble, and quartzite pricing for Bay County, FL.",
};

export default function EstimatePage() {
  return (
    <section className="min-h-screen bg-warm-light py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Instant Countertop Estimator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Answer a few questions and get a ballpark price range in under 60 seconds.
          </p>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-success" />
            No obligation. No spam. Just transparency.
          </p>
        </div>
        <div className="rounded-2xl border border-warm-medium bg-white p-6 shadow-sm sm:p-8">
          <EstimatorWizard />
        </div>
      </div>
    </section>
  );
}
