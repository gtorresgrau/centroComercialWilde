"use client"
import React, { Component } from "react";
import Slider from "react-slick";
import { dataCarrusel } from "./dataCarrusel";
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
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };
        return (
            <section className='text-center bg-lightpink' >
                <article className="mx-auto max-w-2xl py-8 px-4s sm:px-6 lg:max-w-[90%] lg:px-6">
                        <Slider {...settings} className='flex items-center justify-center'>
                            {dataCarrusel.map((item, i) =>
                                <div key={i} className='flex items-center justify-center'>
                                    <Image src={item.imgSrc} alt={item.imgSrc} width={200} height={200}/>
                                </div>
                            )}
                        </Slider>
                </article>
            </section>
        )
    }
}
