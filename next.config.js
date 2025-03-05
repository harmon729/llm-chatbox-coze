/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 在生产构建时不运行ESLint
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
