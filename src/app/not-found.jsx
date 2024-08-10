/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function Notfound() {
  return (
    <div className="bg-[#FCF5EF] flex flex-col justify-center h-screen items-center text-center p-4">
        <img 
          src="assets/logo/administracion.webp"
          alt="Logo"
          className="w-[50%] md:w-[30%]"
          loading='lazy'
        />
        <div>
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
        </div>
        <Link href="/">
          <p className="text-blue-500 hover:text-blue-700 text-lg">Volver a la página principal</p>
        </Link>
    </div>
  );
}
