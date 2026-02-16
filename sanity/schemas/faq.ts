import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "associatedService", title: "Associated Service", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "associatedMaterial", title: "Associated Material", type: "reference", to: [{ type: "material" }] }),
    defineField({ name: "orderRank", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "question" },
  },
});
