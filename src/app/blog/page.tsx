"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTABanner } from "@/components/shared/CTABanner";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const BLOG_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "buying-guide", label: "Buying Guide" },
  { id: "material-education", label: "Material Education" },
  { id: "design-inspiration", label: "Design Inspiration" },
  { id: "maintenance-care", label: "Maintenance & Care" },
  { id: "company-news", label: "Company News" },
] as const;

const PLACEHOLDER_POSTS = [
  {
    _id: "1",
    title: "Granite vs. Quartz: Which Is Right for Your Bay County Kitchen?",
    slug: "granite-vs-quartz",
    excerpt: "Both are excellent choices, but your lifestyle, budget, and kitchen habits should guide the decision. Here's an honest comparison.",
    category: "buying-guide",
    publishDate: "2026-02-01",
    author: { name: "Counter Revolution" },
  },
  {
    _id: "2",
    title: "How Much Do Countertops Cost in Northwest Florida?",
    slug: "countertop-cost-guide",
    excerpt: "A transparent look at what you should expect to pay for granite, quartz, marble, and quartzite countertops in the Bay County area.",
    category: "buying-guide",
    publishDate: "2026-01-25",
    author: { name: "Counter Revolution" },
  },
  {
    _id: "3",
    title: "How Gulf Coast Humidity Affects Your Countertop Choice",
    slug: "gulf-coast-humidity-countertops",
    excerpt: "Living on the Emerald Coast means extra considerations for stone selection. Salt air, moisture, and heat all play a role.",
    category: "material-education",
    publishDate: "2026-01-18",
    author: { name: "Counter Revolution" },
  },
  {
    _id: "4",
    title: "5 Kitchen Countertop Trends for 2026",
    slug: "kitchen-countertop-trends-2026",
    excerpt: "From bold veining to warm neutrals, discover the styles that are shaping Bay County kitchens this year.",
    category: "design-inspiration",
    publishDate: "2026-01-12",
    author: { name: "Counter Revolution" },
  },
  {
    _id: "5",
    title: "How to Clean and Maintain Quartz Countertops",
    slug: "quartz-maintenance-guide",
    excerpt: "Quartz is low-maintenance, but a few simple habits will keep yours looking new for years. Here's the complete guide.",
    category: "maintenance-care",
    publishDate: "2026-01-08",
    author: { name: "Counter Revolution" },
  },
  {
    _id: "6",
    title: "Our New Showroom Opens in Panama City",
    slug: "new-showroom-panama-city",
    excerpt: "We're excited to announce our expanded showroom with more slabs, design consultation, and the same friendly local service you know.",
    category: "company-news",
    publishDate: "2026-01-05",
    author: { name: "Counter Revolution" },
  },
  {
    _id: "7",
    title: "Marble vs. Quartzite: Understanding the Difference",
    slug: "marble-vs-quartzite",
    excerpt: "Both offer stunning natural beauty, but they perform very differently. Learn which is right for your Florida home.",
    category: "material-education",
    publishDate: "2025-12-28",
    author: { name: "Counter Revolution" },
  },
  {
    _id: "8",
    title: "Small Kitchen Countertop Ideas That Maximize Space",
    slug: "small-kitchen-countertop-ideas",
    excerpt: "Don't let a compact kitchen limit your style. These design tips help you get the most from every square inch.",
    category: "design-inspiration",
    publishDate: "2025-12-20",
    author: { name: "Counter Revolution" },
  },
];

function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return PLACEHOLDER_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading
          label="Blog"
          title="Countertop Guides & Inspiration"
          description="Expert advice to help you make confident decisions about your countertop project."
        />

        {/* Category Tabs */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex gap-2 border-b border-warm-medium pb-4">
            {BLOG_CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "gold" : "ghost"}
                size="sm"
                className={cn(
                  "shrink-0",
                  selectedCategory === cat.id && "font-bold"
                )}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mt-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Post Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <AnimateInView key={post._id} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-xl border border-warm-medium bg-white transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-warm-light">
                    <div className="flex h-full items-center justify-center">
                      <span className="font-heading text-4xl font-bold text-navy/10">
                        CR
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {formatCategoryLabel(post.category)}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading text-base font-semibold text-navy line-clamp-2 group-hover:text-gold">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-gold">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </AnimateInView>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No posts found. Try a different category or search term.
            </p>
          )}
        </div>
      </div>

      <CTABanner
        headline="Ready to Start Your Project?"
        description="Get a free estimate and see why Bay County trusts Counter Revolution."
        primaryCTA={{ label: "Get Your Free Estimate", href: "/estimate" }}
      />
    </>
  );
}
