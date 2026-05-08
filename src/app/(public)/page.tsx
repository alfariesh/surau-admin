import {ArrowRight, BookOpen, Calendar, ChartColumn} from "@gravity-ui/icons";
import {Card, Chip} from "@heroui/react";
import {Carousel, ItemCard} from "@heroui-pro/react";
import Image from "next/image";
import Link from "next/link";

import {BlogCard, BookCard, FeatureCard} from "../../components/marketing/content-cards";
import {LinkButton} from "../../components/marketing/link-button";
import {SectionHeading} from "../../components/marketing/section-heading";
import {BLOG_POSTS, BOOKS, FEATURES, PUBLIC_STATS} from "../../data/marketing";

const HOME_FEATURES = FEATURES.slice(0, 3);
const FEATURED_BOOKS = BOOKS.slice(0, 3);
const FEATURED_POSTS = BLOG_POSTS.slice(0, 2);

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-16">
        <div>
          <Chip className="mb-5" color="success" variant="soft">
            Literasi islami untuk jamaah
          </Chip>
          <h1 className="text-foreground max-w-4xl text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">
            Surau untuk membaca, belajar, dan mengelola komunitas.
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg leading-8">
            Bangun halaman publik masjid dengan katalog buku islami, artikel kajian, dan jalur
            masuk admin yang rapi untuk pengurus.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/login?next=/admin">
              Masuk Admin
              <ArrowRight className="size-4" />
            </LinkButton>
            <LinkButton href="/book" variant="outline">
              Lihat Buku
            </LinkButton>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {PUBLIC_STATS.map((stat) => (
              <div key={stat.label} className="bg-surface-secondary rounded-2xl px-4 py-3">
                <p className="text-foreground text-2xl font-semibold tabular-nums">{stat.value}</p>
                <p className="text-muted mt-1 text-xs leading-5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl bg-surface-secondary">
            <Image
              priority
              alt="Ilustrasi Surau sebagai ruang literasi dan pengelolaan komunitas"
              className="aspect-[16/10] w-full object-cover"
              height={1000}
              src="/marketing/hero-surau.png"
              width={1600}
            />
          </div>
          <Card className="absolute -bottom-6 left-5 right-5 hidden rounded-2xl sm:block">
            <Card.Content className="grid grid-cols-3 gap-3 p-4">
              <ItemCard variant="secondary">
                <ItemCard.Icon>
                  <BookOpen />
                </ItemCard.Icon>
                <ItemCard.Content>
                  <ItemCard.Title>Buku</ItemCard.Title>
                  <ItemCard.Description>Katalog pilihan</ItemCard.Description>
                </ItemCard.Content>
              </ItemCard>
              <ItemCard variant="secondary">
                <ItemCard.Icon>
                  <Calendar />
                </ItemCard.Icon>
                <ItemCard.Content>
                  <ItemCard.Title>Kajian</ItemCard.Title>
                  <ItemCard.Description>Agenda jamaah</ItemCard.Description>
                </ItemCard.Content>
              </ItemCard>
              <ItemCard variant="secondary">
                <ItemCard.Icon>
                  <ChartColumn />
                </ItemCard.Icon>
                <ItemCard.Content>
                  <ItemCard.Title>Admin</ItemCard.Title>
                  <ItemCard.Description>Dashboard aktif</ItemCard.Description>
                </ItemCard.Content>
              </ItemCard>
            </Card.Content>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionHeading
          description="Mulai dari katalog, publikasi artikel, sampai akses admin yang tetap aman."
          eyebrow="Fitur"
          title="Halaman publik yang langsung berguna"
          action={
            <LinkButton href="/feature" variant="outline">
              Semua Fitur
            </LinkButton>
          }
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HOME_FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      <section className="bg-surface-secondary/60 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            description="Koleksi awal untuk membantu jamaah menemukan bacaan yang dekat dengan kebutuhan harian."
            eyebrow="Book"
            title="Buku Islami Pilihan"
            action={
              <LinkButton href="/book" variant="outline">
                Buka Katalog
              </LinkButton>
            }
          />
          <div className="mt-8 lg:hidden">
            <Carousel opts={{align: "start"}}>
              <Carousel.Content>
                {FEATURED_BOOKS.map((book) => (
                  <Carousel.Item key={book.slug} className="basis-[86%] sm:basis-1/2">
                    <BookCard book={book} />
                  </Carousel.Item>
                ))}
              </Carousel.Content>
              <Carousel.Dots />
            </Carousel>
          </div>
          <div className="mt-8 hidden gap-4 lg:grid lg:grid-cols-3">
            {FEATURED_BOOKS.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <SectionHeading
          description="Artikel pendek untuk pengurus, keluarga, dan jamaah yang ingin membangun kebiasaan belajar bersama."
          eyebrow="Blog"
          title="Catatan Dari Surau"
          action={
            <LinkButton href="/blog" variant="outline">
              Semua Artikel
            </LinkButton>
          }
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {FEATURED_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="grid gap-8 rounded-2xl bg-surface-secondary p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="text-accent text-sm font-medium">About</p>
            <h2 className="text-foreground mt-3 text-3xl font-semibold tracking-normal">
              Dari rak kecil menuju ekosistem belajar.
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-muted text-base leading-8">
              Surau dirancang sebagai wajah publik yang sederhana untuk masjid dan komunitas:
              menampilkan buku pilihan, mengarsipkan artikel, dan memberi pengurus akses cepat ke
              dashboard operasional.
            </p>
            <Link className="text-accent inline-flex items-center gap-2 text-sm font-medium" href="/about">
              Kenali Surau
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
