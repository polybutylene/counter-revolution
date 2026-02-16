import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Countertop Blog: Guides & Inspiration",
  description:
    "Expert advice on countertops—buying guides, material education, design inspiration, and maintenance tips for Bay County homeowners.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
