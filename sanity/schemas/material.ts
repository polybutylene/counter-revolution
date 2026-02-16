import { defineType, defineField } from "sanity";

export default defineType({
  name: "material",
  title: "Material",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }),
    defineField({ name: "overview", title: "Overview", type: "text", rows: 4 }),
    defineField({
      name: "prosAndCons", title: "Pros and Cons", type: "object",
      fields: [
        { name: "pros", type: "array", title: "Pros", of: [{ type: "string" }] },
        { name: "cons", type: "array", title: "Cons", of: [{ type: "string" }] },
      ],
    }),
    defineField({ name: "maintenance", title: "Maintenance & Care", type: "text", rows: 4 }),
    defineField({
      name: "priceRange", title: "Price Range (per LF installed)", type: "object",
      fields: [
        { name: "low", type: "number", title: "Low ($)" },
        { name: "high", type: "number", title: "High ($)" },
      ],
    }),
    defineField({ name: "colorGallery", title: "Color/Pattern Gallery", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }, { name: "colorName", type: "string", title: "Color Name" }] }] }),
    defineField({ name: "bestFor", title: "Best For", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "gulfCoastNote", title: "Gulf Coast Suitability Note", type: "text", rows: 3 }),
    defineField({
      name: "comparisonData", title: "Comparison Data", type: "object",
      fields: [
        { name: "durability", type: "number", title: "Durability (1-10)", validation: (r) => r.min(1).max(10) },
        { name: "heatResistance", type: "number", title: "Heat Resistance (1-10)", validation: (r) => r.min(1).max(10) },
        { name: "stainResistance", type: "number", title: "Stain Resistance (1-10)", validation: (r) => r.min(1).max(10) },
        { name: "scratchResistance", type: "number", title: "Scratch Resistance (1-10)", validation: (r) => r.min(1).max(10) },
        { name: "maintenanceLevel", type: "string", title: "Maintenance Level", options: { list: ["Low", "Medium", "High"] } },
        { name: "sealingRequired", type: "boolean", title: "Sealing Required" },
        { name: "sealingFrequency", type: "string", title: "Sealing Frequency" },
        { name: "gulfCoastSuitability", type: "number", title: "Gulf Coast Suitability (1-10)", validation: (r) => r.min(1).max(10) },
        { name: "lifespan", type: "number", title: "Lifespan (years)" },
      ],
    }),
    defineField({ name: "faq", title: "FAQ", type: "array", of: [{ type: "object", fields: [{ name: "question", type: "string", title: "Question" }, { name: "answer", type: "text", title: "Answer" }] }] }),
  ],
  preview: {
    select: { title: "name", media: "heroImage" },
  },
});
