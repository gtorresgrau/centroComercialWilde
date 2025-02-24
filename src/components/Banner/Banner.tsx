'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { userinfo } from '../../components/../app/Constants/userinfo';
import Carrusel from '../Carrusel/Carrusel';
import s from './globo.module.css';

const Banner = () => {
  const [backgroundUrl, setBackgroundUrl] = useState('/assets/banner/background.webp');
  const [backgroundUrlVertical, setBackgroundUrlVertical] = useState('/assets/banner/backgroundVertical.webp');
  const [isFallbackDesign, setIsFallbackDesign] = useState(false); // fallback para diseño de escritorio
  const [isFallbackDesignVertical, setIsFallbackDesignVertical] = useState(false); // fallback para diseño móvil
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Función para manejar el click en el globo
  const handleBalloonClick = useCallback(() => {
    window.location.href = '#sorteo';
  }, []);

  // Obtener las imágenes de fondo desde el servidor
  const fetchBackgroundImage = async () => {
    try {
      const response = await fetch('/api/upload/getImageBanner');
      const responseVertical = await fetch('/api/upload/getImageBannerVertical');

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      if (!responseVertical.ok) throw new Error(`HTTP error! Status: ${responseVertical.status}`);

      const data = await response.json();
      const { backgroundUrl } = data;

      const dataVertical = await responseVertical.json();
      const { backgroundUrlVertical } = dataVertical;

      // Para escritorio
      if (backgroundUrl && backgroundUrl !== '/assets/banner/background.webp') {
        setBackgroundUrl(backgroundUrl);
        setIsFallbackDesign(false);
      } else {
        setBackgroundUrl('/assets/banner/background.webp');
        setIsFallbackDesign(true);
      }
      // Para móvil
      if (backgroundUrlVertical && backgroundUrlVertical !== '/assets/banner/backgroundVertical.webp') {
        setBackgroundUrlVertical(backgroundUrlVertical);
        setIsFallbackDesignVertical(false);
      } else {
        setBackgroundUrlVertical('/assets/banner/backgroundVertical.webp');
        setIsFallbackDesignVertical(true);
      }
    } catch (error) {
      console.error('Error al obtener la URL del fondo:', error);
      setBackgroundUrl('/assets/banner/background.webp');
      setBackgroundUrlVertical('/assets/banner/backgroundVertical.webp');
      setIsFallbackDesign(true);
      setIsFallbackDesignVertical(true);
    }
  };

  useEffect(() => {
    fetchBackgroundImage();
  }, []);

  // Diseños para escritorio
  const renderDesktopStandardDesign = () => (
    <section
      className="relative"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
      }}
    >
      <article className="items-center relative pb-6 h-screen">
        <div className="mx-auto max-w-5xl pt-8 sm:py-12 md:py-4 xxl:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight sm:my-6 md:my-2 xl:my-6 drop-shadow-lg shadow-primary">
              {userinfo.banner.title}
            </h1>
          </div>
        </div>
        <div className={`${s.balloon} cursor-pointer z-10`} onClick={handleBalloonClick}>
          SORTEO
        </div>
      </article>
    </section>
  );

  const renderDesktopFallbackDesign = () => (
    <section
      className="relative"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <article className="items-center relative pb-6 md:h-screen">
        <div className="mx-auto max-w-5xl pt-8 sm:py-12 md:py-4 xxl:py-12">
          <div className="text-center">
            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight sm:my-6 md:my-2 xl:my-6"
              style={{
                background: 'linear-gradient(to right, #9C27B0, #1E1E1E)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {userinfo.banner.title}
            </h1>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 sm:my-6 md:my-2 xl:my-6">
              {userinfo.banner.subTitle}
            </h2>
          </div>
        </div>
        <div className={`${s.balloon} cursor-pointer z-10`} onClick={handleBalloonClick}>
          SORTEO
        </div>
        <Carrusel />
      </article>
    </section>
  );

  // Diseños para móvil
  const renderMobileStandardDesign = () => (
    <section
      className="relative"
      style={{
        backgroundImage: `url(${backgroundUrlVertical})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <article className="items-center relative pb-6 h-screen">
        <div className="mx-auto max-w-5xl pt-8 sm:py-12 md:py-4 xxl:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight sm:my-6 md:my-2 xl:my-6 drop-shadow-lg shadow-primary">
              {userinfo.banner.title}
            </h1>
          </div>
        </div>
        <div className={`${s.balloon} cursor-pointer z-10`} onClick={handleBalloonClick}>
          SORTEO
        </div>
      </article>
    </section>
  );

  const renderMobileFallbackDesign = () => (
    <section
      className="relative"
      style={{
        backgroundImage: `url(${backgroundUrlVertical})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <article className="items-center relative pb-6 h-screen">
        <div className="mx-auto max-w-5xl pt-8 sm:py-12 md:py-4 xxl:py-12">
          <div className="text-center">
            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight sm:my-6 md:my-2 xl:my-6"
              style={{
                background: 'linear-gradient(to right, #9C27B0, #1E1E1E)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {userinfo.banner.title}
            </h1>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 sm:my-6 md:my-2 xl:my-6">
              {userinfo.banner.subTitle}
            </h2>
          </div>
        </div>
        <div className={`${s.balloon} cursor-pointer z-10`} onClick={handleBalloonClick}>
          SORTEO
        </div>
        <Carrusel />
      </article>
    </section>
  );

  // Renderizar según el tamaño de pantalla y si se cuenta con imagen o se requiere fallback
  if (isMobile) {
    return isFallbackDesignVertical ? renderMobileFallbackDesign() : renderMobileStandardDesign();
  } else {
    return isFallbackDesign ? renderDesktopFallbackDesign() : renderDesktopStandardDesign();
  }
};

export default Banner;
