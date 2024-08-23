'use client'
import React, { useState } from 'react';
import useLocales from '../../Hooks/useLocales';
import Card from '../Card/Card';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import Pagination from '@mui/material/Pagination';
import Dropdownone from './Dropdownone';
import Modal from './Modal';
import { filterCat, filterLocal } from '../../Utils/filters';

const Locales = () => {
  const { locales, loading, setLocales } = useLocales();
  const [rubros, setRubros] = useState('All');
  const [page, setPage] = useState(1);
  const [filtros, setFiltros] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocal, setSelectedLocal] = useState(null);
  const localPage = 9;

  let filteredLocales = locales??[];
  const pages = Math.ceil(filteredLocales.length / localPage);
  
  // Filtrado de locales
  console.log('filteredLocales:', filteredLocales);

  // if (rubros !== 'All') {
  //   filteredLocales = filterCat(rubros, locales ?? []); // Si locales es undefined, se pasa un array vacío a filterCat
  // }

  // if (filtros.length > 0) {
  //   filteredLocales = filtros;
  // }

  filteredLocales = filteredLocales.filter(local =>
    Object.values(local).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );


  const handleChange = (value) => {
    setPage(value);
  };

  // const rubro = (data) => {
  //   const filteredLocales = filterCat(data, locales); // Pasando locales al filtro
    
  //   // Ensure that the type matches the expected type
  //   setLocales(filteredLocales);
  //   setPage(1);
  // };

  // const checks = async (data) => {
  //   try {
  //     const localesChecks = filterLocal(data, locales);
  //     if (localesChecks) {
  //       setFiltros(localesChecks);
  //     }
  //   } catch (error) {
  //     console.error('Error al obtener datos: ', error);
  //   }
  // };

  return (
    <section id="locales" className="mx-auto max-w-2xl pb-8 px-4 sm:pt-20 sm:pb-10 sm:px-6 lg:max-w-7xl lg:px-8">
      <article className="mx-auto max-w-4xl mt-8 pt-4 pb-4 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
        <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
          <div className="col-span-8">
            <div className="items-center mb-4 p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded">
              <h2 className="text-lg text-gray-500">Buscador</h2>
              <input type="text" placeholder="Buscar...(Nombre, Rubro, etc...)" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm" />
            </div>
            {/* <Dropdownone selectRubro={rubro} selectedChecks={checks} /> */}
          </div>
        </div>
      </article>
      <article className="flex justify-center p-2 m-2">
        {pages > 1 && !loading && (
          <Pagination count={pages} page={page} onChange={handleChange} color="secondary" />
        )}
      </article>
      <article className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8" data-aos="fade-right">
        {loading ? (
          Array.from({ length: localPage }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : filteredLocales.length === 0 ? (
          <div>No se encontraron locales.</div>
        ) : (
          filteredLocales
            .sort((a, b) => a.local.localeCompare(b.local))
            .slice((page - 1) * localPage, page * localPage)
            .map((product, index) => (
              <Card key={index} product={product} onOpen={() => setSelectedLocal(product)} />
            ))
        )}
      </article>
      <article className="flex justify-center p-2 m-2">
        {pages > 1 && !loading && (
          <Pagination count={pages} page={page} onChange={handleChange} color="secondary" />
        )}
      </article>
      {selectedLocal && (<Modal product={selectedLocal} onClose={() => {setSelectedLocal(null), window.history.pushState(null, '', window.location.pathname)}} />)}
    </section>
  );
};

export default Locales;
