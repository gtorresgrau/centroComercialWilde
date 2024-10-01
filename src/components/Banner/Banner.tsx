import React from 'react';
import { userinfo } from '../../components/../app/Constants/userinfo';
import Carrusel from '../Carrusel/Carrusel';
import s from './globo.module.css';

const Banner = () => {
    const handleBalloonClick = () => {
        window.location.href = '#sorteo';
    };

    return (
        <section className="banner-image relative">
            <article className="items-center relative pb-6 lg:h-screen">
                <div className="mx-auto max-w-5xl pt-8 sm:py-12 md:py-4 xxl:py-12">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight sm:my-6 md:my-2 xl:my-6" style={{ 
                            background: 'linear-gradient(to right, #9C27B0, #1E1E1E)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}>{userinfo.banner.title}</h1>
                        <h2 className="text-3xl sm:text-4xl sm:font-bold tracking-tight text-gray-900 sm:text-60px md:4px sm:my-6 md:my-2 xl:my-6">{userinfo.banner.subTitle}</h2>
                    </div>
                </div>
                <div className={`${s.balloon} cursor-pointer z-10`} onClick={handleBalloonClick}>SORTEO </div>
                <Carrusel />
            </article>
        </section>
    );
}

export default Banner;
