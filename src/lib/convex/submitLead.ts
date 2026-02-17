import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

let client: ConvexHttpClient | null = null;

function getClient(): ConvexHttpClient | null {
  if (!CONVEX_URL) return null;
  if (!client) {
    client = new ConvexHttpClient(CONVEX_URL);
  }
  return client;
}

/**
 * Submits an estimate lead AND fires email notifications
 * (business owner alert + customer confirmation).
 * Falls back to the plain mutation if the action isn't available.
 */
export async function submitEstimateLead(args: Record<string, unknown>) {
  const c = getClient();
  if (!c) return null;
  try {
    return await c.action(
      api.estimator.submitEstimateWithNotifications,
      args as any
    );
  } catch (err) {
    // Fallback: save the lead without email notifications
    try {
      return await c.mutation(api.estimator.submitEstimate, args as any);
    } catch (fallbackErr) {
      console.warn("Convex submit estimate failed (non-critical):", fallbackErr);
      return null;
    }
  }
}

/**
 * Submits a contact form AND fires the customer confirmation email.
 * Falls back to the plain mutation if the action isn't available.
 */
export async function submitContactForm(args: Record<string, unknown>) {
  const c = getClient();
  if (!c) return null;
  try {
    return await c.action(
      api.contact.submitContactWithNotification,
      args as any
    );
  } catch (err) {
    try {
      return await c.mutation(api.contact.submitContact, args as any);
    } catch (fallbackErr) {
      console.warn("Convex submit contact failed (non-critical):", fallbackErr);
      return null;
    }
  }
}
