/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },

  eslint: {
    ignoreDuringBuilds: true
  },

  experimental: {
    optimizePackageImports: ["react", "react-dom"]
  }
}

module.exports = nextConfig