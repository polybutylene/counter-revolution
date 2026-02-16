import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Counter Revolution privacy policy. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs />
      <h1 className="mt-4 font-heading text-3xl font-bold text-navy">Privacy Policy</h1>
      <div className="prose mt-8 max-w-none text-muted-foreground">
        <p>Last updated: February 2026</p>
        <h2 className="font-heading text-xl font-semibold text-navy">Information We Collect</h2>
        <p>
          When you use our website, instant estimator, contact forms, or project tracker, we collect
          information you voluntarily provide including your name, email address, phone number,
          project details, and uploaded photos.
        </p>
        <h2 className="font-heading text-xl font-semibold text-navy">How We Use Your Information</h2>
        <p>
          We use your information to respond to inquiries, provide estimates, manage your countertop
          project, send project updates, and improve our services. We do not sell your personal
          information to third parties.
        </p>
        <h2 className="font-heading text-xl font-semibold text-navy">Cookies &amp; Analytics</h2>
        <p>
          We use Google Analytics to understand how visitors use our website. This service may place
          cookies on your device. You can opt out of Google Analytics by installing the Google
          Analytics Opt-out Browser Add-on.
        </p>
        <h2 className="font-heading text-xl font-semibold text-navy">Contact</h2>
        <p>
          If you have questions about this privacy policy, contact us at{" "}
          <a href="mailto:info@counterrevolution.com" className="text-gold hover:underline">
            info@counterrevolution.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
