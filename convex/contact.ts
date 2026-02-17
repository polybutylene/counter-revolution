import { mutation, query, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const CONTACT_ARGS = {
  name: v.string(),
  email: v.string(),
  phone: v.string(),
  projectType: v.string(),
  message: v.string(),
  photos: v.optional(v.array(v.id("_storage"))),
};

export const submitContact = mutation({
  args: CONTACT_ARGS,
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      ...args,
      status: "new",
    });
    return id;
  },
});

/**
 * Wraps submitContact + fires the customer confirmation email.
 */
export const submitContactWithNotification = action({
  args: CONTACT_ARGS,
  handler: async (ctx, args) => {
    const id = await ctx.runMutation(api.contact.submitContact, args);

    ctx.runAction(api.email.sendContactConfirmation, {
      customerEmail: args.email,
      customerName: args.name,
    });

    return id;
  },
});

export const getSubmissions = query({
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
