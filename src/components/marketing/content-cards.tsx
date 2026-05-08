import type {BlogPost, Book, Feature} from "../../data/marketing";
import type {ComponentType} from "react";

import {
  BookOpen,
  Calendar,
  ChartColumn,
  CircleCheck,
  Heart,
  Persons,
  ShieldCheck,
} from "@gravity-ui/icons";
import {Card, Chip} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

import {IsometricBook} from "../isometric-book";

const FEATURE_ICONS: Record<Feature["icon"], ComponentType<{className?: string}>> = {
  book: BookOpen,
  calendar: Calendar,
  chart: ChartColumn,
  community: Persons,
  heart: Heart,
  shield: ShieldCheck,
};

const BOOK_COVER_THEMES: Record<
  Book["slug"],
  {color: string; textColor?: string; rotation?: number}
> = {
  "adab-menuntut-ilmu": {
    color: "#995a18",
    rotation: -28,
  },
  "fiqih-ibadah-harian": {
    color: "#383838",
    rotation: -20,
  },
  "sirah-nabi-untuk-keluarga": {
    color: "#9d1b1f",
    rotation: -24,
  },
  "tazkiyah-qalbu": {
    color: "#006943",
    rotation: -22,
  },
};

export function getBookCoverTheme(book: Book) {
  return BOOK_COVER_THEMES[book.slug];
}

export function BookCard({book}: {book: Book}) {
  const coverTheme = getBookCoverTheme(book);

  return (
    <Card className="h-full overflow-hidden rounded-2xl">
      <Link aria-label={`Baca detail ${book.title}`} href={`/book/${book.slug}`}>
        <div className="flex aspect-[4/5] items-center justify-center bg-surface-secondary px-5 py-8">
          <IsometricBook
            author={book.author}
            title={book.title}
            width={148}
            {...coverTheme}
          />
        </div>
      </Link>
      <Card.Content className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-2">
          <Chip size="sm" variant="soft">
            {book.category}
          </Chip>
          <Chip size="sm" variant="soft">
            {book.readingTime}
          </Chip>
        </div>
        <div>
          <h3 className="text-foreground text-lg font-semibold">{book.title}</h3>
          <p className="text-muted mt-1 text-sm">{book.author}</p>
          <p className="text-muted mt-3 line-clamp-3 text-sm leading-6">{book.summary}</p>
        </div>
        <Link className="text-accent mt-auto text-sm font-medium" href={`/book/${book.slug}`}>
          Baca detail
        </Link>
      </Card.Content>
    </Card>
  );
}

export function BlogCard({post}: {post: BlogPost}) {
  return (
    <Card className="h-full overflow-hidden rounded-2xl">
      <Link aria-label={`Baca artikel ${post.title}`} href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/10] bg-surface-secondary">
          <Image
            fill
            alt={post.imageAlt}
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
            src={post.image}
          />
        </div>
      </Link>
      <Card.Content className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-2">
          <Chip size="sm" variant="soft">
            {post.category}
          </Chip>
          <Chip size="sm" variant="soft">
            {post.readingTime}
          </Chip>
        </div>
        <div>
          <p className="text-muted text-sm">{post.date}</p>
          <h3 className="text-foreground mt-2 text-lg font-semibold">{post.title}</h3>
          <p className="text-muted mt-3 line-clamp-3 text-sm leading-6">{post.excerpt}</p>
        </div>
        <Link className="text-accent mt-auto text-sm font-medium" href={`/blog/${post.slug}`}>
          Baca artikel
        </Link>
      </Card.Content>
    </Card>
  );
}

export function FeatureCard({feature}: {feature: Feature}) {
  const Icon = FEATURE_ICONS[feature.icon];

  return (
    <Card className="h-full rounded-2xl">
      <Card.Content className="flex h-full flex-col gap-4 p-5">
        <div className="bg-surface-secondary text-accent flex size-10 items-center justify-center rounded-xl">
          <Icon className="size-5" />
        </div>
        <div>
          <h3 className="text-foreground text-base font-semibold">{feature.title}</h3>
          <p className="text-muted mt-2 text-sm leading-6">{feature.description}</p>
        </div>
      </Card.Content>
    </Card>
  );
}

export function HighlightList({items}: {items: readonly string[]}) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6">
          <CircleCheck className="text-accent mt-0.5 size-4 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
