import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { fetchRubros, fetchCategorias } from '../../Utils/rubros';
import { userinfo } from '../../app/Constants/userinfo';
import { Local } from '@/src/types/interfaces';
import Loading from '../Loading/Loading';

interface DropdownProps {
  selectRubro: (rubro: string) => void;
  selectedChecks: (selected: string[]) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ selectRubro, selectedChecks }) => {
  const [locales, setLocales] = useState<Local[]>([]);
  const [rubros, setRubros] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<
    { categoria: string; locales: string[] }[]
  >([]);
  const [selectedCategoria, setSelectedCategoria] = useState<
    { categoria: string; locales: string[] } | undefined
  >(undefined);
  const [showLocales, setShowLocales] = useState(false);
  const [selectedLocales, setSelectedLocales] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch locales from localStorage
  useEffect(() => {
    try {
      const cachedLocales = localStorage.getItem('locales');
      if (cachedLocales) {
        const parsedLocales: Local[] = JSON.parse(cachedLocales);
        setLocales(parsedLocales);
        setRubros(fetchRubros(parsedLocales));
        const categoriasData = fetchCategorias(parsedLocales);
        setCategorias(categoriasData);
        setSelectedCategoria(categoriasData[0]);
      } else {
        setError('cargando...');
      }
    } catch (e) {
      setError('Failed to fetch locales from localStorage.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update parent component when selected locales change
  useEffect(() => {
    selectedChecks(selectedLocales);
  }, [selectedLocales, selectedChecks]);

  const handleSelectCategoria = (categoria: { categoria: string; locales: string[] }) => {
    setSelectedCategoria(categoria);
    setSelectedLocales([]);
    setShowLocales(false);
  };

  const handleSearch = () => {
    if (selectedCategoria) {
      selectRubro(selectedCategoria.categoria);
      setShowLocales(true);
    }
  };

  const handleShowAll = () => {
    selectRubro('All');
    setSelectedCategoria(undefined);
    setSelectedLocales([]);
    setShowLocales(false);
  };

  const handleLocaleSelection = (locale: string) => {
    setSelectedLocales((prev) =>
      prev.includes(locale)
        ? prev.filter((item) => item !== locale)
        : [...prev, locale]
    );
  };

  const clearSelections = () => {
    setSelectedLocales([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <section className="items-center shadow-lg rounded">
      <div className="grid grid-cols-2 items-center lg:grid-cols-4 grid-rows-2 lg:grid-rows-1 gap-3 p-4">
        <div className="w-full col-span-2">
          <Listbox value={selectedCategoria} onChange={handleSelectCategoria}>
            {({ open }) => (
              <>
                <Listbox.Label className="text-lg text-gray-500">
                  ¿Qué estás buscando?
                </Listbox.Label>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white text-xl py-2 pr-10 text-left focus:outline-none">
                    <span className="block truncate text-xl font-semibold">
                      {selectedCategoria ? selectedCategoria.categoria : 'Seleccione una categoría'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    show={open}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {categorias.map((categoriaItem, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                            }`
                          }
                          value={categoriaItem}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {categoriaItem.categoria}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="col-span-1 mt-2 lg:col-span-1">
          <button
            onClick={handleSearch}
            className="bg-purple-600 w-full text-white hover:bg-purple-700 font-bold py-4 px-3 rounded"
          >
            {userinfo.banner.button}
          </button>
        </div>
        <div className="col-span-1 mt-2 lg:col-span-1">
          <button
            onClick={handleShowAll}
            className="bg-transparent w-full text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-4 px-5 border border-purple-600 rounded"
          >
            Ver Todos
          </button>
        </div>
      </div>
      {showLocales && selectedCategoria && selectedCategoria.locales.length > 0 && (
        <div className="grid grid-cols-12 items-start py-5 px-4">
          <div className="grid col-span-8 sm:col-span-9 md:col-span-10 md:grid-cols-3 sm:grid-cols-2 gap-2">
            {selectedCategoria.locales.map((locale, index) => (
              <div key={index} className="flex items-center">
                <input
                  id={`locale-${index}`}
                  type="checkbox"
                  checked={selectedLocales.includes(locale)}
                  onChange={() => handleLocaleSelection(locale)}
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                />
                <label
                  htmlFor={`locale-${index}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {locale}
                </label>
              </div>
            ))}
          </div>
          <div className="col-span-4 sm:col-span-3 md:col-span-2 flex justify-end">
            <button
              onClick={clearSelections}
              className="bg-purple-600 text-white hover:bg-purple-700 font-normal py-2 px-4 rounded"
            >
              LIMPIAR
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dropdown;
