'use client'
// Locales DATA

import React from 'react';
import local from '../../Constants/data.json'
import Card from '../Card/Card'
import Dropdownone from '../Banner/Dropdownone';
import { useState } from 'react';

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

const Locales = () => {
    const [rubroo,setRubroo]=useState('All')
    
const rubro= (data:any)=>{
        console.log('esta es la data ',data)
        setRubroo(data)
        console.log('rubro estado',rubroo)
    }

    return (
        <section id="locales" className="mx-auto max-w-2xl pb-16 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8">
                <article className="mx-auto max-w-4xl mt-8 pt-4 pb-4 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow"> 
                    <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                        <div className="col-span-8"><Dropdownone selectRubro={rubro} /></div>                       
                    </div>
                </article>
                <article className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {rubroo === 'All' ?
                        local.slice().sort((a, b) => a.local.localeCompare(b.local))
                        .map((product, index) => <Card product={product} key={index} />)
                        :
                        local.filter((l) => l.rubro === rubroo)
                        .map((product, index) => <Card product={product} key={index} />)
                    }
                </article>
        </section>
    )
}

export default Locales;
