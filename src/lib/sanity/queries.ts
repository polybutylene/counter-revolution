// Homepage
export const homepageQuery = `*[_type == "homepage"][0]{
  heroHeadline,
  heroSubheadline,
  heroBeforeImage,
  heroAfterImage,
  ctaText,
  trustBarOverrides,
  "featuredProjects": featuredProjects[]->{
    _id, title, "slug": slug.current, heroImage,
    "materialType": materialType->{ name, "slug": slug.current },
    roomType, description, city
  }
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  phone, email, address, hours,
  socialLinks,
  trustBarStats,
  estimatorPricing
}`;

// Services
export const allServicesQuery = `*[_type == "service"] | order(orderRank){
  _id, name, "slug": slug.current, heroImage, headline, description
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  _id, name, "slug": slug.current, heroImage, headline, description,
  whatsIncluded, processSteps, materialRecommendations, pricing,
  "faq": faq[]{ question, answer },
  "projects": *[_type == "project" && references(^._id)]{
    _id, title, "slug": slug.current, heroImage,
    "materialType": materialType->{ name }, roomType
  }[0..5]
}`;

// Materials
export const allMaterialsQuery = `*[_type == "material"] | order(name){
  _id, name, "slug": slug.current, heroImage, overview,
  priceRange, comparisonData, bestFor
}`;

export const materialBySlugQuery = `*[_type == "material" && slug.current == $slug][0]{
  _id, name, "slug": slug.current, heroImage, overview,
  prosAndCons, maintenance, priceRange, colorGallery,
  bestFor, gulfCoastNote, comparisonData,
  "faq": faq[]{ question, answer }
}`;

export const materialsComparisonQuery = `*[_type == "material"]{
  _id, name, "slug": slug.current, heroImage, comparisonData, priceRange
}`;

// Portfolio
export const allProjectsQuery = `*[_type == "project"] | order(completionDate desc){
  _id, title, "slug": slug.current, heroImage,
  "materialType": materialType->{ name, "slug": slug.current },
  "serviceType": serviceType->{ name, "slug": slug.current },
  roomType, style, budgetRange, city
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, heroImage,
  beforeImage, afterImage, gallery,
  "materialType": materialType->{ name, "slug": slug.current },
  "serviceType": serviceType->{ name, "slug": slug.current },
  roomType, style, budgetRange,
  squareFootage, edgeProfile, description,
  customerTestimonial, completionDate, city,
  "relatedProjects": *[_type == "project" && slug.current != $slug && (
    materialType._ref == ^.materialType._ref || roomType == ^.roomType
  )][0..2]{
    _id, title, "slug": slug.current, heroImage,
    "materialType": materialType->{ name }, roomType
  }
}`;

// Blog
export const allBlogPostsQuery = `*[_type == "blogPost"] | order(publishDate desc){
  _id, title, "slug": slug.current, featuredImage, excerpt,
  category, publishDate,
  "author": author->{ name, photo },
  "estimatedReadTime": round(length(pt::text(body)) / 5 / 200)
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, featuredImage, excerpt,
  body, category, publishDate, seoTitle, seoDescription,
  "author": author->{ _id, name, role, photo, bio },
  "estimatedReadTime": round(length(pt::text(body)) / 5 / 200),
  "relatedPosts": relatedPosts[]->{
    _id, title, "slug": slug.current, featuredImage, excerpt,
    category, publishDate
  }
}`;

// Testimonials
export const allTestimonialsQuery = `*[_type == "testimonial"] | order(date desc){
  _id, name, quote, rating, projectType, date, city
}`;

export const recentTestimonialsQuery = `*[_type == "testimonial"] | order(date desc)[0..7]{
  _id, name, quote, rating, projectType, date, city
}`;

// Service Areas
export const allServiceAreasQuery = `*[_type == "serviceArea"] | order(cityName){
  _id, cityName, "slug": slug.current
}`;

export const serviceAreaBySlugQuery = `*[_type == "serviceArea" && slug.current == $slug][0]{
  _id, cityName, "slug": slug.current, intro, neighborhoods,
  landmarks, content, mapCenter,
  "projects": *[_type == "project" && city == ^.cityName]{
    _id, title, "slug": slug.current, heroImage,
    "materialType": materialType->{ name }, roomType
  }[0..5],
  "testimonials": *[_type == "testimonial" && city == ^.cityName]{
    _id, name, quote, rating, projectType
  }[0..3]
}`;

// Team
export const allTeamMembersQuery = `*[_type == "teamMember"] | order(orderRank){
  _id, name, role, photo, bio
}`;

// Recent blog posts (for homepage)
export const recentBlogPostsQuery = `*[_type == "blogPost"] | order(publishDate desc)[0..2]{
  _id, title, "slug": slug.current, featuredImage, excerpt,
  category, publishDate,
  "author": author->{ name }
}`;
