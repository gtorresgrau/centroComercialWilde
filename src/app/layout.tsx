import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import "aos/dist/aos.css";
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ButtonWsp from '../components/Socials/ButtonWsp';

// Define metadata with viewport and theme-color
export const metadata = {
  manifest: "/manifest.json",
  title: 'Centro Comercial Wilde',
  description: 'Paseo de Compras Multimarca',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#451F49',
  charSet: 'UTF-8',
  icon: '/favicon.ico'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <link rel="manifest" href={metadata.manifest} />
      </head>
      <body>
        <nav className='mb-20'>
          <Navbar />
        </nav>
        {children}
        <Analytics />
        <footer>
          <Footer />
          <ButtonWsp />
        </footer>
      </body>
    </html>
  );
}
