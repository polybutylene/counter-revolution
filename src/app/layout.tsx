import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { GoogleAnalytics, GTMNoScript } from "@/components/shared/GoogleAnalytics";
import { LocalBusinessJsonLd } from "@/components/shared/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://countertoprevolution.com"
  ),
  title: {
    default: "Countertop Revolution | Bay County's Trusted Countertop Experts",
    template: "%s | Countertop Revolution",
  },
  description:
    "Premium granite, quartz, marble & quartzite countertop fabrication and installation in Bay County, FL. Free estimates, 7-10 day turnaround. Locally owned.",
  keywords: [
    "countertops",
    "granite countertops",
    "quartz countertops",
    "marble countertops",
    "countertop installation",
    "Bay County FL",
    "Panama City",
    "Panama City Beach",
    "kitchen countertops",
    "bathroom vanities",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Countertop Revolution",
    title: "Countertop Revolution | Bay County's Trusted Countertop Experts",
    description:
      "Premium granite, quartz, marble & quartzite countertop fabrication and installation in Bay County, FL.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        <GoogleAnalytics />
        <LocalBusinessJsonLd />
      </head>
      <body className="min-h-screen flex flex-col">
        <GTMNoScript />
        <ConvexClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomBar />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
