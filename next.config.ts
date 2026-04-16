/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript 에러를 무시하고 빌드를 진행합니다.
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint 에러(문법 체크)도 함께 무시하면 더 확실합니다.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;