import { defineType, defineField } from "sanity";

export default defineType({
  name: "serviceArea",
  title: "Service Area",
  type: "document",
  fields: [
    defineField({ name: "cityName", title: "City Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "cityName", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 4 }),
    defineField({ name: "neighborhoods", title: "Neighborhoods", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "landmarks", title: "Landmarks", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "content", title: "Page Content", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "mapCenter", title: "Map Center", type: "object",
      fields: [
        { name: "lat", type: "number", title: "Latitude" },
        { name: "lng", type: "number", title: "Longitude" },
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "cityName" },
  },
});
