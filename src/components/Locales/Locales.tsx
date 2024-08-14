import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import CardSkeleton from '../CardSkeleton/CardSkeleton'; // Importa el esqueleto
import Pagination from '@mui/material/Pagination';
import Dropdownone from './Dropdownone';
import { filterCat, filterLocal } from '@/server/utils/filters';
import Modal from './Modal';

interface Local {
  local: string;
  n_local: number;
  email: string;
  contacto: string;
  celular: number;
  linea: number | null;
  ubicacion: string;
  categoria: string;
  rubro: string;
  rubroSecundario: string;
  horarios: string;
  logoLocal: string;
  fotoLocal: string;
  instagram: string;
  facebook: string;
  web?:string;
  texto?: string;
}

const Locales = () => {
  const [rubros, setRubros] = useState('All');
  const [page, setPage] = useState(1);
  const [filtros, setFiltros] = useState<Local[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locale, setLocale] = useState<Local[]>([]);
  const [selectedLocal, setSelectedLocal] = useState<Local | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const localPage = 9;

  // Función para obtener locales de la API
  const fetchLocales = async () => {
    const res = await fetch('/api/locales/locales');
    if (!res.ok) {
      throw new Error('Error al cargar los locales');
    }
    const data = await res.json();
    return data.locales;
  };

  useEffect(() => {
    const loadLocales = async () => {
      try {
        const fetchedLocales = await fetchLocales();
        setLocale(fetchedLocales);
        setLoading(false); // Detener la carga cuando los datos estén listos

        // Check if URL has a hash (e.g., #nombre_del_local)
        const hash = window.location.hash;
        if (hash) {
          const localId = hash.replace('#', '').replace(/_/g, ' ');
          const targetLocal = fetchedLocales.find((local: { local: string }) => local.local === localId);
          if (targetLocal) {
            setSelectedLocal(targetLocal);
            open(); // Abre el modal si se encontró el local
          }
        }
      } catch (error) {
        console.error('Error al cargar los locales: ', error);
        setLoading(false); // Detener la carga en caso de error
      }
    };
    
    loadLocales();
  }, []);

  // Procesar los locales
  let locales: Local[] = locale.map(item => ({
    ...item,
    linea: item.linea !== null ? item.linea : 0, // Defaulting null linea to 0 or handle appropriately
  }));

  // Filtrado de locales
  if (rubros === 'All') {
    locales = locale;
  } else if (filtros.length > 0) {
    locales = filtros;
  } else {
    locales = filterCat(rubros);
  }

  // Filtrado por búsqueda
  locales = locales.filter(local =>
    Object.values(local).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const pages = Math.ceil(locales.length / localPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rubro = (data: string) => {
    setRubros(data);
    setPage(1);
  };

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
            <div className="items-center mb-4 p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded">
              <h2 className="text-lg text-gray-500">Buscador</h2>
              <input
                type="text"
                placeholder="Buscar...(Nombre, Rubro, etc...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm"
              />
            </div>
            <Dropdownone selectRubro={rubro} selectedChecks={checks} />
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
        ) : locales.length === 0 ? (
          <div>No se encontraron locales.</div>
        ) : (
          locales
            .sort((a, b) => {
              const localA = a.local || '';
              const localB = b.local || '';
              return localA.localeCompare(localB);
            })
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
      {selectedLocal && (
        <Modal
          product={selectedLocal}
          onClose={() => {
            setSelectedLocal(null);
            window.history.pushState(null, '', window.location.pathname); // Remove hash from URL when closing modal
          }}
        />
      )}
    </section>
  );
};

export default Locales;
