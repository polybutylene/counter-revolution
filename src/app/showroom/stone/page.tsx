import { Suspense } from "react";
import { Metadata } from "next";
import { ShowroomPage } from "@/components/showroom/ShowroomPage";

export const metadata: Metadata = {
  title: "Stone Showroom | Browse Countertops & Get Estimates",
  description:
    "Browse premium granite, quartz, marble & quartzite countertops. Get instant estimates. No showroom visit needed.",
};

export default function StoneShowroomRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warm-light" />}>
      <ShowroomPage />
    </Suspense>
  );
}
