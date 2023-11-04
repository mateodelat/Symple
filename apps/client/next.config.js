/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["unavatar.io", "localhost"],
  },
  env: {
    SERVER_URL: process.env.SERVER_URL + "/api",
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
