/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Allow external images for the studio demo
  },
  reactStrictMode: true,
};

module.exports = nextConfig;