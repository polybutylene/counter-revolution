import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const PROJECT_STAGES = [
  "Quote Accepted",
  "Template/Measurement Scheduled",
  "Template Completed",
  "Material Confirmed & Sourced",
  "Fabrication In Progress",
  "Quality Inspection",
  "Installation Scheduled",
  "Installation Complete",
  "Final Walkthrough",
];

export const getByProjectCode = query({
  args: { projectCode: v.string(), email: v.string() },
  handler: async (ctx, { projectCode, email }) => {
    const project = await ctx.db
      .query("projects")
      .withIndex("by_project_code", (q) => q.eq("projectCode", projectCode))
      .first();
    if (!project || project.customerEmail.toLowerCase() !== email.toLowerCase()) {
      return null;
    }
    return project;
  },
});

export const getById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    leadId: v.optional(v.id("estimatorLeads")),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    material: v.string(),
    edgeProfile: v.string(),
    colorPattern: v.optional(v.string()),
    squareFootage: v.optional(v.number()),
    estimatedCompletion: v.optional(v.string()),
    installerFirstName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const projectCode = generateProjectCode();
    const stages = PROJECT_STAGES.map((name) => ({
      name,
      completedAt: undefined,
      scheduledDate: undefined,
    }));

    const projectId = await ctx.db.insert("projects", {
      ...args,
      projectCode,
      currentStage: 1,
      stages,
    });

    if (args.leadId) {
      await ctx.db.patch(args.leadId, {
        status: "converted",
        convertedToProject: projectId,
      });
    }

    return { projectId, projectCode };
  },
});

export const updateStage = mutation({
  args: {
    id: v.id("projects"),
    stageIndex: v.number(),
    completedAt: v.optional(v.string()),
    scheduledDate: v.optional(v.string()),
  },
  handler: async (ctx, { id, stageIndex, completedAt, scheduledDate }) => {
    const project = await ctx.db.get(id);
    if (!project) throw new Error("Project not found");

    const stages = [...project.stages];
    if (stageIndex < 0 || stageIndex >= stages.length) {
      throw new Error("Invalid stage index");
    }

    stages[stageIndex] = {
      ...stages[stageIndex],
      ...(completedAt !== undefined && { completedAt }),
      ...(scheduledDate !== undefined && { scheduledDate }),
    };

    const currentStage = completedAt
      ? Math.min(stageIndex + 2, stages.length)
      : project.currentStage;

    await ctx.db.patch(id, { stages, currentStage });
  },
});

/**
 * Converts an estimator lead into a project, marks the lead as
 * "converted", creates the project with pre-filled customer data,
 * and sends the customer their project code via email.
 */
export const convertLeadToProject = action({
  args: {
    leadId: v.id("estimatorLeads"),
    colorPattern: v.optional(v.string()),
    squareFootage: v.optional(v.number()),
    estimatedCompletion: v.optional(v.string()),
    installerFirstName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const lead = await ctx.runQuery(api.projects.getLeadById, {
      id: args.leadId,
    });
    if (!lead) throw new Error("Lead not found");

    const result = await ctx.runMutation(api.projects.create, {
      leadId: args.leadId,
      customerName: lead.name,
      customerEmail: lead.email,
      customerPhone: lead.phone,
      material: lead.materialPreference,
      edgeProfile: lead.edgeProfile,
      colorPattern: args.colorPattern,
      squareFootage: args.squareFootage,
      estimatedCompletion: args.estimatedCompletion,
      installerFirstName: args.installerFirstName,
    });

    // Send the customer their project code
    ctx.runAction(api.email.sendProjectCodeEmail, {
      customerEmail: lead.email,
      customerName: lead.name,
      projectCode: result.projectCode,
      material: lead.materialPreference,
      edgeProfile: lead.edgeProfile,
      estimatedCompletion: args.estimatedCompletion,
    });

    return result;
  },
});

/**
 * Helper query used by convertLeadToProject to read a lead.
 */
export const getLeadById = query({
  args: { id: v.id("estimatorLeads") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

/**
 * Updates a project stage and emails the customer about the change.
 */
export const updateStageWithNotification = action({
  args: {
    id: v.id("projects"),
    stageIndex: v.number(),
    completedAt: v.optional(v.string()),
    scheduledDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.runMutation(api.projects.updateStage, {
      id: args.id,
      stageIndex: args.stageIndex,
      completedAt: args.completedAt,
      scheduledDate: args.scheduledDate,
    });

    const project = await ctx.runQuery(api.projects.getById, { id: args.id });
    if (!project) return;

    const stage = project.stages[args.stageIndex];
    if (!stage) return;

    const stageAction = args.completedAt
      ? "This step has been completed."
      : args.scheduledDate
        ? `This step has been scheduled for ${args.scheduledDate}.`
        : "This step has been updated.";

    ctx.runAction(api.email.sendStageUpdateEmail, {
      customerEmail: project.customerEmail,
      customerName: project.customerName,
      projectCode: project.projectCode,
      stageName: stage.name,
      stageAction,
      scheduledDate: args.scheduledDate,
    });
  },
});

function generateProjectCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "CR-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
