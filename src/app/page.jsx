
'use client'
import React from 'react';
import Banner from '../components/Banner/Banner';
import Locales from '../components/Locales/Locales';
import Comentarios from '../components/Comentarios/Comentarios';
import Newsletter from '../components/Newsletter/Newsletter';
import Sorteo from '../components/Sorteo/Sorteo'
import Ubicacion from '../components/Ubicacion/Ubicacion';
import Edificio from '../components/Edificio/Edificio';

export default function Home() {
  
  return (
    <>
      <a href="#locales" className="skip-link absolute left-0 bg-gray-900 text-white p-2 rounded-md text-base font-medium -top-10 focus:top-0 focus:z-50">
        Saltar al contenido principal
      </a>
        <Banner />
        <Edificio />
        <Locales />
        <Sorteo />
        <Ubicacion />
        <Comentarios />
        <Newsletter />
    </>
  );
}
