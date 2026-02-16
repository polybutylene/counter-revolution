"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";
import { submitContactForm } from "@/lib/convex/submitLead";
import { trackEvent } from "@/components/shared/TrackEvent";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Please describe your project"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      trackEvent("quote_form_submitted", { projectType: data.projectType });
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-success/20 bg-success/5 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 font-heading text-xl font-semibold text-navy">
          Message Sent!
        </h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-dark">
          Full Name *
        </label>
        <Input
          id="name"
          placeholder="John Smith"
          {...register("name")}
          className="mt-1"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className="mt-1"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-dark">
            Phone *
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="(850) 000-0000"
            {...register("phone")}
            className="mt-1"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-dark">
          Project Type *
        </label>
        <select
          id="projectType"
          {...register("projectType")}
          className="mt-1 flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        >
          <option value="">Select a project type</option>
          <option value="kitchen">Kitchen Countertops</option>
          <option value="bathroom">Bathroom Vanity</option>
          <option value="outdoor">Outdoor Kitchen</option>
          <option value="commercial">Commercial</option>
          <option value="repair">Countertop Repair</option>
          <option value="backsplash">Backsplash</option>
          <option value="other">Other</option>
        </select>
        {errors.projectType && (
          <p className="mt-1 text-sm text-red-500">{errors.projectType.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark">
          Tell Us About Your Project *
        </label>
        <Textarea
          id="message"
          placeholder="Describe your project — what rooms, approximate size, any material preferences, timeline..."
          rows={5}
          {...register("message")}
          className="mt-1"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
