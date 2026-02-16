import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: "projectType", title: "Project Type", type: "string" }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "city", title: "City", type: "string" }),
  ],
  preview: {
    select: { title: "name", subtitle: "quote" },
  },
});
