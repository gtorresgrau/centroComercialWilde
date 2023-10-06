// Locales DATA

import React from 'react';
import local from '../../Constants/locales.json'
import Card from '../Card/Card'

interface local {
    email: string;
    n_local: string;
    contacto: string;
    celular: string;
    ubicacion: string;
    rubro: string;
    horarios: string;
    imagen: string;
    redes_sociales: string;
}

const Mentor = () => {
    return (
        <section id="mentors-section" className="mx-auto max-w-2xl pb-16 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8">
            <article className='sm:flex justify-between items-center mb-12'>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Conocenos</h2>
                <div>
                    <button className="bg-transparent hover:bg-purple text-purple font-medium hover:text-white py-3 px-4 border border-lightgrey hover:border-transparent rounded">
                        Ver todos los Locales
                    </button>
                </div>
            </article>
                <article className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {local.map((product, index) => (
                        <Card product={product} key={index}/>
                      ))}
                </article>
        </section>
    )
}

export default Mentor;
