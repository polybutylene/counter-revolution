import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateInView } from "@/components/shared/AnimateInView";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog/posts";

interface BlogPreviewPost {
  _id: string;
  title: string;
  slug: string;
  featuredImage?: string;
  excerpt: string;
  category: string;
  publishDate: string;
  author?: { name: string };
}

interface BlogPreviewProps {
  posts?: BlogPreviewPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const displayPosts = posts && posts.length > 0 ? posts : BLOG_POSTS;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="From Our Blog"
          title="Countertop Guides & Inspiration"
          description="Expert advice to help you make confident decisions about your countertop project."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayPosts.slice(0, 3).map((post, i) => (
            <AnimateInView key={post._id} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-xl border border-warm-medium bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-warm-light">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-heading text-4xl font-bold text-navy/10">CR</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {post.category.replace("-", " ")}
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
                  <h3 className="mt-3 font-heading text-base font-semibold text-navy group-hover:text-gold line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </AnimateInView>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-navy hover:text-gold"
          >
            Visit Our Blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
