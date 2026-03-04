export interface BlogPostMeta {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  serviceTag?: string;
  publishDate: string;
  author: { name: string };
  estimatedReadTime: number;
  featuredImage?: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  // --- TILE ---
  {
    _id: "33",
    title: "Subway Tile Layouts: 6 Patterns Beyond the Basic Stack",
    slug: "subway-tile-layouts",
    excerpt:
      "Subway tile doesn't have to be boring. From herringbone to vertical stack to basketweave — here are six layout patterns that elevate the humble subway tile.",
    category: "design-inspiration",
    serviceTag: "tile",
    publishDate: "2026-02-19",
    author: { name: "Stratum Co." },
    estimatedReadTime: 8,
  },
  {
    _id: "32",
    title: "Porcelain vs. Ceramic: What's the Real Difference?",
    slug: "porcelain-vs-ceramic",
    excerpt:
      "They look similar, they feel similar, but the differences matter. Here's an honest breakdown of porcelain vs. ceramic tile — and when each one is the right choice.",
    category: "material-education",
    serviceTag: "tile",
    publishDate: "2026-02-18",
    author: { name: "Stratum Co." },
    estimatedReadTime: 7,
  },
  {
    _id: "31",
    title: "How Much Does a Tile Backsplash Cost?",
    slug: "tile-backsplash-cost",
    excerpt:
      "A detailed cost breakdown for tile backsplash projects in Bay County — from budget-friendly ceramic to premium natural stone mosaics.",
    category: "cost-guide",
    serviceTag: "tile",
    publishDate: "2026-02-17",
    author: { name: "Stratum Co." },
    estimatedReadTime: 8,
  },
  // --- COATING ---
  {
    _id: "30",
    title: "Interior Paint Finishes Explained: Flat to High Gloss",
    slug: "interior-paint-finishes-guide",
    excerpt:
      "Flat, eggshell, satin, semi-gloss, high gloss — each finish has its place. Here's when to use each one and why it matters more than you think.",
    category: "material-education",
    serviceTag: "coating",
    publishDate: "2026-02-16",
    author: { name: "Stratum Co." },
    estimatedReadTime: 7,
  },
  {
    _id: "29",
    title: "How Much Does It Cost to Paint a House Interior?",
    slug: "interior-painting-cost-guide",
    excerpt:
      "Real numbers for interior painting projects in Bay County — broken down by room count, paint grade, and prep work. No surprises.",
    category: "cost-guide",
    serviceTag: "coating",
    publishDate: "2026-02-15",
    author: { name: "Stratum Co." },
    estimatedReadTime: 9,
  },
  {
    _id: "28",
    title: "10 Paint Colors That Sell Homes Faster",
    slug: "paint-colors-that-sell-homes",
    excerpt:
      "Based on real estate data and buyer preferences — the paint colors that consistently help homes sell faster and for more money.",
    category: "design-inspiration",
    serviceTag: "coating",
    publishDate: "2026-02-14",
    author: { name: "Stratum Co." },
    estimatedReadTime: 6,
  },
  // --- FLOORING ---
  {
    _id: "27",
    title: "LVP vs. Hardwood: The Honest Comparison",
    slug: "lvp-vs-hardwood",
    excerpt:
      "Luxury vinyl plank vs. real hardwood — we break down cost, durability, moisture resistance, and aesthetics so you can make the right call for your home.",
    category: "buying-guide",
    serviceTag: "flooring",
    publishDate: "2026-02-13",
    author: { name: "Stratum Co." },
    estimatedReadTime: 10,
  },
  {
    _id: "26",
    title: "How Much Does New Flooring Cost Per Room?",
    slug: "flooring-cost-per-room",
    excerpt:
      "Room-by-room cost guide for every flooring type — LVP, hardwood, laminate, tile, and epoxy — with Bay County pricing.",
    category: "cost-guide",
    serviceTag: "flooring",
    publishDate: "2026-02-12",
    author: { name: "Stratum Co." },
    estimatedReadTime: 8,
  },
  {
    _id: "25",
    title: "Best Flooring Options for Florida Homes",
    slug: "best-flooring-florida-homes",
    excerpt:
      "Florida's humidity, heat, and sandy foot traffic demand specific flooring. Here's what actually performs — and what to avoid.",
    category: "buying-guide",
    serviceTag: "flooring",
    publishDate: "2026-02-11",
    author: { name: "Stratum Co." },
    estimatedReadTime: 9,
  },
  // --- EXISTING STONE POSTS (rebranded) ---
  {
    _id: "21",
    title: "2026 Countertop Trends: What's Hot in Kitchen Design Right Now",
    slug: "2026-countertop-trends",
    excerpt:
      "From warm tones and matte finishes to dramatic veining and full-height backsplashes — these are the trends shaping Bay County kitchens in 2026.",
    category: "design-inspiration",
    serviceTag: "stone",
    publishDate: "2026-02-10",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-02-09",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-02-08",
    author: { name: "Stratum Co." },
    estimatedReadTime: 10,
  },
  {
    _id: "18",
    title: "Kitchen Island Countertop Ideas: Making Your Island the Centerpiece",
    slug: "kitchen-island-countertop-ideas",
    excerpt:
      "Your island is the most used and most visible surface in your home. Here's how to make it a statement piece with the right countertop design.",
    category: "design-inspiration",
    serviceTag: "stone",
    publishDate: "2026-02-07",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-02-06",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-02-05",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-02-04",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-02-03",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-02-02",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-02-01",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-01-31",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-01-28",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-01-25",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-01-22",
    author: { name: "Stratum Co." },
    estimatedReadTime: 12,
  },
  {
    _id: "7",
    title: "The Complete Guide to Choosing a Countertop Edge Profile",
    slug: "countertop-edge-profile-guide",
    excerpt:
      "The edge profile you choose affects how your countertops look and feel every single day. Here's every option explained with costs and style recommendations.",
    category: "buying-guide",
    serviceTag: "stone",
    publishDate: "2026-01-19",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-01-15",
    author: { name: "Stratum Co." },
    estimatedReadTime: 10,
  },
  {
    _id: "5",
    title: "Granite vs. Quartz: Which Is Right for Your Bay County Kitchen?",
    slug: "granite-vs-quartz",
    excerpt:
      "The countertop debate that launches a thousand Google searches. Here's an honest, no-sales-pitch breakdown of both materials for Northwest Florida homeowners.",
    category: "material-education",
    serviceTag: "stone",
    publishDate: "2026-01-12",
    author: { name: "Stratum Co." },
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
    serviceTag: "stone",
    publishDate: "2026-01-08",
    author: { name: "Stratum Co." },
    estimatedReadTime: 12,
  },
  {
    _id: "3",
    title:
      "How Much Do Countertops Cost in Northwest Florida? (2026 Pricing Guide)",
    slug: "countertop-cost-guide-nwfl",
    excerpt:
      "The most honest, detailed countertop pricing guide you'll find for Bay County and Northwest Florida in 2026 — with real numbers and real project examples.",
    category: "cost-guide",
    serviceTag: "stone",
    publishDate: "2026-01-05",
    author: { name: "Stratum Co." },
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
    author: { name: "Stratum Co." },
    estimatedReadTime: 10,
  },
  {
    _id: "1",
    title:
      "New Ownership, Same Commitment: The Next Chapter for Stratum Co.",
    slug: "new-ownership-next-chapter",
    excerpt:
      "Stratum Co. has new ownership. We're not here to change everything — we're here to build on what's already good and raise the bar on everything else.",
    category: "company-news",
    publishDate: "2025-12-15",
    author: { name: "Stratum Co." },
    estimatedReadTime: 8,
  },
];

export const BLOG_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Buying Guide", value: "buying-guide" },
  { label: "Material Education", value: "material-education" },
  { label: "Cost Guide", value: "cost-guide" },
  { label: "Design Inspiration", value: "design-inspiration" },
  { label: "Maintenance", value: "maintenance-care" },
  { label: "Company News", value: "company-news" },
] as const;

export const BLOG_SERVICE_FILTERS = [
  { label: "All Services", value: "all" },
  { label: "Stone", value: "stone" },
  { label: "Tile", value: "tile" },
  { label: "Coating", value: "coating" },
  { label: "Flooring", value: "flooring" },
] as const;

export function getBlogPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPostMeta[] {
  if (category === "all") return BLOG_POSTS;
  return BLOG_POSTS.filter((post) => post.category === category);
}

export function getBlogPostsByService(service: string): BlogPostMeta[] {
  if (service === "all") return BLOG_POSTS;
  return BLOG_POSTS.filter((post) => post.serviceTag === service);
}

export function getBlogPostsFiltered(
  category: string,
  service: string
): BlogPostMeta[] {
  return BLOG_POSTS.filter((post) => {
    const matchCategory = category === "all" || post.category === category;
    const matchService = service === "all" || post.serviceTag === service;
    return matchCategory && matchService;
  });
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
