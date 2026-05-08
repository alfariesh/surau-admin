export type MarketingStat = {
  readonly label: string;
  readonly value: string;
};

export type Book = {
  readonly slug: string;
  readonly title: string;
  readonly author: string;
  readonly category: string;
  readonly readingTime: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly summary: string;
  readonly description: string;
  readonly highlights: readonly string[];
};

export type BlogPost = {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly date: string;
  readonly readingTime: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly excerpt: string;
  readonly paragraphs: readonly string[];
};

export type Feature = {
  readonly title: string;
  readonly description: string;
  readonly icon: "book" | "calendar" | "chart" | "community" | "heart" | "shield";
};

export const PUBLIC_STATS: readonly MarketingStat[] = [
  {label: "Koleksi awal", value: "40+"},
  {label: "Tema kajian", value: "12"},
  {label: "Alur admin", value: "5"},
] as const;

export const BOOKS: readonly Book[] = [
  {
    author: "Tim Kurasi Surau",
    category: "Adab",
    description:
      "Buku ini merangkum adab dasar seorang penuntut ilmu: meluruskan niat, menjaga lisan, menghormati guru, dan mempraktikkan ilmu sedikit demi sedikit. Cocok sebagai bacaan pembuka untuk halaqah remaja dan kajian keluarga.",
    highlights: [
      "Niat belajar dan adab bertanya",
      "Cara membuat catatan kajian yang rapi",
      "Latihan mengamalkan ilmu dalam aktivitas harian",
    ],
    image: "/marketing/book-adab-menuntut-ilmu.png",
    imageAlt: "Cover buku Adab Menuntut Ilmu",
    readingTime: "28 menit",
    slug: "adab-menuntut-ilmu",
    summary:
      "Panduan singkat untuk membangun sikap belajar yang lembut, tertib, dan bermanfaat.",
    title: "Adab Menuntut Ilmu",
  },
  {
    author: "Ustaz Rafi Al-Bantani",
    category: "Fiqih",
    description:
      "Ringkasan fiqih ibadah harian yang disusun untuk jamaah umum. Setiap bab dibuat praktis, dari thaharah, shalat berjamaah, adab masjid, hingga dzikir setelah shalat.",
    highlights: [
      "Checklist ibadah harian yang mudah diikuti",
      "Ringkasan adab masjid dan shalat berjamaah",
      "Bahasan praktis tanpa bahasa yang rumit",
    ],
    image: "/marketing/book-fiqih-ibadah-harian.png",
    imageAlt: "Cover buku Fiqih Ibadah Harian",
    readingTime: "36 menit",
    slug: "fiqih-ibadah-harian",
    summary:
      "Bacaan ringkas tentang praktik ibadah sehari-hari untuk keluarga dan jamaah masjid.",
    title: "Fiqih Ibadah Harian",
  },
  {
    author: "Nadia Rahman",
    category: "Sirah",
    description:
      "Kumpulan kisah sirah yang disusun untuk percakapan keluarga. Setiap kisah dilengkapi pertanyaan refleksi agar orang tua dan anak dapat berdiskusi tentang akhlak Rasulullah.",
    highlights: [
      "Kisah pendek untuk dibaca bersama anak",
      "Pertanyaan refleksi setelah setiap bab",
      "Fokus pada teladan akhlak dan kasih sayang",
    ],
    image: "/marketing/book-sirah-nabi.png",
    imageAlt: "Cover buku Sirah Nabi Untuk Keluarga",
    readingTime: "42 menit",
    slug: "sirah-nabi-untuk-keluarga",
    summary:
      "Kisah teladan Rasulullah yang hangat untuk dibaca bersama keluarga di rumah.",
    title: "Sirah Nabi Untuk Keluarga",
  },
  {
    author: "Dr. Hasan Marzuki",
    category: "Tazkiyah",
    description:
      "Pengantar tazkiyah yang membahas penyakit hati, kebiasaan muhasabah, dan cara menjaga rutinitas dzikir. Bahasannya ringan, tetapi cukup dalam untuk bahan diskusi pekanan.",
    highlights: [
      "Peta kebiasaan untuk muhasabah diri",
      "Latihan menjaga dzikir dan doa harian",
      "Pembahasan hati dengan bahasa yang tenang",
    ],
    image: "/marketing/book-tazkiyah-qalbu.png",
    imageAlt: "Cover buku Tazkiyah Qalbu",
    readingTime: "32 menit",
    slug: "tazkiyah-qalbu",
    summary:
      "Bacaan untuk melembutkan hati melalui muhasabah, dzikir, dan amal kecil yang konsisten.",
    title: "Tazkiyah Qalbu",
  },
] as const;

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    category: "Komunitas",
    date: "8 Mei 2026",
    excerpt:
      "Ruang baca masjid dapat dimulai dari rak kecil, daftar pinjam sederhana, dan kurasi buku yang dekat dengan kebutuhan jamaah.",
    image: "/marketing/blog-literasi-surau.png",
    imageAlt: "Ilustrasi komunitas membaca di ruang Surau",
    paragraphs: [
      "Ruang baca masjid tidak harus menunggu koleksi besar. Sering kali, rak kecil yang terawat dan daftar buku yang jelas sudah cukup untuk memulai kebiasaan baru di lingkungan jamaah.",
      "Kunci awalnya adalah kurasi. Pilih buku yang dekat dengan kebutuhan harian: adab, fiqih ibadah, sirah, parenting, dan bacaan remaja. Buku yang relevan lebih mudah dipinjam dan dibicarakan kembali.",
      "Surau membantu pengurus menampilkan katalog publik, mencatat rekomendasi, dan membuat jalur sederhana dari membaca menuju kajian. Dengan begitu, literasi tidak berhenti di rak buku.",
    ],
    readingTime: "4 menit",
    slug: "membuka-ruang-baca-masjid",
    title: "Membuka Ruang Baca Di Lingkungan Masjid",
  },
  {
    category: "Operasional",
    date: "6 Mei 2026",
    excerpt:
      "Jadwal kajian yang jelas membantu jamaah memilih waktu, menyiapkan catatan, dan mengajak keluarga ikut hadir.",
    image: "/marketing/blog-jadwal-kajian.png",
    imageAlt: "Ilustrasi kalender kajian pekanan",
    paragraphs: [
      "Jadwal kajian yang baik bukan sekadar daftar tanggal. Ia perlu memberi konteks: tema, pemateri, lokasi, target peserta, dan bahan bacaan pendamping.",
      "Pengurus dapat menata jadwal bulanan dengan pola yang mudah dibaca, misalnya fiqih pada pekan pertama, sirah pada pekan kedua, dan kajian keluarga pada akhir bulan.",
      "Ketika jadwal dan bahan bacaan saling terhubung, jamaah punya alasan untuk kembali. Mereka tahu apa yang sedang dipelajari dan bisa menyiapkan pertanyaan lebih awal.",
    ],
    readingTime: "5 menit",
    slug: "mengelola-jadwal-kajian",
    title: "Mengelola Jadwal Kajian Agar Mudah Diikuti",
  },
  {
    category: "Kurasi",
    date: "3 Mei 2026",
    excerpt:
      "Kurasi buku islami perlu menimbang tingkat pembaca, kejelasan tema, dan manfaat langsung bagi keluarga serta jamaah.",
    image: "/marketing/blog-kurasi-buku.png",
    imageAlt: "Ilustrasi buku terbuka untuk kurasi bacaan",
    paragraphs: [
      "Kurasi buku islami perlu dimulai dari pertanyaan sederhana: siapa pembacanya dan apa kebutuhan terdekat mereka. Jawaban ini membantu pengurus menghindari koleksi yang bagus tetapi sulit disentuh.",
      "Untuk koleksi awal, seimbangkan bacaan ringan, rujukan praktis, dan buku diskusi. Setiap kategori sebaiknya punya ringkasan pendek agar jamaah tidak bingung memilih.",
      "Surau menempatkan ringkasan, kategori, dan rekomendasi di satu tempat. Pengurus bisa menampilkan buku pilihan tanpa membuat jamaah tenggelam dalam daftar panjang.",
    ],
    readingTime: "4 menit",
    slug: "cara-mengkurasi-buku-islami",
    title: "Cara Mengkurasi Buku Islami Untuk Jamaah",
  },
] as const;

export const FEATURES: readonly Feature[] = [
  {
    description:
      "Tampilkan koleksi buku pilihan dengan kategori, ringkasan, dan halaman detail yang mudah dibagikan.",
    icon: "book",
    title: "Katalog Buku Islami",
  },
  {
    description:
      "Publikasikan artikel pendek, catatan kajian, dan panduan komunitas dari satu struktur konten.",
    icon: "heart",
    title: "Blog Komunitas",
  },
  {
    description:
      "Arahkan pengurus ke dashboard admin untuk melihat aktivitas, pesanan, analitik, dan pengaturan.",
    icon: "chart",
    title: "Dashboard Pengurus",
  },
  {
    description:
      "Susun program pekanan, bahan bacaan, dan agenda jamaah agar alurnya mudah diikuti.",
    icon: "calendar",
    title: "Agenda Kajian",
  },
  {
    description:
      "Bangun identitas publik Surau yang ramah, ringan, dan tetap serius untuk literasi masjid.",
    icon: "community",
    title: "Profil Publik",
  },
  {
    description:
      "Area admin tetap dilindungi sesi Firebase, sementara halaman publik bebas diakses pengunjung.",
    icon: "shield",
    title: "Akses Terjaga",
  },
] as const;

const BOOK_BY_SLUG = new Map(BOOKS.map((book) => [book.slug, book]));
const BLOG_BY_SLUG = new Map(BLOG_POSTS.map((post) => [post.slug, post]));

export function getBookBySlug(slug: string) {
  return BOOK_BY_SLUG.get(slug);
}

export function getBlogPostBySlug(slug: string) {
  return BLOG_BY_SLUG.get(slug);
}
