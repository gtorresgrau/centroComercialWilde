import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoClose } from 'react-icons/io5';

const ContactoSorteo = () => {
    let [isOpen, setIsOpen] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const alert = (name) => {
        Swal.fire({
            title: `${name}, te anotaste correctamente.`,
            icon: 'success',
            confirmButtonText: 'Ok',
        });
    };

    const alertLoading = () => {
        Swal.fire({
            title: 'Aguarde un momento',
            didOpen: () => {
                Swal.showLoading();
            },
            showConfirmButton: false,
        });
    };

    const alertError = (email) => {
        Swal.fire({
            text: `${email}, No es un correo electrónico válido`,
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    };

    const onSubmit = async (data) => {
        const { nombre, email } = data;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email.match(emailPattern)) {
            console.error('Correo electrónico no válido');
            alertError(email);
        } else {
            try {
                alertLoading();
                const response = await axios.post('/api/sorteos/sorteos', {
                    ...data,
                    sorteo: 'sorteo',
                });
                console.log('Response received', response.data);
                Swal.close();
                if (response.status === 200) {
                    alert(nombre);
                    reset();
                    setIsOpen(false);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className="inset-y-0 right-0 flex flex-col items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0">
                <small>Proximamente...</small>
                <button className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrehover:border-transparent rounded" onClick={openModal}>Anotate YA!</button>
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
                                    <button type="button" onClick={closeModal} className="absolute top-5 right-6 "><IoClose size={32} style={{ color: 'gray' }} /></button>
                                    <div className="py-6 lg:py-8 px-4 mx-auto max-w-screen-md">
                                        <div className="flex flex-col items-center">
                                            <img
                                                className="h-48px w-48px lg:block"
                                                src='assets/logo/administracion.webp'
                                                alt="Sermar Logo"
                                                width={100}
                                                height={100}
                                            />
                                            <span className="mb-8 lg:mb-16 mt-6 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Anotate para el sorteo de las expensas<br/>
                                            <small className="m-2 font-light text-sm text-center text-gray-500 dark:text-gray-400">* Se sortea 1 expensa para 2 departanamentos por mes, completa tus datos para participar.</small></span>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                            <div>
                                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
                                                <input
                                                    id="nombre"
                                                    {...register('nombre', { required: true })}
                                                    type="text"
                                                    className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Nombre..."
                                                />
                                                {errors.nombre && <span className="text-red-500">Este campo es requerido</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apellido</label>
                                                <input
                                                    id="apellido"
                                                    {...register('apellido', { required: true })}
                                                    type="text"
                                                    className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Apellido..."
                                                />
                                                {errors.apellido && <span className="text-red-500">Este campo es requerido</span>}
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tu Email</label>
                                                <input
                                                    id="email"
                                                    {...register('email', { required: true })}
                                                    type="email"
                                                    className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="tu_email@email.com"
                                                />
                                                {errors.email && <span className="text-red-500">Este campo es requerido</span>}
                                            </div>
                                            <div className='flex gap-4 align-middle items-center justify-center text-center'>
                                                <div className="">
                                                    <label htmlFor="torre" className="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Torre</label>
                                                    <input
                                                        id="torre"
                                                        {...register('torre', { required: true })}
                                                        type="text"
                                                        className="relative block w-24 appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="1 a 48"
                                                    />
                                                    {errors.torre && <span className="text-red-500">Este campo es requerido</span>}
                                                </div>
                                                <div className="">
                                                    <label htmlFor="piso" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Piso</label>
                                                    <input
                                                        id="piso"
                                                        {...register('piso', { required: true })}
                                                        type="text"
                                                        className="relative block w-24 appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="0 a 10"
                                                    />
                                                    {errors.piso && <span className="text-red-500">Este campo es requerido</span>}
                                                </div>
                                                <div className="">
                                                    <label htmlFor="depto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Depto.</label>
                                                    <input
                                                        id="depto"
                                                        {...register('depto', { required: true })}
                                                        type="text"
                                                        className="relative block w-24 appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="a-b-c-d"
                                                    />
                                                    {errors.depto && <span className="text-red-500">Este campo es requerido</span>}
                                                </div>
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <input
                                                    id="aceptar"
                                                    {...register('aceptar', { required: true })}
                                                    type="checkbox"
                                                />
                                                <label htmlFor="aceptar" className="block text-sm font-medium text-gray-900 dark:text-gray-300">Acepto los términos y condiciones</label>
                                                {errors.aceptar && <span className="text-red-500">Este campo es requerido</span>}
                                            </div>
                                            <button type="submit" className="py-2 px-5 text-sm font-medium w-full text-center text-white rounded-lg bg-red hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Enviar
                                            </button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ContactoSorteo;
