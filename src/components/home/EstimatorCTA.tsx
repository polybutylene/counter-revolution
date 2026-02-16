import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, Shield } from "lucide-react";
import { AnimateInView } from "@/components/shared/AnimateInView";

export function EstimatorCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
      {/* Decorative stone texture pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_50%,_white_1px,_transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimateInView>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/20">
            <Calculator className="h-8 w-8 text-gold" />
          </div>
          <h2 className="mt-6 font-heading text-3xl font-bold text-white sm:text-4xl">
            Get a Ballpark Estimate in 60 Seconds
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            No phone call required. Answer a few questions about your project and get an
            instant price range — completely free.
          </p>
          <div className="mt-8">
            <Button variant="gold" size="xl" asChild>
              <Link href="/estimate">Try the Instant Estimator</Link>
            </Button>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
            <Shield className="h-4 w-4" />
            No obligation. No spam. Just transparency.
          </p>
        </AnimateInView>
      </div>
    </section>
  );
}
