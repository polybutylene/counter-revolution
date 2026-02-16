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

export async function submitEstimateLead(args: Record<string, unknown>) {
  const c = getClient();
  if (!c) return null;
  try {
    return await c.mutation(api.estimator.submitEstimate, args as any);
  } catch (err) {
    console.warn("Convex submit estimate failed (non-critical):", err);
    return null;
  }
}

export async function submitContactForm(args: Record<string, unknown>) {
  const c = getClient();
  if (!c) return null;
  try {
    return await c.mutation(api.contact.submitContact, args as any);
  } catch (err) {
    console.warn("Convex submit contact failed (non-critical):", err);
    return null;
  }
}
