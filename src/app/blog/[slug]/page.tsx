import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/shared/CTABanner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Bookmark,
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog/posts";
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
      {/* Breadcrumbs & Back Link */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Breadcrumbs />
          <Link
            href="/blog"
            className="group hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold sm:flex"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All articles
          </Link>
        </div>
      </div>

      {/* Hero Header — full-width warm band */}
      <header className="mt-4 border-y border-warm-medium bg-warm-light">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
          {/* Category & Read Time */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="border border-gold/20 bg-gold/10 capitalize text-gold-dark"
            >
              {formatCategoryLabel(post.category)}
            </Badge>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {post.estimatedReadTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-5 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-dark/70">
            {post.excerpt}
          </p>

          {/* Author & Date Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-warm-medium pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-white">
                CR
              </div>
              <div>
                <span className="block text-sm font-semibold text-dark">
                  {post.author.name}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body + TOC Sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
          <article className="mx-auto w-full max-w-3xl lg:mx-0">
            {/* Article Body */}
            {content ? (
              <div
                className="blog-article prose prose-lg font-body"
                dangerouslySetInnerHTML={{ __html: content.html }}
              />
            ) : (
              <div className="prose prose-lg font-body">
                <p className="text-dark">
                  This article is coming soon. Check back shortly for the full
                  content.
                </p>
              </div>
            )}

            {/* Social Sharing */}
            <div className="mt-14 rounded-xl border border-warm-medium bg-warm-light p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-navy">
                  <Share2 className="h-4 w-4" />
                  Found this helpful? Share it.
                </span>
                <div className="flex gap-2">
                  {[
                    { icon: Facebook, label: "Share on Facebook" },
                    { icon: Twitter, label: "Share on Twitter" },
                    { icon: Linkedin, label: "Share on LinkedIn" },
                    { icon: Bookmark, label: "Bookmark" },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-medium bg-white text-muted-foreground transition-all hover:border-gold hover:text-gold hover:shadow-sm"
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Table of Contents Sidebar */}
          {content && content.toc.length > 0 && (
            <aside className="mt-12 lg:mt-0">
              <nav
                className="sticky top-24 rounded-xl border border-warm-medium bg-white p-6 shadow-sm"
                aria-label="Table of contents"
              >
                <h3 className="flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-widest text-gold">
                  <span className="inline-block h-px w-4 bg-gold" />
                  In this article
                </h3>
                <ol className="mt-5 space-y-1">
                  {content.toc.map((item, idx) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex items-start gap-3 rounded-lg px-2 py-2 text-sm leading-snug text-dark/70 transition-all hover:bg-warm-light hover:text-navy"
                      >
                        <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-warm-light font-heading text-[10px] font-bold text-gold transition-colors group-hover:bg-gold/10">
                          {idx + 1}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-warm-medium bg-warm-light/50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold text-navy">
                Keep Reading
              </h2>
              <Link
                href="/blog"
                className="hidden items-center gap-1 text-sm font-semibold text-gold transition-colors hover:text-gold-dark sm:flex"
              >
                View all articles
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related._id} href={`/blog/${related.slug}`}>
                  <Card className="group h-full overflow-hidden border-warm-medium transition-all hover:border-gold/30 hover:shadow-md">
                    <div className="aspect-[16/9] bg-warm-light">
                      <div className="flex h-full items-center justify-center">
                        <span className="font-heading text-3xl font-bold text-navy/10 transition-colors group-hover:text-navy/20">
                          CR
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <Badge
                        variant="secondary"
                        className="border border-gold/20 bg-gold/10 text-xs capitalize text-gold-dark"
                      >
                        {formatCategoryLabel(related.category)}
                      </Badge>
                      <h3 className="mt-3 font-heading text-base font-semibold leading-snug text-navy line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {related.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Author Bio */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Card className="border-warm-medium">
          <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-xl font-bold text-white">
              CR
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                About the author
              </p>
              <h3 className="mt-1 font-heading text-lg font-semibold text-navy">
                {post.author.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Bay County&apos;s trusted countertop experts. We help homeowners
                choose, fabricate, and install premium granite, quartz, marble,
                and quartzite countertops throughout the Emerald Coast.
              </p>
            </div>
          </CardContent>
        </Card>
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
