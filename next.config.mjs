/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // For better compatibility with Netlify
  trailingSlash: false,
}

export default nextConfig
