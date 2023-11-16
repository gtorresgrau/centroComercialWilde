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

  return (
    <div className='grid grid-cols-3'>
        {facebook === 'No tengo'?null:<Link href={facebook} target="_blank" rel="noopener noreferrer"><FaFacebookSquare className='grid-cols-1 m-3' style={{color:'#4267B2'}} size={35}/></Link>}
        {instagram === 'No tengo'?null:<Link href={instagram} target="_blank" rel="noopener noreferrer"><FaInstagram size={32} className='grid-cols-1 m-3 rounded-xl p-1 mt-3.5' style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',color:'white'}}/></Link>}
        <Link href={`https://api.whatsapp.com/send?phone=54${contact}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp size={32} className='grid-cols-1 m-3 rounded-xl p-1 mt-3.5' style={{ background: '#25D366',color:'white'}}/></Link>        
        {linea === 0?null:<Link href={`tel:${linea}`} target="_blank" rel="noopener noreferrer"><FaPhone size={32} className='grid-cols-1 m-3 rounded-xl p-1 mt-3.5'/></Link>}  
    </div>
  )
}



export default RedesSociales;
