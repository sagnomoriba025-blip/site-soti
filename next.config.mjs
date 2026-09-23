/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow production builds to complete even if ESLint errors are present
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to complete even if TypeScript errors are present
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
