/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // هذا الإعداد يسمح بربط تطبيقك مع سكتشوير بسهولة
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
