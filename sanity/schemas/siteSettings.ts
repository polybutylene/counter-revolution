import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
    defineField({ name: "hours", title: "Business Hours", type: "string" }),
    defineField({
      name: "socialLinks", title: "Social Links", type: "object",
      fields: [
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "google", type: "url", title: "Google Business Profile" },
        { name: "youtube", type: "url", title: "YouTube" },
      ],
    }),
    defineField({
      name: "trustBarStats", title: "Trust Bar Stats", type: "object",
      fields: [
        { name: "googleRating", type: "number", title: "Google Rating" },
        { name: "reviewCount", type: "number", title: "Review Count" },
        { name: "projectsCompleted", type: "number", title: "Projects Completed" },
        { name: "turnaroundDays", type: "string", title: "Turnaround Days" },
      ],
    }),
    defineField({
      name: "estimatorPricing", title: "Estimator Pricing Config", type: "object",
      fields: [
        {
          name: "materials", type: "array", title: "Material Pricing",
          of: [{
            type: "object",
            fields: [
              { name: "key", type: "string", title: "Material Key (e.g. granite)" },
              { name: "low", type: "number", title: "Low $/LF" },
              { name: "high", type: "number", title: "High $/LF" },
            ],
          }],
        },
        {
          name: "sinkCutout", type: "object", title: "Sink Cutout",
          fields: [{ name: "low", type: "number" }, { name: "high", type: "number" }],
        },
        {
          name: "cooktopCutout", type: "object", title: "Cooktop Cutout",
          fields: [{ name: "low", type: "number" }, { name: "high", type: "number" }],
        },
        {
          name: "edgeProfiles", type: "array", title: "Edge Profile Adders",
          of: [{
            type: "object",
            fields: [
              { name: "key", type: "string", title: "Profile Key" },
              { name: "adderPerLF", type: "number", title: "Adder $/LF" },
            ],
          }],
        },
        {
          name: "backsplash", type: "object", title: "Backsplash",
          fields: [
            { name: "fourInch", type: "number", title: "4 inch $/LF" },
            { name: "fullHeight", type: "number", title: "Full Height $/LF" },
          ],
        },
        {
          name: "islandSizes", type: "array", title: "Island Sizes",
          of: [{
            type: "object",
            fields: [
              { name: "key", type: "string", title: "Size Key" },
              { name: "additionalLF", type: "number", title: "Additional Linear Feet" },
            ],
          }],
        },
        {
          name: "removalFlat", type: "object", title: "Old Countertop Removal",
          fields: [{ name: "low", type: "number" }, { name: "high", type: "number" }],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
