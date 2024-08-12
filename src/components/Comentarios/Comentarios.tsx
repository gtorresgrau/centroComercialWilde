"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import Link from "next/link";
import postData from '../../components/../app/Constants/comentarios.json';

export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            autoplay: false,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }
            ]
        };

        return (
            <section id="comentarios" className=' bg-bgpink'>
                <div className="items-center mx-auto max-w-2xl px-4 pt-16 pb-64 sm:pt-32 lg:max-w-7xl lg:px-8">
                    <div className='sm:flex justify-around items-center pb-6'>
                        <div>
                            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Algunas Opiniones<br /> de nuestra comunidad</h2>
                            <p className='text-lg font-medium pb-6'>Tu opinión nos hace ser mejores</p>
                        </div>
                        <Link href='https://g.page/r/CU6sSa1t1sIcEBM/review' target="_blank" rel="noopener noreferrer">
                            <button className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrey hover:border-transparent rounded">Déjanos un mensaje!</button>
                        </Link>
                    </div>
                    <Slider {...settings} >
                        {postData.map((items, i) => (
                            <article key={i} >
                                <div className='flex flex-col justify-start bg-white m-4 pt-8 px-12 pb-10 text-center rounded-lg'style={{minHeight:'500px', height:'auto'}}>
                                    <div>
                                    <div className='relative'>
                                        <img src={items.imgSrc} alt="gaby" className="inline-block h-16 w-16 m-auto rounded-full ring-2 ring-white" loading='lazy'/>
                                        <img src={'/assets/students/greenpic.svg'} alt="greenbg" className=" absolute inline-block h-6 w-6 position-green" loading='lazy'/>
                                    </div>
                                    <h2 className='text-md p-2'>{items.profession}</h2>
                                    <h2 className='text-2xl font-semibold pb-3'>{items.name}</h2>
                                    <img src={items.starimg} alt="stars-img" className='m-auto pb-6' loading='lazy' />
                                    <p className='text-lg font-medium leading-9'>{items.detail}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </Slider>
                </div>
            </section>
        );
    }
}
