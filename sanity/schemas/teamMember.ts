import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({ name: "orderRank", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
