'use client'
import React, {Fragment, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { IoClose } from 'react-icons/io5';

const CreateLocal =()=> {


    const localesData = {
        local: '',
        isAdmin: false,
        hidden: false,
        n_local: '',
        email: '',
        contacto: '',
        celular: '',
        linea: '',
        ubicacion: '',
        rubro: '',
        rubroSecundario: '',
        horarios: '',
        logoLocal: '',
        fotoLocal: '',
        instagram: '',
        facebook: '',
        texto: ''
    }
    
    const [formData, setFormData] = useState (localesData);
    const [isOpen, setIsOpen] = useState(false)

    const isDisabled = false;

    const closeModal = () => {setIsOpen(false)}
    const openModal = () => {setIsOpen(true)}

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        setFormData(
            {
                local: '',
                isAdmin: false,
                hidden: false,
                n_local: '',
                email: '',
                contacto: '',
                celular: '',
                linea: '',
                ubicacion: '',
                rubro: '',
                rubroSecundario: '',
                horarios: '',
                logoLocal: '',
                fotoLocal: '',
                instagram: '',
                facebook: '',
                texto: ''
            }
        )
    };

    const handleClick = () => {
    };


  return (
        <>
        <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0">
            <div className='md:hidden'>
                <button type="button" className='text-15px font-medium' onClick={openModal}>+</button>
            </div>
            <div className='hidden md:block'>
                <button type="button" className='text-15px font-medium space-links' onClick={openModal}>+</button>
            </div>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <button type="button" onClick={closeModal} className="absolute top-5 right-6 "><IoClose size={32} style={{color:'gray'}}/></button>
                                <div className="py-6 lg:py-8 px-4 mx-auto max-w-screen-md">
                                    <div className="flex flex-col items-center">
                                    <img
                                        className="h-48px w-48px lg:block"
                                        src='assets/logo/administracion.webp'
                                        alt="Centro Comercial Logo"
                                        width={100} 
                                        height={100} 
                                        loading='lazy'
                                    />                                        
                                    <p className="mb-8 lg:mb-16 mt-6 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Crear un local Nuevo</p>
                                    </div>
                                    <form action="#" className="space-y-8" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre del Local</label>
                                            <input
                                                id="local"
                                                name="local"
                                                value={formData.local}
                                                onChange={handleChange}
                                                type="text"
                                                autoComplete="current-password"
                                                required
                                                className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Nombre..."
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                type="email"
                                                autoComplete="current-password"
                                                required
                                                className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                placeholder="tu_email@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Numero de Local</label>
                                            <input
                                                id="n_local"
                                                name="n_local"
                                                value={formData.n_local}
                                                onChange={handleChange}
                                                type="text"
                                                autoComplete="current-password"
                                                required
                                                className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Nombre..."
                                            />
                                        </div>
                                        <button type="submit"
                                            onClick={handleClick}
                                            disabled={isDisable}
                                            className="py-2 px-5 text-sm disabled:opacity-50 font-medium w-full text-center text-white rounded-lg bg-purple  hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Enviar</button>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
  )
}

export default CreateLocal