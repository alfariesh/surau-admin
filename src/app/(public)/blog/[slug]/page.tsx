import type {Metadata} from "next";

import {Chip} from "@heroui/react";
import Image from "next/image";
import {notFound} from "next/navigation";

import {BlogCard} from "../../../../components/marketing/content-cards";
import {LinkButton} from "../../../../components/marketing/link-button";
import {BLOG_POSTS, getBlogPostBySlug} from "../../../../data/marketing";

interface BlogDetailPageProps {
  params: Promise<{slug: string}>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({slug: post.slug}));
}

export async function generateMetadata({params}: BlogDetailPageProps): Promise<Metadata> {
  const {slug} = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  return {
    description: post.excerpt,
    title: post.title,
  };
}

export default async function BlogDetailPage({params}: BlogDetailPageProps) {
  const {slug} = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <main>
      <article className="mx-auto max-w-4xl px-5 py-14">
        <div className="flex flex-wrap gap-2">
          <Chip variant="soft">{post.category}</Chip>
          <Chip variant="soft">{post.readingTime}</Chip>
        </div>
        <h1 className="text-foreground mt-5 text-5xl font-semibold tracking-normal">
          {post.title}
        </h1>
        <p className="text-muted mt-4 text-base">{post.date}</p>
        <div className="relative mt-8 overflow-hidden rounded-2xl bg-surface-secondary">
          <Image
            priority
            alt={post.imageAlt}
            className="aspect-[16/9] w-full object-cover"
            height={800}
            src={post.image}
            width={1200}
          />
        </div>
        <div className="mt-10 space-y-6 text-lg leading-8 text-muted">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10">
          <LinkButton href="/blog" variant="outline">
            Kembali Ke Blog
          </LinkButton>
        </div>
      </article>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <h2 className="text-foreground text-2xl font-semibold">Artikel Lain</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {relatedPosts.map((item) => (
            <BlogCard key={item.slug} post={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
