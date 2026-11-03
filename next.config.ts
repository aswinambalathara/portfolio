import type { NextConfig } from 'next'

// Static export: `next build` writes plain HTML/CSS/JS to out/, served by Nginx in the container.
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
