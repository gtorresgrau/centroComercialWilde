import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import "aos/dist/aos.css";
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ButtonWsp from '../components/Socials/ButtonWsp';

export const metadata = {
  manifest: "/manifest.json",
  title: 'Centro Comercial Wilde',
  description: 'Paseo de Compras Multimarca',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#451F49',
  charSet: 'UTF-8',
  icon: '/favicon.ico',
  keywords: 'Centro Comercial Wilde, Paseo de Compras Multimarca, Compras en Wilde, Tiendas en Wilde, Shopping en Wilde, Ofertas en Wilde, Descuentos en Wilde, Moda en Wilde, Comida en Wilde, Entretenimiento en Wilde, Locales Comerciales en Wilde, Shopping Buenos Aires, Centros Comerciales Zona Sur, Salidas en Wilde, Eventos en Wilde',
  og: {
    title: 'Centro Comercial Wilde - El Mejor Paseo de Compras en Wilde',
    description: 'Descubre las mejores tiendas y ofertas en Centro Comercial Wilde. ¡Visítanos hoy mismo!',
    image: 'https://centrocomercialwilde.com/img/banner.jpg',
    url: 'https://centrocomercialwilde.com',
    type: 'website'
  }
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

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.og.title} />
        <meta property="og:description" content={metadata.og.description} />
        <meta property="og:image" content={metadata.og.image} />
        <meta property="og:url" content={metadata.og.url} />
        <meta property="og:type" content={metadata.og.type} />
      </head>
      <body className="flex flex-col min-h-screen">
        <nav className='mb-20'>
          <Navbar />
        </nav>
        <main className="flex-grow mb-20">
          {children}
        </main>
        <Analytics />
        <footer>
          <Footer />
          <ButtonWsp />
        </footer>
      </body>
    </html>
  );
}
