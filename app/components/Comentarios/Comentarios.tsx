"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import Link from "next/link";
import postData from '../../Constants/comentarios.json';


interface DataType {
    profession: string;
    name: string;
    imgSrc: string;
    starimg: string;
    detail: string;
}



export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
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
                        slidesToScroll: 1,
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
            <div id="testimonial-section" className='bg-bgpink'>
                <div className="mx-auto max-w-2xl px-4 pt-16 pb-64 sm:pt-32 lg:max-w-7xl lg:px-8">
                    <div className='sm:flex justify-between items-center pb-6'>
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Algunas Opiniones<br /> de nuestra comunidad</h2>
                        <div>
                            <Link href='https://g.page/r/CU6sSa1t1sIcEBM/review' target="_blank" rel="noopener noreferrer">
                                <button className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrey hover:border-transparent rounded">Dejanos un mensaje!</button>
                            </Link>
                        </div>
                    </div>
                    <p className='text-lg font-medium pb-12'>Tu opinion nos hace ser mejores</p>
                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>
                                <div className='bg-white m-4 pt-8 px-12 pb-10 text-center rounded-lg'>
                                    <div className='relative'>
                                        <img src={items.imgSrc} alt="gaby" className="inline-block h-16 w-16 m-auto rounded-full ring-2 ring-white" />
                                        <img src={'/assets/students/greenpic.svg'} alt="greenbg" className=" absolute inline-block h-6 w-6 position-green" />
                                    </div>
                                    <h2 className='text-md p-2'>{items.profession}</h2>
                                    <h2 className='text-2xl font-semibold pb-3'>{items.name}</h2>
                                    <img src={items.starimg} alt="stars-img" className='m-auto pb-6' />
                                    <p className='text-lg font-medium leading-9'>{items.detail}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}
