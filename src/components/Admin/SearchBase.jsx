'use client'
import React from 'react';

export default function SearchBase({ searchQuery, setSearchQuery, setFilteredLocales, locales , setPage}) {

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filtrar locales
    const filtered = locales.filter(local =>
      Object.values(local).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())
      )
    );

    // Setear el estado de locales filtrados
    setFilteredLocales(filtered);
    setPage(1);
  };

  return (
    <div className="items-center p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded">
        <h2 className="text-lg text-gray-500">Buscador</h2>
        <input
            type="text"
            placeholder="Buscar...(Nombre, Rubro, etc...)"
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="rounded-xl border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 sm:text-sm"
        />
    </div>
  );
}
