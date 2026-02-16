import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/shared/CTABanner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Facebook, Twitter, Linkedin, Bookmark } from "lucide-react";

const BLOG_SLUGS = [
  "granite-vs-quartz",
  "countertop-cost-guide",
  "gulf-coast-humidity-countertops",
  "kitchen-countertop-trends-2026",
  "quartz-maintenance-guide",
  "new-showroom-panama-city",
  "marble-vs-quartzite",
  "small-kitchen-countertop-ideas",
];

const PLACEHOLDER_POST = {
  _id: "1",
  title: "Granite vs. Quartz: Which Is Right for Your Bay County Kitchen?",
  slug: "granite-vs-quartz",
  excerpt:
    "Both are excellent choices, but your lifestyle, budget, and kitchen habits should guide the decision.",
  category: "buying-guide",
  publishDate: "2026-02-01",
  author: { name: "Countertop Revolution" },
  estimatedReadTime: 6,
};

const TOC_ITEMS = [
  { id: "intro", label: "Introduction" },
  { id: "granite-overview", label: "Granite Overview" },
  { id: "quartz-overview", label: "Quartz Overview" },
  { id: "comparison", label: "Side-by-Side Comparison" },
  { id: "bay-county", label: "Considerations for Bay County" },
  { id: "conclusion", label: "Conclusion" },
];

const RELATED_POSTS = [
  {
    _id: "2",
    title: "How Much Do Countertops Cost in Northwest Florida?",
    slug: "countertop-cost-guide",
    category: "buying-guide",
  },
  {
    _id: "3",
    title: "How Gulf Coast Humidity Affects Your Countertop Choice",
    slug: "gulf-coast-humidity-countertops",
    category: "material-education",
  },
  {
    _id: "7",
    title: "Marble vs. Quartzite: Understanding the Difference",
    slug: "marble-vs-quartzite",
    category: "material-education",
  },
];

function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  return {
    title: PLACEHOLDER_POST.title,
    description: PLACEHOLDER_POST.excerpt,
  };
}

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  if (!BLOG_SLUGS.includes(params.slug)) notFound();

  const post = { ...PLACEHOLDER_POST, slug: params.slug };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      {/* Featured Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-warm-light">
        <div className="flex h-full items-center justify-center">
          <span className="font-heading text-6xl font-bold text-navy/10">
            CR
          </span>
        </div>
      </div>

      {/* Article Header & Body with TOC */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
          <article>
            {/* Article Header */}
            <header>
              <h1 className="font-heading text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-warm-medium" />
                  <span className="font-body text-sm font-medium text-dark">
                    {post.author.name}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Badge variant="secondary" className="capitalize">
                  {formatCategoryLabel(post.category)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {post.estimatedReadTime} min read
                </span>
              </div>
            </header>

            {/* Article Body - Placeholder Rich Text */}
            <div className="prose prose-lg mt-10 max-w-none font-body">
              <h2 id="intro" className="font-heading text-2xl font-bold text-navy">
                Introduction
              </h2>
              <p className="mt-3 text-dark">
                Choosing between granite and quartz is one of the most common
                decisions homeowners face when remodeling their kitchen. Both
                materials offer durability, beauty, and a wide range of colors
                and patterns. In this guide, we&apos;ll break down the key
                differences so you can make an informed choice for your Bay
                County home.
              </p>

              <h2
                id="granite-overview"
                className="mt-10 font-heading text-2xl font-bold text-navy"
              >
                Granite Overview
              </h2>
              <p className="mt-3 text-dark">
                Granite is a natural stone quarried from the earth. Each slab
                is unique, with natural variations in color, veining, and pattern
                that create a one-of-a-kind look. Granite has been a top choice
                for decades because of its hardness, heat resistance, and
                timeless appeal.
              </p>

              <h2
                id="quartz-overview"
                className="mt-10 font-heading text-2xl font-bold text-navy"
              >
                Quartz Overview
              </h2>
              <p className="mt-3 text-dark">
                Quartz countertops are engineered stone—a blend of natural quartz
                crystals and resins. This process creates a non-porous surface
                that doesn&apos;t require sealing and is highly resistant to
                stains and bacteria. Quartz offers more consistent color and
                pattern than natural stone.
              </p>

              <h2
                id="comparison"
                className="mt-10 font-heading text-2xl font-bold text-navy"
              >
                Side-by-Side Comparison
              </h2>
              <p className="mt-3 text-dark">
                Here&apos;s a quick comparison to help you decide:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-dark">
                <li>
                  <strong>Maintenance:</strong> Quartz requires no sealing;
                  granite benefits from annual sealing.
                </li>
                <li>
                  <strong>Heat resistance:</strong> Granite handles hot pans
                  better; quartz can be damaged by extreme heat.
                </li>
                <li>
                  <strong>Stain resistance:</strong> Quartz is non-porous;
                  granite is porous but sealable.
                </li>
                <li>
                  <strong>Appearance:</strong> Granite offers natural variation;
                  quartz offers consistency and designer colors.
                </li>
                <li>
                  <strong>Cost:</strong> Both are in a similar price range; your
                  specific slab choice will drive the final price.
                </li>
              </ul>

              <h2
                id="bay-county"
                className="mt-10 font-heading text-2xl font-bold text-navy"
              >
                Considerations for Bay County
              </h2>
              <p className="mt-3 text-dark">
                Living on the Gulf Coast brings humidity, salt air, and
                occasional storm exposure. Both granite and quartz perform well
                here. Quartz&apos;s non-porous nature can be an advantage in
                high-humidity areas, while granite&apos;s natural durability
                has proven itself in coastal homes for decades.
              </p>

              <h2
                id="conclusion"
                className="mt-10 font-heading text-2xl font-bold text-navy"
              >
                Conclusion
              </h2>
              <p className="mt-3 text-dark">
                There&apos;s no single &quot;right&quot; answer—your choice
                depends on your style preferences, maintenance tolerance, and
                how you use your kitchen. Visit our showroom to see both
                materials in person and get personalized recommendations for
                your project.
              </p>
            </div>

            {/* Social Sharing */}
            <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-warm-medium pt-8">
              <span className="flex items-center gap-2 text-sm font-semibold text-navy">
                <Share2 className="h-4 w-4" />
                Share this article
              </span>
              <div className="flex gap-2">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                  aria-label="Bookmark"
                >
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
            </div>
          </article>

          {/* Table of Contents Sidebar */}
          <aside className="mt-12 lg:mt-0">
            <nav
              className="sticky top-24 rounded-xl border border-warm-medium bg-warm-light p-5"
              aria-label="Table of contents"
            >
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
                On this page
              </h3>
              <ul className="mt-4 space-y-2">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-dark transition-colors hover:text-gold"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        {/* Related Posts */}
        <section className="mt-16 border-t border-warm-medium pt-12">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Related Posts
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED_POSTS.map((related) => (
              <Link key={related._id} href={`/blog/${related.slug}`}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                  <div className="aspect-[16/9] bg-warm-light">
                    <div className="flex h-full items-center justify-center">
                      <span className="font-heading text-3xl font-bold text-navy/10">
                        CR
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {formatCategoryLabel(related.category)}
                    </Badge>
                    <h3 className="mt-2 font-heading font-semibold text-navy line-clamp-2">
                      {related.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Author Bio */}
        <section className="mt-12">
          <Card>
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <div className="h-16 w-16 shrink-0 rounded-full bg-warm-medium" />
              <div>
                <h3 className="font-heading font-semibold text-navy">
                  {post.author.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Bay County&apos;s trusted countertop experts. We help
                  homeowners choose, fabricate, and install premium granite,
                  quartz, marble, and quartzite countertops throughout the
                  Emerald Coast.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <CTABanner
        headline="Ready to Start Your Project?"
        description="Get a free estimate and see why Bay County trusts Countertop Revolution."
        primaryCTA={{
          label: "Get a Free Estimate",
          href: "/estimate",
        }}
      />
    </>
  );
}
