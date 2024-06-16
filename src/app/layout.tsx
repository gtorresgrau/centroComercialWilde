import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import ButtonWsp from '../components/Socials/ButtonWsp';
import "aos/dist/aos.css";

// Define metadata with viewport and theme-color
export const metadata = {
  manifest: "/manifest.json",
  title: 'Centro Comercial Wilde',
  description: 'Paseo de Compras Multimarca',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#451F49', // Adjust as needed
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Inject viewport and theme-color from metadata */}
        <meta name="viewport" content={metadata.viewport} />
        <meta name="theme-color" content={metadata.themeColor} />

        {/* ... other head elements (e.g., title, description) */}
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <ButtonWsp text='ADMINISTRACION' contact='1138498249' />
        <Analytics />
      </body>
    </html>
  );
}
