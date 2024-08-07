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
    <main>
      <Banner />
      <Edificio />
      <Locales />
      <Sorteo />
      <Ubicacion />
      <Comentarios />
      <Newsletter />
    </main>
  );
}
