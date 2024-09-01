import React, { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import "aos/dist/aos.css";
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ButtonWsp from '../components/Socials/ButtonWsp';
import Loading from '../components/Loading/Loading';
import ClientLayout from './clientLayout';

// Define metadata with viewport and theme-color
export const metadata = {
  manifest: "/manifest.json",
  title: 'Centro Comercial Wilde',
  description: 'Paseo de Compras Multimarca',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#451F49',
  charSet: 'UTF-8',
  icon: '/favicon.ico',
  keywords: 'Centro Comercial Wilde, Paseo de Compras Multimarca, Compras en Wilde, Tiendas en Wilde, Shopping en Wilde, Ofertas en Wilde, Descuentos en Wilde, Moda en Wilde, Comida en Wilde, Entretenimiento en Wilde, Locales Comerciales en Wilde, Shopping Buenos Aires, Centros Comerciales Zona Sur, Salidas en Wilde, Eventos en Wilde'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Inject metadata elements from metadata */}
        <meta name="viewport" content={metadata.viewport} />
        <meta name="theme-color" content={metadata.themeColor} />
        <meta charSet={metadata.charSet} />
        <link rel="icon" href={metadata.icon} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="manifest" href={metadata.manifest} />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
