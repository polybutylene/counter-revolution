import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  estimatorLeads: defineTable({
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
    status: v.string(),
    convertedToProject: v.optional(v.id("projects")),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    projectType: v.string(),
    message: v.string(),
    photos: v.optional(v.array(v.id("_storage"))),
    status: v.string(),
  }).index("by_status", ["status"]),

  projects: defineTable({
    leadId: v.optional(v.id("estimatorLeads")),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    projectCode: v.string(),
    material: v.string(),
    edgeProfile: v.string(),
    colorPattern: v.optional(v.string()),
    squareFootage: v.optional(v.number()),
    estimatedCompletion: v.optional(v.string()),
    installerFirstName: v.optional(v.string()),
    currentStage: v.number(),
    stages: v.array(
      v.object({
        name: v.string(),
        completedAt: v.optional(v.string()),
        scheduledDate: v.optional(v.string()),
      })
    ),
    materialPhoto: v.optional(v.id("_storage")),
  })
    .index("by_project_code", ["projectCode"])
    .index("by_email", ["customerEmail"]),

  projectMessages: defineTable({
    projectId: v.id("projects"),
    senderType: v.string(),
    senderName: v.string(),
    body: v.string(),
    photos: v.optional(v.array(v.id("_storage"))),
  }).index("by_project", ["projectId"]),
});
