"use client"
import React, { Component } from "react";
import Slider from "react-slick";
import { dataCarrusel } from "./dataCarrusel";
import Image from "next/image";

// IMAGES DATA FOR CAROUSEL
interface carrusel {
    imgSrc: string;
}
// CAROUSEL SETTINGS
export default class MultipleItems extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 4,
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
                <article className="mx-auto max-w-2xl py-6 px-4s sm:px-6 lg:max-w-7xl lg:px-6">
                    <h2 className="text-lg my-4 text-lightgrey">Locales que encontraras a lo largo de nuestro paseo de compras</h2>
                        <Slider {...settings}>
                            {dataCarrusel.map((item, i) =>
                                <div key={i}>
                                    <Image src={item.imgSrc} alt={item.imgSrc} width={150} height={150}/>
                                </div>
                            )}
                        </Slider>
                </article>
            </section>
        )
    }
}
