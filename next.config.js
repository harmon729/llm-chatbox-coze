/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 在生产构建时不运行ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在生产构建时忽略TypeScript错误
    ignoreBuildErrors: true,
  },
  // 禁用Babel，强制使用SWC
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
