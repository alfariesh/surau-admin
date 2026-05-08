import type {Metadata} from "next";

import {notFound} from "next/navigation";

import {IsometricBook} from "../../../../components/isometric-book";
import {
  BookCard,
  HighlightList,
  getBookCoverTheme,
} from "../../../../components/marketing/content-cards";
import {LinkButton} from "../../../../components/marketing/link-button";
import {BOOKS, getBookBySlug} from "../../../../data/marketing";

interface BookDetailPageProps {
  params: Promise<{slug: string}>;
}

export function generateStaticParams() {
  return BOOKS.map((book) => ({slug: book.slug}));
}

export async function generateMetadata({params}: BookDetailPageProps): Promise<Metadata> {
  const {slug} = await params;
  const book = getBookBySlug(slug);

  if (!book) return {};

  return {
    description: book.summary,
    title: book.title,
  };
}

export default async function BookDetailPage({params}: BookDetailPageProps) {
  const {slug} = await params;
  const book = getBookBySlug(slug);

  if (!book) notFound();

  const relatedBooks = BOOKS.filter((item) => item.slug !== book.slug).slice(0, 3);
  const coverTheme = getBookCoverTheme(book);

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-surface-secondary px-8 py-12">
          <IsometricBook author={book.author} title={book.title} width={260} {...coverTheme} />
        </div>
        <article className="max-w-3xl">
          <p className="text-accent text-sm font-medium">{book.category}</p>
          <h1 className="text-foreground mt-3 text-5xl font-semibold tracking-normal">
            {book.title}
          </h1>
          <p className="text-muted mt-4 text-base">
            {book.author} · {book.readingTime}
          </p>
          <p className="text-muted mt-8 text-lg leading-8">{book.description}</p>
          <div className="mt-8 rounded-2xl bg-surface-secondary p-5">
            <h2 className="text-foreground text-base font-semibold">Yang Dipelajari</h2>
            <div className="mt-4">
              <HighlightList items={book.highlights} />
            </div>
          </div>
          <div className="mt-8">
            <LinkButton href="/book" variant="outline">
              Kembali Ke Katalog
            </LinkButton>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <h2 className="text-foreground text-2xl font-semibold">Rekomendasi Lain</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {relatedBooks.map((item) => (
            <BookCard key={item.slug} book={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
