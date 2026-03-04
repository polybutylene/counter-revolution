import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://stratumco.com"
  ),
  title: {
    default: "Stratum Co. | Bay County's Trusted Home Surfaces Experts",
    template: "%s | Stratum Co.",
  },
  description:
    "Premium countertops, tile, painting, and flooring — fabricated and installed in Bay County, FL. Free estimates, transparent pricing. Locally owned.",
  keywords: [
    "countertops",
    "tile installation",
    "house painting",
    "flooring installation",
    "granite countertops",
    "quartz countertops",
    "Bay County FL",
    "Panama City",
    "Panama City Beach",
    "home improvement",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Stratum Co.",
    title: "Stratum Co. | Bay County's Trusted Home Surfaces Experts",
    description:
      "Premium countertops, tile, painting, and flooring in Bay County, FL. Transparent pricing, free estimates.",
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
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${playfair.variable}`}>
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
