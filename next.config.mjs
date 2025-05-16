/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Tu config anterior
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Aquí le indicamos a Next que todo vive bajo /pgapps/charts
  basePath: '/pgapps/charts',
  assetPrefix: '/pgapps/charts',
};

export default nextConfig;
