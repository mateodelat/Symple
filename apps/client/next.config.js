/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["unavatar.io", "localhost"],
  },
  env: {
    SERVER_URL: "http://localhost:3001/api",
  },
};

module.exports = nextConfig;
