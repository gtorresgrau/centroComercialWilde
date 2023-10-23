'use client'
// Locales DATA

import React from 'react';
import local from '../../Constants/data.json'
import Card from '../Card/Card'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
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

const [rubroo,setRubroo] = useState('All')


const [page, setPage] = useState(1);
const [localPage] = useState(10);
const [, setOrden] = useState(1);

let indexLastLocal =  page * localPage;
let indexFirstLocal = indexLastLocal - localPage
    
if(page === 1){
    indexLastLocal = 9;
    indexFirstLocal = 0;
}else{
    indexLastLocal = indexLastLocal -1;
    indexFirstLocal = indexFirstLocal -1;
};
    
const locales = local.slice(indexFirstLocal, indexLastLocal);
let pages = Math.ceil(local.length/localPage)
let pageNumber = [];

if(local.length - 8 > 0) pages += 1;
for(let i=1; i<= pages ; i++){
        pageNumber.push(i)
    }

const rubro = (data:any)=>{
        console.log('esta es la data ',data)
        setRubroo(data)
        console.log('rubro estado',rubroo)
    }

const handleChange = (event: React.ChangeEvent<unknown>, value: number)=>{
    setPage(value)
}
    return (
        <section id="locales" className="mx-auto max-w-2xl pb-16 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8">
                <article className="mx-auto max-w-4xl mt-8 pt-4 pb-4 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow"> 
                    <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                        <div className="col-span-8"><Dropdownone selectRubro={rubro} /></div>                       
                    </div>
                </article>
                <article className='flex justify-center p-2 m-2'>
                    <Pagination count={pages} page={page} onChange={handleChange} color='secondary'/>
                </article>
                <article className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {rubroo === 'All' ?
                        locales.slice().sort((a, b) => a.local.localeCompare(b.local))
                        .map((product, index) => <Card product={product} key={index} />)
                        :
                        locales.filter((l) => l.rubro === rubroo)
                        .map((product, index) => <Card product={product} key={index} />)
                    }
                </article>
                <article className='flex justify-center p-2 m-2'>
                    <Pagination count={pages} page={page} onChange={handleChange} color='secondary'/>
                </article>
        </section>
    )
}

export default Locales;
