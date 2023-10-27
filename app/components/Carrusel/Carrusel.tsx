"use client"
import React, { Component } from "react";
import Slider from "react-slick";
import { dataCarrusel } from "./dataCarrusel";
import { userinfo} from '../../Constants/userinfo';
import Image from "next/image";

// IMAGES DATA FOR CAROUSEL
interface dataCarrusel {
    imgSrc: string;
}
// CAROUSEL SETTINGS
export default class MultipleItems extends Component {
    render() {
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
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1.5,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    },
                }
            ]
        };

        return (
            <article className='text-center'>
              <div className="mx-auto max-w-2xl py-6 px-4s sm:px-6 md:max-w-[98%] lg:px-6 relative">
                <Slider {...settings} className='flex items-center justify-center'>
                  {dataCarrusel.map((item, i) =>
                    <div key={i} className='flex items-center justify-center m-4 md:bg-lightpink'>
                      <Image src={item.imgSrc} alt={item.imgSrc} width={165} height={165} />
                    </div>
                  )}
                </Slider>
                <p className="m-6 text-lg leading-8 text-black transparent-bg">{userinfo.banner.slogan1}<br/>{userinfo.banner.slogan2}</p>
              </div>
            </article>
          );
    }
}
