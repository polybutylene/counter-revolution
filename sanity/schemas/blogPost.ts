import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }] }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (r) => r.max(300) }),
    defineField({
      name: "body", title: "Body", type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt Text" }, { name: "caption", type: "string", title: "Caption" }] },
      ],
    }),
    defineField({
      name: "category", title: "Category", type: "string",
      options: {
        list: [
          { title: "Buying Guide", value: "buying-guide" },
          { title: "Material Education", value: "material-education" },
          { title: "Design Inspiration", value: "design-inspiration" },
          { title: "Maintenance & Care", value: "maintenance-care" },
          { title: "Company News", value: "company-news" },
        ],
      },
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "teamMember" }] }),
    defineField({ name: "publishDate", title: "Publish Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "relatedPosts", title: "Related Posts", type: "array", of: [{ type: "reference", to: [{ type: "blogPost" }] }] }),
    defineField({ name: "seoTitle", title: "SEO Title Override", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description Override", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "title", media: "featuredImage", subtitle: "category" },
  },
  orderings: [
    { title: "Publish Date (Newest)", name: "publishDateDesc", by: [{ field: "publishDate", direction: "desc" }] },
  ],
});
