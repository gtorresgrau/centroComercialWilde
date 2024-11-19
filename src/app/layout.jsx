import React from 'react';
// import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import '../styles/globals.css';
import "aos/dist/aos.css";
import ClientLayout from './clientLayout';

export const metadata = {
  manifest: "/manifest.json",
  title: 'Centro Comercial Wilde - Paseo de compras multimarca en Wilde.',
  description: 'Paseo de Compras Multimarca ubicado en Wilde, avellaneda. Todo lo que estas buscando en un mismo lugar. Insumos informaticos, comidas preparadas, pet Shop. centro comercial wilde, las flores 1600.',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#451F49',
  charSet: 'UTF-8',
  icon: '/favicon.ico',
  canonical:'https://centrocomercialwilde.com/',
  robots:"/robots.txt",
  ogImage: '/icons/icon-1024x1024.png',
  keywords: 'Centro Comercial Wilde, Paseo de Compras Multimarca, Compras en Wilde, Tiendas en Wilde, Shopping en Wilde, Ofertas en Wilde, Descuentos en Wilde, Moda en Wilde, Comida en Wilde, Entretenimiento en Wilde, Locales Comerciales en Wilde, Shopping Buenos Aires, Centros Comerciales Zona Sur, Salidas en Wilde, Eventos en Wilde'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content={metadata.viewport} />
        <meta name="theme-color" content={metadata.themeColor} />
        <meta charSet={metadata.charSet} />
        <link rel="icon" href='/favicon.ico' sizes='any' type="image/x-icon"/>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link rel="manifest" href={metadata.manifest} />
        <link rel='canonical' href={metadata.canonical} />
        <meta name="publisher" content="Gonzalo Torres Grau" />
        <meta name="author" content="Gonzalo Torres Grau" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BFTD765MWQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BFTD765MWQ');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Centro comercial Wilde - Paseo de compras multimarca",
              "description": "Paseo de Compras Multimarca ubicado en Wilde, avellaneda. Todo lo que estas buscando en un mismo lugar. Insumos informaticos, comidas preparadas, pet Shop. centro comercial wilde, las flores 1600.",
              "image": "https://centrocomercialwilde.com/icons/icon-1024x1024.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "las flores 1600",
                "addressLocality": "Avellaneda",
                "addressRegion": "wilde",
                "addressCountry": "Argentina"
              },
              "telephone": "+541138498249",
              "url": "https://centrocomercialwilde.com/"
            }),
          }}
        />
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
