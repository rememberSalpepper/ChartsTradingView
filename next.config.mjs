/** next.config.js */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },

  // esto es lo único que necesitas para “boletas” y que ya funciona:
  assetPrefix: '/pgapps/charts',
  trailingSlash: false,
  output: 'standalone',
};

export default nextConfig;
