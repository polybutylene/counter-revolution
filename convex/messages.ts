import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    return await ctx.db
      .query("projectMessages")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .order("asc")
      .collect();
  },
});

export const send = mutation({
  args: {
    projectId: v.id("projects"),
    senderType: v.string(),
    senderName: v.string(),
    body: v.string(),
    photos: v.optional(v.array(v.id("_storage"))),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projectMessages", args);
  },
});
