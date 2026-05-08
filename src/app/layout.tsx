import type {Metadata} from "next";
import type {ReactNode} from "react";

import {Toast} from "@heroui/react";

import "./globals.css";

export const metadata: Metadata = {
  description:
    "Surau adalah ruang publik untuk katalog buku islami, artikel komunitas, dan dashboard pengurus masjid.",
  title: {
    default: "Surau - Literasi Islami dan Komunitas",
    template: "%s - Surau",
  },
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning className="bg-background text-foreground" lang="id">
      <body className="font-sans antialiased">
        {children}
        <Toast.Provider placement="bottom" />
      </body>
    </html>
  );
}
