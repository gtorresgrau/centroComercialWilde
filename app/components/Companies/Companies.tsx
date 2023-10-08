"use client"
import React, { Component } from "react";
import Slider from "react-slick";
import { carrusel } from "@/app/Constants/userinfo";

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
        console.log('carrusel:',carrusel)
        return (
            <section className='text-center bg-lightpink' >
                <article className="mx-auto max-w-2xl py-10 px-4s sm:px-6 lg:max-w-7xl lg:px-6">
                    <h2 className="text-lg my-4 text-lightgrey">Locales que encontraras a lo largo de nuestro paseo de compras</h2>
                        <Slider {...settings}>
                            {carrusel.map((item, i) =>
                                <div key={i}>
                                    <img src={item.imgSrc} alt={item.imgSrc} />
                                </div>
                            )}
                        </Slider>
                </article>
            </section>
        )
    }
}
