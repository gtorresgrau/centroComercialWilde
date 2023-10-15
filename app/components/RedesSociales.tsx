import Link from 'next/link';
import React from 'react'
import { FaWhatsapp, FaFacebookSquare, FaInstagram, FaVoicemail } from "react-icons/fa";


export default function RedesSociales() {

  return (
    <div className='grid grid-cols-3'>
        <FaFacebookSquare   className='grid-cols-1 m-3 ' style={{color:'#4267B2'}} size={35}/>
        <FaInstagram size={32} className='grid-cols-1 m-3 rounded-xl p-1 mt-3.5' style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',color:'white'}}/>
        <FaWhatsapp size={35} className='grid-cols-1 m-3' style={{color:'#25D366'}}/>
    </div>
  )
}
