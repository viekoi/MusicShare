/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["squawtjavnhfhnmcjhll.supabase.co"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "500mb",
    },
  },
};

module.exports = nextConfig;
