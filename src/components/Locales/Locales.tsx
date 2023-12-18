'use client'
import React from 'react';
import local from '../../components/../app/Constants/data.json'
import Card from '../Card/Card'
import Pagination from '@mui/material/Pagination'
import Dropdownone from './Dropdownone';
import { useState } from 'react';
import Link from 'next/link';
import { filterCat, filterLocal } from '@/server/utils/filters';

interface Local {
  local: string,
  n_local: number;
  email: string;
  contacto: string;
  celular: number;
  linea: number;
  ubicacion: string;
  categoria: string;
  rubro: string;
  rubroSecundario: string;
  horarios: string;
  logoLocal: string;
  fotoLocal: string;
  instagram: string;
  facebook: string;
  texto: string;
}

const Locales = () => {
    const [rubros, setRubros] = useState('All');
    const [page, setPage] = useState(1);
    const [filtros, setFiltros] = useState<Local[]>([]);

    const localPage = 9;
  
    // const locales = rubros === 'All'
    //   ? local
    //   : filterCat(rubros)

    let locales: Local[];

    if (rubros === 'All') {
      locales = local;
    } else if (filtros.length > 0) {
      locales = filtros;
    } else {
      locales = filterCat(rubros);
    }
    
    const pages = Math.ceil(locales.length / localPage);
  
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    const rubro = (data:string)=>{
      console.log('locales Data: ',data)
      setRubros(data)
      setPage(1)
      console.log('locales Rubro',rubros)
    }

    const checks = async (data: any) => {
      try {
        const localesChecks = await filterLocal(data);
        setFiltros(localesChecks);
        console.log('filtros: ', localesChecks);
      } catch (error) {
        console.error('Error al obtener datos: ', error);
      }
    };

    return (
        <section id="locales" className="mx-auto max-w-2xl pb-8 px-4 sm:pt-20 sm:pb-10 sm:px-6 lg:max-w-7xl lg:px-8">
           <article className="mx-auto max-w-4xl mt-8 pt-4 pb-4 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow"> 
                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                    <div className="col-span-8">
                        <Dropdownone selectRubro={rubro} selectedChecks={checks}/>
                    </div> 
                </div>
            </article>
            <article className='flex justify-center p-2 m-2'>
                <Pagination count={pages} page={page} onChange={handleChange} color='secondary'/>
            </article>
          <article className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8" data-aos="fade-right">
            {locales
            .sort((a, b) => a.local.localeCompare(b.local))
            .slice((page - 1) * localPage, page * localPage)
            .map((product, index) => (
                <Card product={product} key={index}  />
              ))
            }
          </article>
          <article className='flex justify-center p-2 m-2'>
            <Link href={'#locales'} >
                <Pagination count={pages} page={page} onChange={handleChange} color='secondary'/>
            </Link >
          </article>
        </section>
      );
    };
    
    export default Locales;
