//PLEASE FOLLOW THE FORMAT OF THIS FILE.

import {faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"

export const userinfo = {
    logoText: "Centro Comercial Wilde", //This text is visible on your navbar and footer like your logo.
    contact: {
        email: 'ccw@gmail.com', //It is always a good idea to mention your email on your website. Good platform to communicate.
        phone: '1138498249', //Phone number is optional, if you dont want it, consider leaving it blank .
        countrycode: '+54' //It is advisable to add the country code incase you mention your contact number.
    },
    socials: [
        //For aesthetics, it is advisable for you to mention upto 4 social media links only. Fill in the links.
        //more icons are imported above, use as you like them.
        { type: 'Facebook', link: 'https://www.facebook.com/centrocomercialwilde/?locale=es_LA', icon: faFacebook },
        { type: 'Instagram', link: 'https://www.instagram.com/wildecentrocomercial/', icon: faInstagram },
        { type: 'WhatsApp', link:'https://api.whatsapp.com/send?phone=5491131635166', icon: faWhatsapp },
        { type: 'Phone', link:'https://api.whatsapp.com/send?phone=5491138498249' },  
    ],
    banner:{
        title:'CENTRO COMERCIAL WILDE',
        subTitle:'Tu paseo de compras favorito',
        slogan:'Todo lo que necesitas esta aca!',
        button:'BUSCAR'
    }
}

export const carrusel = [
    {
        imgSrc: 'https://res.cloudinary.com/dd4lvbjsy/image/upload/v1696608071/CCW/casa_analia_hw5l5r.svg'
    },
    {
        imgSrc: 'https://res.cloudinary.com/dd4lvbjsy/image/upload/v1696608071/CCW/casa_analia_hw5l5r.svg'
    },
    {
        imgSrc: 'https://res.cloudinary.com/dd4lvbjsy/image/upload/v1696608071/CCW/casa_analia_hw5l5r.svg'
    },
    {
        imgSrc: "https://res.cloudinary.com/dd4lvbjsy/image/upload/v1696608071/CCW/casa_analia_hw5l5r.svg"
    },
]

export const news = {
        //this text goes on your landing page
        title: 'Join Our Newsletter', 
        subTitle: 'Subscribe our newsletter for discounts, promo and many more.',
        btn: 'Subscribe',
    }
    

export const headings = {
    //you can customise all the headings here.
    workHomePage: 'Habitaciones',
    workMainPage: 'Nuestro Hostel',
    capabilities: 'Servicios',
    about: 'Nosotros',
    education: 'Sitios de Interés',
    experience: 'Experiencias',
    blogs: 'BLOG!',
    contact: 'Contacto',
    residencia: 'Residencia / Temporada',
}

export const ctaTexts = {
    //you can customise all the cta texts here.
    btn1: 'Residencia / Temporada',
    workCTA: 'Ver todos',
    capabCTA: 'Estamos en contacto',
    educationCTA: 'Escribime',
    resumeCTA: 'Inicio',
    submitBTN: 'Enviar'
}