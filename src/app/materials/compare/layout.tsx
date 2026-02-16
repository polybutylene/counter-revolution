import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Countertop Materials",
  description: "Side-by-side comparison of granite, quartz, marble, and quartzite. Compare durability, heat resistance, maintenance, pricing, and Gulf Coast suitability for your Bay County project.",
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
