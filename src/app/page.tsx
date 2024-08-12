'use client'
import React, { useEffect } from 'react';
import Banner from '../components/Banner/Banner';
import Locales from '../components/Locales/Locales';
import Comentarios from '../components/Comentarios/Comentarios';
import Newsletter from '../components/Newsletter/Newsletter';
import Sorteo from '../components/Sorteo/Sorteo'
import Ubicacion from '../components/Ubicacion/Ubicacion';
import Edificio from '../components/Edificio/Edificio';
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      AOS.init({
        duration: 800, // Duración de la animación en milisegundos
      });
    }
  }, []);
  
  return (
    <>
      <a href="#locales" className="skip-link absolute left-0 bg-gray-900 text-white p-2 rounded-md text-base font-medium -top-10 focus:top-0 focus:z-50">
        Saltar al contenido principal
      </a>
      <main>
        <Banner />
        <Edificio />
        <Locales />
        <Sorteo />
        <Ubicacion />
        <Comentarios />
        <Newsletter />
      </main>
    </>
  );
}
