"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

interface ContactDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context?: {
    stoneName?: string;
    estimateRange?: string;
    edgeProfile?: string;
  };
}

export function ContactDrawer({ open, onOpenChange, context }: ContactDrawerProps) {
  const { track } = useAnalytics();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredContact: 'phone',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission — in production, call Convex mutation
    await new Promise(resolve => setTimeout(resolve, 1000));

    track('contact_form_submitted', {
      stone: context?.stoneName,
      has_estimate: !!context?.estimateRange,
    });

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="font-heading text-xl font-bold text-navy">We&apos;ll Be in Touch!</h3>
            <p className="mt-2 text-dark/70">
              One of our countertop specialists will contact you within 1 business day to schedule your free in-home estimate.
            </p>
            <Button className="mt-6" variant="gold" onClick={() => onOpenChange(false)}>
              Back to Showroom
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-navy">Schedule Your Free Estimate</DialogTitle>
          <DialogDescription>
            We&apos;ll come to you — free in-home measurements and a detailed quote.
          </DialogDescription>
        </DialogHeader>

        {context && (context.stoneName || context.estimateRange) && (
          <div className="rounded-lg bg-warm-light p-3 text-sm space-y-1">
            <p className="font-medium text-navy">Your selections:</p>
            {context.stoneName && <p className="text-dark/70">Stone: {context.stoneName}</p>}
            {context.edgeProfile && <p className="text-dark/70">Edge: {context.edgeProfile}</p>}
            {context.estimateRange && (
              <p className="text-dark/70">Estimate: {context.estimateRange}</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-dark mb-1">
              Name
            </label>
            <input
              id="contact-name"
              required
              type="text"
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg border border-warm-medium bg-white px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
              placeholder="Your name"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-dark mb-1">
                Phone
              </label>
              <input
                id="contact-phone"
                required
                type="tel"
                value={form.phone}
                onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-lg border border-warm-medium bg-white px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                placeholder="(850) 555-0123"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-dark mb-1">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-lg border border-warm-medium bg-white px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-notes" className="block text-sm font-medium text-dark mb-1">
              Anything else we should know?
            </label>
            <textarea
              id="contact-notes"
              rows={3}
              value={form.notes}
              onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full rounded-lg border border-warm-medium bg-white px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy resize-none"
              placeholder="Timeline, specific questions, etc."
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="flex-1"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy border-t-transparent" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule My Free Estimate
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
            <a
              href="tel:8500000000"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-navy px-4 py-2.5 font-heading font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
