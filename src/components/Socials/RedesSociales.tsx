"use client"
import Link from 'next/link';
import React from 'react';
import { FaFacebookSquare, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { TbWorldWww } from "react-icons/tb";

interface Sociales {
  instagram?: string,
  facebook?: string,
  contact?: number,
  linea?: number,
  email?: string,
  web?: string
}

const RedesSociales = ({ instagram = '', facebook = '', contact, linea = 0, email = '', web = '' }: Sociales) => {

  const textoPredefinido = 'Hola, te escribo desde la web del CCW.';
  const enviar = `https://wa.me/54${contact}?text=${encodeURIComponent(textoPredefinido)}`;

  return (
    <div className='flex flex-wrap'>
      {facebook && facebook !== 'No tengo' && (
        <Link href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebookSquare className='m-3' style={{ color: '#4267B2' }} size={35} />
        </Link>
      )}
      {instagram && instagram !== 'No tengo' && (
        <Link href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram size={32} className='m-3 rounded-xl p-1 mt-3.5'
            style={{
              background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
              color: 'white'
            }} />
        </Link>
      )}
      {contact && (
        <Link href={enviar} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <FaWhatsapp size={32} className='m-3 rounded-xl p-1 mt-3.5' style={{ background: '#25D366', color: 'white' }} />
        </Link>
      )}
      {linea !== 0 && (
        <Link href={`tel:${linea}`} target="_blank" rel="noopener noreferrer" aria-label="Phone">
          <FaPhone size={32} className='m-3 rounded-xl p-1 mt-3.5' />
        </Link>
      )}
      {email && email !== 'No tengo' && (
        <Link href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" aria-label="Email">
          <FaEnvelope size={32} className='grid-cols-1 m-3 rounded-xl p-1 mt-3.5' style={{ background: '#007bff', color: 'white' }} />
        </Link>
      )}
      {web && web !== 'No tengo' && (
        <Link href={web} target="_blank" rel="noopener noreferrer" aria-label="web">
          <TbWorldWww size={32} className='grid-cols-1 m-3 rounded-xl p-1 mt-3.5' style={{ background: '#007bff', color: 'white' }} />
        </Link>
      )}
    </div>
  );
}

export default RedesSociales;
