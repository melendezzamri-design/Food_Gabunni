import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Desactivar los indicadores/devtools de Next.js en desarrollo
  // Esto quitará el overlay flotante (el botón con la "N") que muestra opciones de DevTools.
  // La UI de Next sugiere usar `devIndicators: false` para deshabilitarlo por proyecto.
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
