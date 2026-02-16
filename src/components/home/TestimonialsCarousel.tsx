"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StarRating } from "@/components/shared/StarRating";

interface TestimonialItem {
  _id: string;
  name: string;
  quote: string;
  rating: number;
  projectType?: string;
  city?: string;
}

const PLACEHOLDER_TESTIMONIALS: TestimonialItem[] = [
  { _id: "1", name: "Sarah M.", quote: "Countertop Revolution transformed our kitchen completely. The quartz countertops are absolutely stunning and the installation was done in just one day. Highly recommend!", rating: 5, projectType: "Kitchen Countertops", city: "Panama City" },
  { _id: "2", name: "David & Lisa R.", quote: "We shopped around for months and nobody came close to the quality and pricing Countertop Revolution offered. Our granite countertops exceeded every expectation.", rating: 5, projectType: "Kitchen Countertops", city: "Lynn Haven" },
  { _id: "3", name: "Mike T.", quote: "As a general contractor, I need reliable partners. Countertop Revolution delivers on time, every time. Their fabrication quality is the best in Bay County.", rating: 5, projectType: "Commercial", city: "Panama City Beach" },
  { _id: "4", name: "Jennifer K.", quote: "The team was so helpful with material selection. They steered me toward quartzite for my outdoor kitchen and it's been perfect through two Florida summers.", rating: 5, projectType: "Outdoor Kitchen", city: "30A" },
];

interface TestimonialsCarouselProps {
  testimonials?: TestimonialItem[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS;
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  return (
    <section className="bg-warm-light py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Reviews"
          title="What Our Customers Say"
          description="Real reviews from real Bay County homeowners."
        />
        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={items[current]._id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <Quote className="mx-auto h-10 w-10 text-gold/30" />
              <blockquote className="mt-4 text-lg text-dark sm:text-xl">
                &ldquo;{items[current].quote}&rdquo;
              </blockquote>
              <div className="mt-6">
                <StarRating rating={items[current].rating} />
              </div>
              <p className="mt-3 font-heading font-semibold text-navy">
                {items[current].name}
              </p>
              {(items[current].projectType || items[current].city) && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {items[current].projectType}
                  {items[current].city && ` · ${items[current].city}`}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-full border border-warm-medium bg-white p-2 text-navy transition-colors hover:border-gold hover:text-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === current ? "bg-gold" : "bg-warm-medium"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="rounded-full border border-warm-medium bg-white p-2 text-navy transition-colors hover:border-gold hover:text-gold"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
