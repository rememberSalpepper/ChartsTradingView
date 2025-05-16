/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },

  // Aquí le decimos solo a Next que ponga los bundles bajo /pgapps/charts
  assetPrefix: '/pgapps/charts',
  trailingSlash: false,
  output: 'standalone',
};

export default nextConfig;
