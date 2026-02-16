import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    projectType: v.string(),
    message: v.string(),
    photos: v.optional(v.array(v.id("_storage"))),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      ...args,
      status: "new",
    });
    return id;
  },
});

export const getSubmissions = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contactSubmissions").order("desc").collect();
  },
});

export const updateSubmissionStatus = mutation({
  args: { id: v.id("contactSubmissions"), status: v.string() },
  handler: async (ctx, { id, status }) => {
    await ctx.db.patch(id, { status });
  },
});
