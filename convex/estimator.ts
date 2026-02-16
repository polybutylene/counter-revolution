import { mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const submitEstimate = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const leadId = await ctx.db.insert("estimatorLeads", {
      ...args,
      status: "new",
    });
    return leadId;
  },
});

export const getLeads = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("estimatorLeads").order("desc").collect();
  },
});

export const getLeadsByStatus = mutation({
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
