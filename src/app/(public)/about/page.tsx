import type {Metadata} from "next";

import {Card} from "@heroui/react";
import Image from "next/image";

import {LinkButton} from "../../../components/marketing/link-button";
import {SectionHeading} from "../../../components/marketing/section-heading";
import {PUBLIC_STATS} from "../../../data/marketing";

export const metadata: Metadata = {
  description: "Tentang Surau sebagai ruang literasi dan pengelolaan komunitas masjid.",
  title: "About",
};

const VALUES = [
  "Ilmu dibuat mudah ditemukan dan mudah dibagikan.",
  "Kegiatan masjid dirapikan tanpa menghilangkan kehangatan komunitas.",
  "Pengurus punya alat yang jelas, jamaah punya halaman publik yang ramah.",
] as const;

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            description="Surau lahir dari kebutuhan sederhana: membuat ilmu, buku, dan kegiatan masjid lebih mudah ditemukan oleh jamaah."
            eyebrow="About"
            title="Membantu komunitas belajar dengan tertib dan hangat."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {PUBLIC_STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-surface-secondary p-4">
                <p className="text-foreground text-3xl font-semibold tabular-nums">{stat.value}</p>
                <p className="text-muted mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-surface-secondary">
          <Image
            alt="Ilustrasi rak buku dan komunitas Surau"
            className="aspect-[3/2] w-full object-cover"
            height={800}
            src="/marketing/about-community.png"
            width={1200}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {VALUES.map((value, index) => (
            <Card key={value} className="rounded-2xl">
              <Card.Content className="p-5">
                <p className="text-accent text-sm font-medium tabular-nums">0{index + 1}</p>
                <p className="text-foreground mt-4 text-base leading-7">{value}</p>
              </Card.Content>
            </Card>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-surface-secondary p-6 md:p-8">
          <h2 className="text-foreground text-3xl font-semibold tracking-normal">
            Publik melihat manfaatnya, pengurus menjaga ritmenya.
          </h2>
          <p className="text-muted mt-4 max-w-3xl text-base leading-8">
            Halaman publik Surau memperkenalkan bacaan, artikel, dan arah kegiatan. Area admin
            tetap terpisah untuk pengurus yang mengelola data, aktivitas, dan analitik komunitas.
          </p>
          <div className="mt-6">
            <LinkButton href="/feature">Lihat Fitur</LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}
