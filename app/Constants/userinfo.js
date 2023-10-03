//PLEASE FOLLOW THE FORMAT OF THIS FILE.

import { faGithubAlt, faLinkedinIn, faMediumM, faFacebook, faTwitter, faInstagram, faYoutube, faBehance, faWhatsapp, faPhone } from "@fortawesome/free-brands-svg-icons"

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
        { type: 'Phone', link:'https://api.whatsapp.com/send?phone=5491138498249', icon: faPhone },  
    ],
    banner:{
        title:'CENTRO COMERCIAL WILDE',
        subTitle:'Tu paseo de compras favorito',
        slogan:'Todo lo que necesitas esta aca!',
        button:'BUSCAR'
    }
}
export const residencia = {
        //this text goes on your landing page
        tab1: 'Residencia', 
        title: 'Residencia Estudiantil (Durante el Año):',
        parr1: 'Residencia Salomon durante el año, hospeda estudiantes universitarios en habitaciones y espacios compartidos.',
        parr2: 'Contamos con una ubicación estratégica respecto a las distintas intituciones educativas y zonas de interés. ',
    }

export const temporada = {
        tab2: 'Temporada',
        title: "Temporada de Verano:",
        parr1: 'En esta modalidad podes, alquilar tu habitacion privada con un somier de 2 plazas con opcion a incorporar un somier de 1 plaza o cama cucheta en caso de que se aloje con niños, la residencia se encuentra a 2 cuadras de la Av. Juan B. Justo, reconocida avenida de compras, y a 15 minutos de las playas mas reconocidas de la ciudad. Podes disfrutar de los espacios compartidos con nosotros y otros inquilinos.',
        items: ['Ubicación céntrica','Espacio con Parrilla','Salon living-comedor','Hogar a leña']
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