"use client";
import React from "react";
import Slider from "react-slick";
import { dataCarrusel } from "./dataCarrusel";
import { userinfo } from "../../components/../app/Constants/userinfo";
import { DataCarrusel } from "@/src/types/interfaces";

// IMAGES DATA FOR CAROUSEL


// CAROUSEL SETTINGS
const MultipleItems: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1.01,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <article className="text-center" aria-label="Imagenes destacadas">
      <div className="mx-auto max-w-2xl py-6 mt-6 md:max-w-[100%] xxl:py-12 relative"  role="region" aria-live="polite">
        <Slider {...settings} className="flex items-center justify-center">
          {dataCarrusel.map((item: DataCarrusel, i: number) => (
            <div key={i} className="flex items-center justify-center m-2 md:bg-lightpink">
              <img src={item.imgSrc} width={165} height={165} loading="lazy" alt="imagenes publicidad locales" aria-label="imagenes publicidad locales"/>
            </div>
          ))}
        </Slider>
        <h3 className="m-6 mb-24 xxl:mt-24 text-lg leading-8 text-black transparent-bg">
          {userinfo.banner.slogan1}
          <br />
          {userinfo.banner.slogan2}
        </h3>
      </div>
    </article>
  );
};

export default MultipleItems;
