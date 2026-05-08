import type {Metadata} from "next";

import {BlogCard} from "../../../components/marketing/content-cards";
import {SectionHeading} from "../../../components/marketing/section-heading";
import {BLOG_POSTS} from "../../../data/marketing";

export const metadata: Metadata = {
  description: "Artikel Surau tentang literasi, kajian, dan pengelolaan komunitas masjid.",
  title: "Blog",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <SectionHeading
        description="Catatan praktis untuk pengurus dan jamaah yang ingin membangun ruang belajar yang hidup."
        eyebrow="Blog"
        title="Artikel Surau"
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
