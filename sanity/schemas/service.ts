import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "whatsIncluded", title: "What's Included", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "processSteps", title: "Process Steps", type: "array",
      of: [{ type: "object", fields: [{ name: "title", type: "string", title: "Step Title" }, { name: "description", type: "text", title: "Description" }] }],
    }),
    defineField({ name: "materialRecommendations", title: "Recommended Materials", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "pricing", title: "Pricing Info", type: "text", rows: 3 }),
    defineField({
      name: "faq", title: "FAQ", type: "array",
      of: [{ type: "object", fields: [{ name: "question", type: "string", title: "Question" }, { name: "answer", type: "text", title: "Answer" }] }],
    }),
    defineField({ name: "orderRank", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", media: "heroImage" },
  },
});
