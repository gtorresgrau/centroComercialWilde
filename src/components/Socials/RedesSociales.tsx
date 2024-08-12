"use client"
import Link from 'next/link';
import React from 'react'
import { FaFacebookSquare, FaInstagram, FaWhatsapp, FaPhone } from 'react-icons/fa';

interface sociales {
  instagram: string,
  facebook: string,
  contact: number,
  linea: number,

}

const RedesSociales = ({instagram, facebook, contact, linea}: sociales ) => {

  const textoPredefinido = 'Hola, te escribo desde la web del CCW.';
  const enviar = `https://wa.me/54${contact}?text=${encodeURIComponent(textoPredefinido)}`;

  return (
    <div className='grid grid-cols-3' >
        {facebook === 'No tengo'?null:<Link href={facebook} target="_blank" rel="noopener noreferrer"><FaFacebookSquare className='grid-cols-1 m-3' style={{color:'#4267B2'}} size={35} aria-label='facebook' name='facebook'/></Link>}
        {instagram === 'No tengo'?null:<Link href={instagram} target="_blank" rel="noopener noreferrer"><FaInstagram size={32} name='instagram' className='grid-cols-1 m-3 rounded-xl p-1 mt-3.5' aria-label='instagram' style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',color:'white'}}/></Link>}
        <Link href={enviar} target="_blank" rel="noopener noreferrer"><FaWhatsapp size={32} name='whatsapp' className='grid-cols-1 m-3 rounded-xl p-1 mt-3.5' style={{ background: '#25D366',color:'white'}} aria-label='whatsapp' /></Link>        
        {linea === 0?null:<Link href={`tel:${linea}`} target="_blank" rel="noopener noreferrer"><FaPhone size={32} name='telefono' className='grid-cols-1 m-3 rounded-xl p-1 mt-3.5' aria-label='telefgono'/></Link>}  
    </div>
  )
}



export default RedesSociales;
