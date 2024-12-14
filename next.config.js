/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable SWC minification to fix build issues
  swcMinify: false,
  // Use Babel instead of SWC
  experimental: {
    forceSwcTransforms: false
  }
};

module.exports = nextConfig;