import React, { useState, useEffect, useCallback } from 'react';
import { userinfo } from '../../components/../app/Constants/userinfo';
import Carrusel from '../Carrusel/Carrusel';
import s from './globo.module.css';

const Banner = () => {
    const [backgroundUrl, setBackgroundUrl] = useState('/assets/banner/background.webp');
    const [isFallbackDesign, setIsFallbackDesign] = useState(false); // Estado para manejar el diseño alternativo

    // Function to handle the balloon click
    const handleBalloonClick = useCallback(() => {
        window.location.href = '#sorteo';
    }, []);

    // Fetch the background image from the server
    const fetchBackgroundImage = async () => {
        try {
            const response = await fetch('/api/upload/getImageBanner');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            const { backgroundUrl } = data;

            // Handle if the background URL is valid or needs to fall back
            if (backgroundUrl && backgroundUrl !== '/assets/banner/background.webp') {
                setBackgroundUrl(backgroundUrl);
                setIsFallbackDesign(false); // Usamos el diseño original
            } else {
                setBackgroundUrl('/assets/banner/background.webp');
                setIsFallbackDesign(true); // Usamos el diseño alternativo
            }
        } catch (error) {
            console.error('Error al obtener la URL del fondo:', error);
            setBackgroundUrl('/assets/banner/background.webp');
            setIsFallbackDesign(true); // Si falla, se utiliza el diseño alternativo
        } 
    };

    useEffect(() => {
        fetchBackgroundImage();
    }, []); // Only run on component mount

    // Diseño alternativo
    const renderStandardDesign = () => (
        <section className="relative"
            style={{
                backgroundImage: `url(${backgroundUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed', // Para efecto "parallax" opcional
                height: '100vh', // Asegura que ocupe toda la altura de la pantalla
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
                <div className={`${s.balloon} cursor-pointer z-10`} onClick={handleBalloonClick} > SORTEO </div>
            </article>
        </section>
        );

    // Diseño estándar
    const renderFallbackDesign = () => (
        <section className="relative" style={{ backgroundImage: `url(${backgroundUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <article className="items-center relative pb-6 md:h-screen">
                <div className="mx-auto max-w-5xl pt-8 sm:py-12 md:py-4 xxl:py-12">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight sm:my-6 md:my-2 xl:my-6"
                            style={{
                                background: 'linear-gradient(to right, #9C27B0, #1E1E1E)',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {userinfo.banner.title}
                        </h1>
                        <h2 className="text-3xl sm:text-4xl sm:font-bold tracking-tight text-gray-900 sm:text-60px md:4px sm:my-6 md:my-2 xl:my-6">
                            {userinfo.banner.subTitle}
                        </h2>
                    </div>
                </div>
                <div className={`${s.balloon} cursor-pointer z-10`} onClick={handleBalloonClick}>
                    SORTEO
                </div>

                {/* Conditionally render Carrusel only after loading and if hide is false */}
                 <Carrusel />
            </article>
        </section>
    );

    return isFallbackDesign ? renderFallbackDesign() : renderStandardDesign();
};

export default Banner;
