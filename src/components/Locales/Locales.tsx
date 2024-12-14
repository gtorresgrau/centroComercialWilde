import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card/Card';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import Pagination from '@mui/material/Pagination';
import Modal from './Modal';
import { Local } from '@/src/types/interfaces';
import { fetchLocales } from '@/src/Utils/fetchLocales';

const Locales = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [locale, setLocale] = useState<Local[]>([]);
  const [displayLocales, setDisplayLocales] = useState<Local[]>([]);
  const [selectedLocal, setSelectedLocal] = useState<Local | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const localPage = 9;

  // Ref para prevenir ejecución múltiple
  const isInitialized = useRef(false);

  useEffect(() => {
    const loadLocales = async () => {
      try {
        const fetchedLocales = await fetchLocales();
        setLocale(fetchedLocales);
        shuffleLocales(fetchedLocales); // Mezclar inicialmente
        setLoading(false);

        // Chequeo de hash en URL
        if (!isInitialized.current) {
          const hash = window.location.hash;
          if (hash) {
            const localId = hash.replace('#', '').replace(/_/g, ' ');
            const targetLocal = fetchedLocales.find(
              (local: { local: string }) => local.local === localId
            );
            if (targetLocal) {
              setSelectedLocal(targetLocal);
              open(); // Abre el modal si hay hash válido
            }
          }
          isInitialized.current = true; // Marcar como inicializado
        }
      } catch (error) {
        console.error('Error al cargar los locales:', error);
        setLoading(false);
      }
    };

    loadLocales();
  }, []);

  // Función para mezclar locales
  const shuffleLocales = (localesList: Local[]) => {
    const shuffledLocales = [...localesList].sort(() => Math.random() - 0.5);
    setDisplayLocales(shuffledLocales);
    setIsSorted(false);
  };

  // Función para ordenar locales alfabéticamente
  const sortLocalesAlphabetically = () => {
    const sortedLocales = [...displayLocales].sort((a, b) => {
      const localA = a.local || '';
      const localB = b.local || '';
      return localA.localeCompare(localB);
    });
    setDisplayLocales(sortedLocales);
    setIsSorted(true);
  };

  // Procesar locales para búsqueda
  let locales: Local[] = displayLocales.map((item) => ({
    ...item,
    linea: item.linea !== null ? item.linea : 0,
  }));

  // Filtrado por búsqueda
  locales = locales.filter((local) =>
    Object.values(local).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const pages = Math.ceil(locales.length / localPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <section id="locales" className="mx-auto max-w-2xl pb-8 px-4 sm:pt-20 sm:pb-10 sm:px-6 lg:max-w-7xl lg:px-8">
      <article className="mx-auto max-w-4xl mt-8 pt-4 pb-4 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
        <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
          <div className="col-span-8">
            <div className="items-center mb-4 p-4 shadow-lg rounded">
              <h2 className="text-lg text-gray-500">Buscador</h2>
              <input
                type="text"
                placeholder="Buscar...(Nombre, Rubro, etc...)"
                value={searchQuery}
                onChange={handleSearchChange}
                className="rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={isSorted ? () => shuffleLocales(locale) : sortLocalesAlphabetically}
                className="px-4 py-2 bg-bgpurple hover:bg-bgpink hover:text-bgpurple text-white rounded-lg shadow"
              >
                {isSorted ? 'Mostrar Aleatoriamente' : 'Ordenar Alfabéticamente'}
              </button>
            </div>
          </div>
        </div>
      </article>
      <article className="flex justify-center p-2 m-2">
        {pages > 1 && !loading && (
          <Pagination count={pages} page={page} onChange={handleChange} color="secondary" siblingCount={0} />
        )}
      </article>
      <article className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8" data-aos="fade-right">
        {loading ? (
          Array.from({ length: localPage }).map((_, index) => <CardSkeleton key={index} />)
        ) : locales.length === 0 ? (
          <div>No se encontraron locales.</div>
        ) : (
          locales.slice((page - 1) * localPage, page * localPage).map((product, index) => (
            <Card key={index} product={product} onOpen={() => setSelectedLocal(product)} />
          ))
        )}
      </article>
      <article className="flex justify-center p-2 m-2">
        {pages > 1 && !loading && (
          <Pagination count={pages} page={page} onChange={handleChange} color="secondary" siblingCount={0} />
        )}
      </article>
      {selectedLocal && (
        <Modal
          product={selectedLocal}
          onClose={() => {
            setSelectedLocal(null);
            window.history.pushState(null, '', window.location.pathname);
          }}
        />
      )}
    </section>
  );
};

export default Locales;
