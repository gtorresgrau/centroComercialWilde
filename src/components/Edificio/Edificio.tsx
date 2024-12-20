"use client"
import Slider from "react-slick";
import React, { Component } from "react";


const images = [
  {src:"/assets/edificio/barra.webp", alt:'Barra con enchufes'},
  {src:"/assets/edificio/CoWork1.webp", alt:'Area Co-Working'},
  {src:"/assets/edificio/CoWork2.webp", alt:'Area Co-Working'},
  {src:"/assets/edificio/wifi2.webp", alt:'Hall Central'},
  {src:"/assets/edificio/PB-a.webp", alt:'Planta Baja'},
  {src:"/assets/edificio/PB-b.webp", alt:'Planta Baja'},
];

  export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 4.5,
            slidesToScroll: 4,
            arrows: false,
            autoplay: false,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2.5,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        centerMode:true,
                        slidesToShow: 1.01,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }
            ]
        };
    return (
      <section id='edificio'>
        <h2 className="flex flex-row justify-center items-center text-2xl sm:text-5xl font-bold tracking-tight text-gray-900 m-8" style={{ background: 'linear-gradient(to right, #9C27B0, #1E1E1E)', WebkitBackgroundClip: 'text',color: 'transparent' }}>BIENVENIDOS!!</h2> 
        <p className="p-2 text-lg md:text-center font-medium leading-9 mx-8">El centro comercial es un paseo de tres pisos y una galeria externa llena de locales.<br/>Ademas, en el corazon del Hall central te espera un acogedor espacio de CoWorking. Equipado con enchufes, conexión wifi, café y mucha buena onda.<br/>¡Te invitamos a sumergirte en la energía positiva de nuestro centro comercial y disfrutar de todas las comodidades que ofrecemos!</p>
        <Slider {...settings} >
            {images.map((img, i) => (
                <article key={i} className="p-2 rounded-xl shadow-xl" >
                    <img alt={img.alt} src={img.src} title={img.alt} loading='lazy'className="rounded-xl" />
                </article>
            ))}
        </Slider>
      </section>
    )
  }
}

