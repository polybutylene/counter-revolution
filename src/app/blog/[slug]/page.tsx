import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/shared/CTABanner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Facebook, Twitter, Linkedin, Bookmark } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug, getRelatedPosts } from "@/data/blog/posts";
import { getBlogContent } from "@/data/blog/content";

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
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const content = getBlogContent(params.slug);
  const relatedPosts = getRelatedPosts(params.slug, 3);

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

            {/* Article Body */}
            {content ? (
              <div
                className="prose prose-lg mt-10 max-w-none font-body prose-headings:font-heading prose-headings:text-navy prose-p:text-dark prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-dark prose-li:text-dark"
                dangerouslySetInnerHTML={{ __html: content.html }}
              />
            ) : (
              <div className="prose prose-lg mt-10 max-w-none font-body">
                <p className="text-dark">
                  This article is coming soon. Check back shortly for the full
                  content.
                </p>
              </div>
            )}

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
          {content && content.toc.length > 0 && (
            <aside className="mt-12 lg:mt-0">
              <nav
                className="sticky top-24 rounded-xl border border-warm-medium bg-warm-light p-5"
                aria-label="Table of contents"
              >
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
                  On this page
                </h3>
                <ul className="mt-4 space-y-2">
                  {content.toc.map((item) => (
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
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-warm-medium pt-12">
            <h2 className="font-heading text-2xl font-bold text-navy">
              Related Posts
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
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
        )}

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
