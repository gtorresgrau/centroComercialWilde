import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import {rubrosk, categorias} from '../../../server/utils/rubros'
import { userinfo } from '../../app/Constants/userinfo'

const Dropdown = (props:any) => {
  const [selected, setSelected] = useState(rubrosk[0]);
  const [category, setCategory] = useState(categorias[0]);
  const [show, setShow] = useState(false)
  const [selectedLocales, setSelectedLocales] = useState<string[]>([]);

  
  const handleRubro = async ()=>{
    props.selectRubro(category.categoria)
    setSelectedLocales([]);
    setShow(true)
  }
  
  const handleAll = ()=>{
    props.selectRubro('All')
    setSelected(rubrosk[0])
    setCategory(categorias[0])
    setSelectedLocales([]);
  }

  const handleClick = () => {
    setSelectedLocales([]);
  };
  
  const handleCheckboxChange = (rubro:any) => {
    setSelectedLocales((prevSelectedLocales) =>
      prevSelectedLocales.includes(rubro)
        ? prevSelectedLocales.filter((item) => item !== rubro)
        : [...prevSelectedLocales, rubro]
    );
  };
  
  useEffect(() => {
    props.selectedChecks(selectedLocales);
  }, [category, selectedLocales]);
  
  return (
    <section className="grid grid-cols-2 items-center lg:grid-cols-4 grid-rows-2 lg:grid-rows-1 gap-3 p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded"> 
      <div className='w-full col-span-2' >
      <Listbox value={category} onChange={(newValue) => {setCategory(newValue),setShow(false)}}>
        <h2 className='text-lg text-lightgrey'>¿Que estas buscando?</h2>
          {/* First select */}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white text-xl py-2 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <p className="block truncate text-xl font-semibold ">{category.categoria}</p>
            <p className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </p>
            </Listbox.Button>
            <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categorias.map((name, key) => (
                <Listbox.Option
                  key={key}
                  className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900' }`}
                  value={name}
                  >
                    {({ selected }) => (
                      <>
                        <p className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {name.categoria}
                        </p>
                        {selected ? (
                          <p className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </p>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

      </div>
      <div  className=' col-span-1 mt-2 lg:col-span-1 '  >
        <button onClick={handleRubro} className="bg-purple w-full hover:bg-pruple text-white font-bold py-4 px-3 rounded">{userinfo.banner.button}</button>
      </div>
      <div className="col-span-1 mt-2 lg:col-span-1 ">
        <button onClick={handleAll} className="bg-transparent  w-full hover:bg-purple text-purple font-medium hover:text-white py-4 px-5 outline outline-1  outeline- bg-purple rounded">Ver Todos</button>
      </div>
      {/*Checkbox */}
      {show && category.locales.length > 1 ? (
        category.locales
        .sort((a, b) => a.localeCompare(b)) 
        .map((rubro, key) => (
          <div key={key} className='flex text-start justify-start font-light md:font-normal xl:font-medium'>
            <label><input type='checkbox' 
                value={rubro} 
                name={rubro} 
                checked={selectedLocales.includes(rubro)}
                onClick={handleClick}
                onChange={() => handleCheckboxChange(rubro)}/> {rubro}</label>
          </div>
        ))): (null)}
    </section>
  )
}

export default Dropdown;
