import type {Metadata} from "next";

import {ItemCard} from "@heroui-pro/react";
import {
  BookOpen,
  Calendar,
  ChartColumn,
  Heart,
  Persons,
  ShieldCheck,
} from "@gravity-ui/icons";

import {FeatureCard} from "../../../components/marketing/content-cards";
import {LinkButton} from "../../../components/marketing/link-button";
import {SectionHeading} from "../../../components/marketing/section-heading";
import {FEATURES} from "../../../data/marketing";

export const metadata: Metadata = {
  description: "Fitur Surau untuk halaman publik, katalog buku, blog, dan dashboard admin.",
  title: "Feature",
};

const WORKFLOW = [
  {
    description: "Pengurus memilih buku dan artikel yang ingin ditampilkan.",
    icon: BookOpen,
    title: "Kurasi Konten",
  },
  {
    description: "Jamaah membaca katalog, artikel, dan agenda dari domain utama.",
    icon: Persons,
    title: "Akses Publik",
  },
  {
    description: "Admin masuk ke dashboard untuk melihat aktivitas dan mengatur data.",
    icon: ChartColumn,
    title: "Kelola Admin",
  },
] as const;

export default function FeaturePage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-14">
        <SectionHeading
          description="Surau menyatukan halaman publik yang ramah dengan dashboard admin yang tetap terlindungi."
          eyebrow="Feature"
          title="Fitur untuk literasi dan operasional komunitas"
          action={<LinkButton href="/login?next=/admin">Masuk Admin</LinkButton>}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      <section className="bg-surface-secondary/60 py-16">
        <div className="mx-auto max-w-5xl px-5">
          <SectionHeading
            description="Alurnya dibuat sederhana agar implementasi v1 langsung bisa dipakai dan diperluas nanti."
            title="Alur Kerja"
          />
          <div className="mt-8 grid gap-3">
            {WORKFLOW.map((item) => {
              const Icon = item.icon;

              return (
                <ItemCard key={item.title} variant="default">
                  <ItemCard.Icon>
                    <Icon />
                  </ItemCard.Icon>
                  <ItemCard.Content>
                    <ItemCard.Title>{item.title}</ItemCard.Title>
                    <ItemCard.Description>{item.description}</ItemCard.Description>
                  </ItemCard.Content>
                </ItemCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-surface-secondary p-5">
            <Calendar className="text-accent size-5" />
            <h2 className="text-foreground mt-4 text-base font-semibold">Siap Untuk Agenda</h2>
            <p className="text-muted mt-2 text-sm leading-6">
              Struktur konten sudah siap diperluas ke jadwal kajian dan publikasi rutin.
            </p>
          </div>
          <div className="rounded-2xl bg-surface-secondary p-5">
            <Heart className="text-accent size-5" />
            <h2 className="text-foreground mt-4 text-base font-semibold">Dekat Dengan Jamaah</h2>
            <p className="text-muted mt-2 text-sm leading-6">
              Copy dan visual dibuat hangat, bukan seperti halaman SaaS yang terlalu promosi.
            </p>
          </div>
          <div className="rounded-2xl bg-surface-secondary p-5">
            <ShieldCheck className="text-accent size-5" />
            <h2 className="text-foreground mt-4 text-base font-semibold">Admin Tetap Aman</h2>
            <p className="text-muted mt-2 text-sm leading-6">
              Proxy hanya menjaga `/admin`, sementara halaman publik tetap cepat diakses.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
