import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroSubheadline", title: "Hero Subheadline", type: "string" }),
    defineField({ name: "heroBeforeImage", title: "Hero Before Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }),
    defineField({ name: "heroAfterImage", title: "Hero After Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }),
    defineField({ name: "featuredProjects", title: "Featured Projects", type: "array", of: [{ type: "reference", to: [{ type: "project" }] }], validation: (r) => r.max(6) }),
    defineField({ name: "ctaText", title: "CTA Text", type: "string" }),
    defineField({
      name: "trustBarOverrides", title: "Trust Bar Overrides", type: "object",
      fields: [
        { name: "googleRating", type: "number", title: "Google Rating Override" },
        { name: "reviewCount", type: "number", title: "Review Count Override" },
        { name: "projectsCompleted", type: "number", title: "Projects Completed Override" },
        { name: "turnaroundDays", type: "string", title: "Turnaround Days Override" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage Content" };
    },
  },
});
