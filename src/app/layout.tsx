import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css'; // Import global styles
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import ButtonWsp from '../components/Socials/ButtonWsp';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles within the component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  AOS.init(); // Initialize AOS within the component

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
