export interface BlogPostMeta {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishDate: string;
  author: { name: string };
  estimatedReadTime: number;
  featuredImage?: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    _id: "21",
    title: "2026 Countertop Trends: What's Hot in Kitchen Design Right Now",
    slug: "2026-countertop-trends",
    excerpt:
      "From warm tones and matte finishes to dramatic veining and full-height backsplashes — these are the trends shaping Bay County kitchens in 2026.",
    category: "design-inspiration",
    publishDate: "2026-02-15",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "20",
    title:
      "Bathroom Vanity Countertops: From Basic Builder-Grade to Spa-Level Luxury",
    slug: "bathroom-vanity-countertops",
    excerpt:
      "Upgrading your bathroom countertop is one of the most affordable ways to use premium natural stone in your home. Here's what's possible.",
    category: "design-inspiration",
    publishDate: "2026-02-14",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "19",
    title:
      "Small Kitchen, Big Impact: Countertop Upgrades That Transform Tight Spaces",
    slug: "small-kitchen-big-impact",
    excerpt:
      "A small kitchen isn't a limitation — it's your biggest advantage. Less square footage means your budget stretches further into premium materials.",
    category: "design-inspiration",
    publishDate: "2026-02-13",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "18",
    title: "Kitchen Island Countertop Ideas: Making Your Island the Centerpiece",
    slug: "kitchen-island-countertop-ideas",
    excerpt:
      "Your island is the most used and most visible surface in your home. Here's how to make it a statement piece with the right countertop design.",
    category: "design-inspiration",
    publishDate: "2026-02-12",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "17",
    title:
      "Coastal Kitchen Design: Countertop Ideas That Fit the Bay County Lifestyle",
    slug: "coastal-kitchen-design",
    excerpt:
      "Five countertop design directions that capture the Gulf Coast aesthetic — from bright coastal modern to warm organic to classic beach house.",
    category: "design-inspiration",
    publishDate: "2026-02-11",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "16",
    title:
      "Preparing Your Kitchen for Countertop Installation Day: A Homeowner Checklist",
    slug: "preparing-for-installation-day",
    excerpt:
      "A step-by-step checklist covering everything from one week before installation to what happens after the crew leaves.",
    category: "maintenance-care",
    publishDate: "2026-02-10",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 12,
  },
  {
    _id: "15",
    title:
      "Help! I Stained My Countertop: A Material-by-Material Stain Removal Guide",
    slug: "countertop-stain-removal-guide",
    excerpt:
      "Most countertop stains are completely removable. The key is knowing what type of stain you're dealing with and which removal method matches your material.",
    category: "maintenance-care",
    publishDate: "2026-02-09",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 12,
  },
  {
    _id: "14",
    title:
      "How to Seal Granite Countertops: A Bay County Homeowner's Step-by-Step Guide",
    slug: "how-to-seal-granite",
    excerpt:
      "Most sealing advice doesn't account for humidity. This guide is calibrated specifically for Gulf Coast climate, humidity levels, and real-world Bay County conditions.",
    category: "maintenance-care",
    publishDate: "2026-02-07",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 12,
  },
  {
    _id: "13",
    title:
      "Countertop Maintenance 101: How to Keep Your Investment Looking Brand New",
    slug: "countertop-maintenance-101",
    excerpt:
      "A complete care guide for granite, quartz, marble, and quartzite countertops — the same guide we share with every customer after installation.",
    category: "maintenance-care",
    publishDate: "2026-02-05",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "12",
    title:
      "How Gulf Coast Humidity Affects Your Countertop — And What to Do About It",
    slug: "gulf-coast-humidity-countertops",
    excerpt:
      "Bay County averages 60–80% humidity year-round. Here's how that affects granite, quartz, marble, and quartzite — and a maintenance calendar built for our climate.",
    category: "material-education",
    publishDate: "2026-02-03",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 12,
  },
  {
    _id: "11",
    title:
      "Outdoor Kitchen Countertops: What Materials Survive Florida Summers?",
    slug: "outdoor-kitchen-countertops",
    excerpt:
      "The same climate that makes outdoor living irresistible is brutally hard on the wrong countertop material. Here's what actually holds up — and the one material to absolutely avoid.",
    category: "material-education",
    publishDate: "2026-01-31",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 14,
  },
  {
    _id: "10",
    title:
      "Marble Countertops: Beautiful, But Are They Worth the Maintenance?",
    slug: "marble-countertops-maintenance",
    excerpt:
      "Nothing else looks quite like real marble. But marble demands more from you than almost any other countertop material. Here's the honest truth.",
    category: "material-education",
    publishDate: "2026-01-28",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "9",
    title:
      "Why Quartz Is Dominating Kitchen Remodels in 2026 (And Whether It's Right for You)",
    slug: "why-quartz-dominates-2026",
    excerpt:
      "Quartz has overtaken granite as the most popular countertop material in America. Here's everything you need to decide if it's right for your kitchen.",
    category: "material-education",
    publishDate: "2026-01-25",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 12,
  },
  {
    _id: "8",
    title:
      "Quartzite Countertops: The Premium Natural Stone Most Homeowners Don't Know About",
    slug: "quartzite-countertops-guide",
    excerpt:
      "If you love the look of marble but need a countertop that can handle real life, quartzite might be the material you've been searching for without knowing it.",
    category: "material-education",
    publishDate: "2026-01-22",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 12,
  },
  {
    _id: "7",
    title: "The Complete Guide to Choosing a Countertop Edge Profile",
    slug: "countertop-edge-profile-guide",
    excerpt:
      "The edge profile you choose affects how your countertops look and feel every single day. Here's every option explained with costs and style recommendations.",
    category: "buying-guide",
    publishDate: "2026-01-19",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "6",
    title:
      "Should You Replace Countertops Before Selling Your Bay County Home?",
    slug: "replace-countertops-before-selling",
    excerpt:
      "With 67% of Bay County homes selling under asking price, a strategic countertop upgrade could change the math in your favor.",
    category: "buying-guide",
    publishDate: "2026-01-15",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "5",
    title: "Granite vs. Quartz: Which Is Right for Your Bay County Kitchen?",
    slug: "granite-vs-quartz",
    excerpt:
      "The countertop debate that launches a thousand Google searches. Here's an honest, no-sales-pitch breakdown of both materials for Northwest Florida homeowners.",
    category: "material-education",
    publishDate: "2026-01-12",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 14,
  },
  {
    _id: "4",
    title:
      "5 Things Every Homeowner Should Know Before Replacing Countertops",
    slug: "five-things-before-replacing-countertops",
    excerpt:
      "Most homeowners only replace countertops once or twice in their lifetime. Here are the five things that separate a project you love from one you regret.",
    category: "buying-guide",
    publishDate: "2026-01-08",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 12,
  },
  {
    _id: "3",
    title:
      "How Much Do Countertops Cost in Northwest Florida? (2026 Pricing Guide)",
    slug: "countertop-cost-guide-nwfl",
    excerpt:
      "The most honest, detailed countertop pricing guide you'll find for Bay County and Northwest Florida in 2026 — with real numbers and real project examples.",
    category: "buying-guide",
    publishDate: "2026-01-05",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "2",
    title:
      "Our Mission: Why Transparency Is at the Heart of Everything We Do",
    slug: "our-mission-transparency",
    excerpt:
      "The home services industry has a trust problem. Here's how we're fixing it — with real pricing on the website, itemized quotes, and a project tracker that keeps you informed.",
    category: "company-news",
    publishDate: "2025-12-22",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 10,
  },
  {
    _id: "1",
    title:
      "New Ownership, Same Commitment: The Next Chapter for Countertop Revolution",
    slug: "new-ownership-next-chapter",
    excerpt:
      "Countertop Revolution has new owners. We're not here to change everything — we're here to build on what's already good and raise the bar on everything else.",
    category: "company-news",
    publishDate: "2025-12-15",
    author: { name: "Countertop Revolution" },
    estimatedReadTime: 8,
  },
];

export function getBlogPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPostMeta[] {
  if (category === "all") return BLOG_POSTS;
  return BLOG_POSTS.filter((post) => post.category === category);
}

export function getRelatedPosts(
  currentSlug: string,
  limit = 3
): BlogPostMeta[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, limit);

  const sameCategory = BLOG_POSTS.filter(
    (p) => p.category === current.category && p.slug !== currentSlug
  );

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const others = BLOG_POSTS.filter(
    (p) => p.category !== current.category && p.slug !== currentSlug
  );
  return [...sameCategory, ...others].slice(0, limit);
}
