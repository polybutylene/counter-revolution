import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const ESTIMATE_ARGS = {
  projectType: v.string(),
  linearFootage: v.number(),
  sinkCutouts: v.number(),
  cooktopCutouts: v.number(),
  includeBacksplash: v.boolean(),
  backsplashHeight: v.optional(v.string()),
  includeIsland: v.boolean(),
  islandSize: v.optional(v.string()),
  materialPreference: v.string(),
  edgeProfile: v.string(),
  name: v.string(),
  phone: v.string(),
  email: v.string(),
  preferredContact: v.string(),
  timeline: v.string(),
  photos: v.optional(v.array(v.id("_storage"))),
  notes: v.optional(v.string()),
  estimateLow: v.number(),
  estimateHigh: v.number(),
  estimateBreakdown: v.object({
    materialCost: v.object({ low: v.number(), high: v.number() }),
    fabrication: v.object({ low: v.number(), high: v.number() }),
    installation: v.object({ low: v.number(), high: v.number() }),
    cutouts: v.object({ low: v.number(), high: v.number() }),
    edgeProfile: v.object({ low: v.number(), high: v.number() }),
    backsplash: v.object({ low: v.number(), high: v.number() }),
    island: v.object({ low: v.number(), high: v.number() }),
  }),
};

export const submitEstimate = mutation({
  args: ESTIMATE_ARGS,
  handler: async (ctx, args) => {
    const leadId = await ctx.db.insert("estimatorLeads", {
      ...args,
      status: "new",
    });
    return leadId;
  },
});

/**
 * Wraps submitEstimate + fires email notifications.
 * Called from the frontend instead of the raw mutation so that
 * the business owner gets an email alert and the customer gets
 * a confirmation email — all in one call.
 */
export const submitEstimateWithNotifications = action({
  args: ESTIMATE_ARGS,
  handler: async (ctx, args) => {
    const leadId = await ctx.runMutation(api.estimator.submitEstimate, args);

    // Fire-and-forget email notifications
    ctx.runAction(api.email.sendLeadNotification, {
      leadName: args.name,
      leadEmail: args.email,
      leadPhone: args.phone,
      projectType: args.projectType,
      materialPreference: args.materialPreference,
      estimateLow: args.estimateLow,
      estimateHigh: args.estimateHigh,
      timeline: args.timeline,
      preferredContact: args.preferredContact,
    });

    ctx.runAction(api.email.sendEstimateConfirmation, {
      customerEmail: args.email,
      customerName: args.name,
      estimateLow: args.estimateLow,
      estimateHigh: args.estimateHigh,
      materialPreference: args.materialPreference,
    });

    return leadId;
  },
});

export const getLeads = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("estimatorLeads").order("desc").collect();
  },
});

export const getLeadsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, { status }) => {
    return await ctx.db
      .query("estimatorLeads")
      .withIndex("by_status", (q) => q.eq("status", status))
      .collect();
  },
});

export const updateLeadStatus = mutation({
  args: { id: v.id("estimatorLeads"), status: v.string() },
  handler: async (ctx, { id, status }) => {
    await ctx.db.patch(id, { status });
  },
});
