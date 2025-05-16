/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Le decimos a Next que todo va bajo /pgapps/charts
  basePath: '/pgapps/charts',
  // Y que todas las referencias a assets se prefijen igual
  assetPrefix: '/pgapps/charts',
  // Resto de tu config…
};

export default nextConfig;