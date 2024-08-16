import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { rubrosk, categorias } from '../../../server/utils/rubros';
import { userinfo } from '../../app/Constants/userinfo';
import useLocales from '../../Hooks/useLocales';
import { filterCat } from '@/server/utils/filters';

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


const Dropdown = (props: any) => {
  const [selected, setSelected] = useState(rubrosk[0]);
  const [category, setCategory] = useState(categorias[0]);
  const [selectedLocales, setSelectedLocales] = useState<string[]>([]);
  const { locales, setLocales } = useLocales();

  const handleRubro = () => {
    props.selectRubro(category.categoria);
    setSelectedLocales([]);
    setLocales(filterCat(category.categoria, props.locales) as Local[]);
  };

  const handleAll = () => {
    props.selectRubro('All');
    setSelected(rubrosk[0]);
    setCategory(categorias[0]);
    setSelectedLocales([]);
    setLocales(props.locales); // Restaura todos los locales
  };

  const handleCheckboxChange = (rubro: string) => {
    setSelectedLocales((prevSelectedLocales) =>
      prevSelectedLocales.includes(rubro)
        ? prevSelectedLocales.filter((item) => item !== rubro)
        : [...prevSelectedLocales, rubro]
    );
  };

  useEffect(() => {
    if (selectedLocales.length > 0) {
      props.selectedChecks(selectedLocales);
    }
  }, [selectedLocales]);

  return (
    <section className="items-center shadow-lg rounded">
      <div className="grid grid-cols-2 items-center lg:grid-cols-4 grid-rows-2 lg:grid-rows-1 gap-3 p-4">
        <div className="w-full col-span-2">
          <Listbox value={category} onChange={(newValue) => { setCategory(newValue); }}>
            <h2 className="text-lg text-gray-500">¿Qué estás buscando?</h2>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white text-xl py-2 pr-10 text-left focus:outline-none">
                <span className="block truncate text-xl font-semibold">{category.categoria}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-label='categoria'/>
                </span>
              </Listbox.Button>
              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categorias.map((name, key) => (
                    <Listbox.Option key={key} className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`} value={name}>
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {name.categoria}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-label='seleccionar check filtro' />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="col-span-1 mt-2 lg:col-span-1">
          <button onClick={handleRubro} className="bg-purple w-full text-white hover:bg-transparent hover:text-purple font-bold py-4 px-3 outline outline-1 rounded">
            {userinfo.banner.button}
          </button>
        </div>
        <div className="col-span-1 mt-2 lg:col-span-1">
          <button onClick={handleAll} className="bg-transparent w-full text-purple hover:bg-purple hover:text-white font-bold py-4 px-5 outline outline-1 rounded">
            Ver Todos
          </button>
        </div>
      </div>
      {category.locales.length > 1 && (
        <div className="grid grid-cols-12 items-start py-5 px-4">
          <div className="grid col-span-8 sm:col-span-9 md:col-span-10 md:grid-cols-3 sm:grid-cols-2">
            {category.locales
              .sort((a, b) => a.localeCompare(b))
              .map((rubro, key) => (
                <div key={key} className="font-light md:font-normal xl:font-medium lg:flex-1">
                  <label>
                    <input
                      type="checkbox"
                      value={rubro}
                      name={rubro}
                      checked={selectedLocales.includes(rubro)}
                      onChange={() => handleCheckboxChange(rubro)}
                    /> {rubro}
                  </label>
                </div>
              ))}
          </div>
          <div className="col-span-4 sm:col-span-3 md:col-span-2">
            <button onClick={() => setSelectedLocales([])} className="bg-purple w-fit text-white hover:bg-transparent hover:text-purple font-normal py-2 px-2 outline outline-1 rounded">
              LIMPIAR
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dropdown;
