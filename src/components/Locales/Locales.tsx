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
  const [locales, setLocales] = useState<Local[]>([]);
  const [displayLocales, setDisplayLocales] = useState<Local[]>([]);
  const [selectedLocal, setSelectedLocal] = useState<Local | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSorted, setIsSorted] = useState(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const localPage = 9;

  // Carga inicial de locales
  useEffect(() => {
    const loadLocales = async () => {
      try {
        const fetchedLocales = await fetchLocales();
        setLocales(fetchedLocales);
        shuffleLocales(fetchedLocales);
        setLoading(false);
        handleHashNavigation(fetchedLocales);
      } catch (error) {
        console.error('Error al cargar los locales:', error);
        setLoading(false);
      }
    };
    loadLocales();
  }, []);

  // Manejo del hash en la URL para navegación directa
  const handleHashNavigation = (fetchedLocales: Local[]) => {
    const hash = window.location.hash;
    if (hash) {
      const localId = hash.replace('#', '').replace(/_/g, ' ');
      const targetLocal = fetchedLocales.find((local) => local.local === localId);
      if (targetLocal) setSelectedLocal(targetLocal);
    }
  };

  // Mezcla aleatoria de locales
  const shuffleLocales = (localesList: Local[]) => {
    const shuffled = [...localesList].sort(() => Math.random() - 0.5);
    setDisplayLocales(shuffled);
    setIsSorted(false);
  };

  // Ordenar locales alfabéticamente
  const sortLocalesAlphabetically = () => {
    const sorted = [...displayLocales].sort((a, b) => (a.local || '').localeCompare(b.local || ''));
    setDisplayLocales(sorted);
    setIsSorted(true);
  };

  // Filtrar locales según búsqueda
  const filterLocales = () => {
    return displayLocales.filter((local) =>
      Object.values(local).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const filteredLocales = filterLocales();
  const totalPages = Math.ceil(filteredLocales.length / localPage);

  // Manejo del cambio en la página
  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Manejo del cambio en el buscador con debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => setPage(1), 300);
  };

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);
  

  return (
    <section className="mx-auto max-w-2xl pb-8 px-4 sm:pt-20 sm:pb-10 sm:px-6 lg:max-w-7xl lg:px-8">
      {/* Buscador y botones */}
      <div className="mx-auto max-w-4xl mt-8 pt-4 pb-4 px-6 bg-white rounded-lg boxshadow">
        <div className="mb-4 p-4 shadow-lg rounded">
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
            onClick={isSorted ? () => shuffleLocales(locales) : sortLocalesAlphabetically}
            className="px-4 py-2 bg-bgpurple hover:bg-bgpink hover:text-bgpurple text-white rounded-lg shadow"
          >
            {isSorted ? 'Mostrar Aleatoriamente' : 'Ordenar Alfabéticamente'}
          </button>
        </div>
      </div>

      {/* Paginación superior */}
      {totalPages > 1 && !loading && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="secondary"
          siblingCount={0}
          className="flex justify-center p-2 m-2"
        />
      )}

      {/* Lista de locales */}
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8" data-aos="fade-right">
        {loading
          ? Array.from({ length: localPage }, (_, index) => <CardSkeleton key={index} />)
          : filteredLocales.length === 0
          ? <div>No se encontraron locales.</div>
          : filteredLocales.slice((page - 1) * localPage, page * localPage).map((local) => (
              <Card key={local.n_local} product={local} onOpen={() => setSelectedLocal(local)} />
            ))}
      </div>

      {/* Paginación inferior */}
      {totalPages > 1 && !loading && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="secondary"
          siblingCount={0}
          className="flex justify-center p-2 m-2"
        />
      )}

      {/* Modal de detalle */}
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
