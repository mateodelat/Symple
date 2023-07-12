/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  rewrites: () => {
    return [{
      source: '/api',
      destination: `${process.env.SERVER_URL}/api`
    }]
  },
  distDir: 'dist'
}

module.exports = nextConfig
