import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse our countertop installation projects in Bay County, FL. Kitchen countertops, bathroom vanities, outdoor kitchens, and commercial projects.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
