import React, { useState } from 'react';
import local from '../../components/../app/Constants/data.json';
import Card from '../Card/Card';
import Pagination from '@mui/material/Pagination';
import Dropdownone from './Dropdownone';
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
  texto?: string;
}

const Locales = () => {
    const [rubros, setRubros] = useState('All');
    const [page, setPage] = useState(1);
    const [filtros, setFiltros] = useState<Local[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const localPage = 9;

    let locales: Local[];

    if (rubros === 'All') {
      locales = local;
    } else if (filtros.length > 0) {
      locales = filtros;
    } else {
      locales = filterCat(rubros);
    }
    
    locales = locales.filter(local =>
      Object.values(local).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    
    const pages = Math.ceil(locales.length / localPage);
  
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };

    const rubro = (data:string)=>{
      setRubros(data)
      setPage(1);
    }

    const checks = async (data: any) => {
      try {
        const localesChecks = await filterLocal(data);
        setFiltros(localesChecks);
      } catch (error) {
        console.error('Error al obtener datos: ', error);
      }
    };

    return (
        <section id="locales" className="mx-auto max-w-2xl pb-8 px-4 sm:pt-20 sm:pb-10 sm:px-6 lg:max-w-7xl lg:px-8">
           <article className="mx-auto max-w-4xl mt-8 pt-4 pb-4 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow"> 
                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                    <div className="col-span-8">
                     <div className=" items-center mb-4 p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded">
                        <h2 className='text-lg text-lightgrey'>Buscador</h2>
                        <input 
                          type="text" 
                          placeholder="Buscar...(Nombre, Rubro, etc...)" 
                          value={searchQuery} 
                          onChange={e => setSearchQuery(e.target.value)}
                          className="rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm"
                        />
                      </div>
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
                ))}
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
