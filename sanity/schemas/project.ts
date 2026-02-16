import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }], validation: (r) => r.required() }),
    defineField({ name: "beforeImage", title: "Before Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }),
    defineField({ name: "afterImage", title: "After Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }] }),
    defineField({ name: "materialType", title: "Material Type", type: "reference", to: [{ type: "material" }] }),
    defineField({ name: "serviceType", title: "Service Type", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "roomType", title: "Room Type", type: "string", options: { list: ["kitchen", "bathroom", "outdoor", "commercial", "other"] } }),
    defineField({ name: "style", title: "Style", type: "string", options: { list: ["modern", "traditional", "transitional", "coastal"] } }),
    defineField({ name: "budgetRange", title: "Budget Range", type: "string", options: { list: ["budget", "midRange", "premium"] } }),
    defineField({ name: "squareFootage", title: "Square Footage", type: "number" }),
    defineField({ name: "edgeProfile", title: "Edge Profile", type: "string" }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "customerTestimonial", title: "Customer Testimonial", type: "object",
      fields: [
        { name: "name", type: "string", title: "Customer Name" },
        { name: "quote", type: "text", title: "Quote" },
        { name: "rating", type: "number", title: "Rating", validation: (r) => r.min(1).max(5) },
      ],
    }),
    defineField({ name: "completionDate", title: "Completion Date", type: "date" }),
    defineField({ name: "city", title: "City", type: "string" }),
  ],
  preview: {
    select: { title: "title", media: "heroImage", subtitle: "materialType.name" },
  },
});
