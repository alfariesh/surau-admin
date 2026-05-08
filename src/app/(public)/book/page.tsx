import type {Metadata} from "next";

import {BookCard} from "../../../components/marketing/content-cards";
import {SectionHeading} from "../../../components/marketing/section-heading";
import {BOOKS} from "../../../data/marketing";

export const metadata: Metadata = {
  description: "Katalog buku islami pilihan untuk jamaah Surau.",
  title: "Book",
};

export default function BookPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <SectionHeading
        description="Daftar bacaan islami yang dikurasi untuk kajian, keluarga, dan ruang baca masjid."
        eyebrow="Book"
        title="Katalog Buku Islami"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BOOKS.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </main>
  );
}
