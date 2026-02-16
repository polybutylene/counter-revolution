import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Tracker",
  description: "Track the status of your countertop installation project in real time.",
};

const PortalPageClient = dynamic(
  () => import("@/components/portal/PortalPage").then((m) => m.PortalPageClient),
  { ssr: false, loading: () => <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-navy border-t-transparent" /></div> }
);

export default function PortalPage() {
  return <PortalPageClient />;
}
