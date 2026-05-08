import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },
  async headers() {
    return [
      {
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
        source: "/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "heroui-assets.nyc3.cdn.digitaloceanspaces.com",
        protocol: "https",
      },
      {
        hostname: "img.heroui.chat",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
