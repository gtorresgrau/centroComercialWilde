import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import ButtonWsp from '../components/Socials/ButtonWsp';
import "aos/dist/aos.css";

export const metadata = {
  manifest: "/public/manifest.json",
  title: 'Centro Comercial Wilde',
  description: 'Paseo de Compras Multimarca',
};

export const viewport = {
  themeColor:"#451F49",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
