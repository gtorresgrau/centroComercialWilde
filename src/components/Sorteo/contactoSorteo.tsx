import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoClose } from 'react-icons/io5';

const ContactoSorteo = () => {
    let [isOpen, setIsOpen] = useState(false);

    const [inputValues, setInputValues] = useState({
        nombre: '',
        apellido:'',
        email: '',
        torre: '',
        piso: '',
        depto: '',
    });

    const [selectedOption, setSelectedOption] = useState('');

    const alert = () => {
        Swal.fire({
            title: `${inputValues.nombre}, te anotaste correctamente.`,
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

    const alertError = () => {
        Swal.fire({
            text: `${inputValues.email}, No es un correo electrónico válido`,
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    };

    const handleChange = (e: { target: { name: string; value: string }; }) => {
        const { name, value } = e.target;
        setInputValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleClick = () => {};

    // FORM SUBMIT
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!inputValues.email.match(emailPattern)) {
            console.error('Correo electrónico no válido');
            alertError();
        } else {
            try {
                alertLoading();
                const response = await axios.post('/api/contact', {
                    ...inputValues,
                    sorteo: 'sorteo', // Agregar el nuevo input desplegable al cuerpo de la solicitud
                });
                console.log('Response received', response.data);
                Swal.close();
                if (response.status === 200) {
                    alert();
                    setInputValues({
                        nombre: '',
                        apellido:'',
                        email: '',
                        torre: '',
                        piso: '',
                        depto: '',
                    });
                    setSelectedOption(''); // Restablecer el valor del input desplegable después del envío exitoso
                    setIsOpen(false);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const isDisabled = Object.values(inputValues).some((value) => value === '');

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0">
                <button className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrehover:border-transparent rounded"  onClick={openModal}>Anotate aca!</button>
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
                                    <button type="button" onClick={closeModal} className="absolute top-5 right-6 "><IoClose size={32} style={{ color: 'gray' }}/></button>
                                    <div className="py-6 lg:py-8 px-4 mx-auto max-w-screen-md">
                                        <div className="flex flex-col items-center">
                                            <img
                                                className="h-48px w-48px lg:block"
                                                src='assets/logo/administracion.webp'
                                                alt="Sermar Logo"
                                                width={100} 
                                                height={100} 
                                            />
                                            <p className="mb-8 lg:mb-16 mt-6 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Anotate para el sorteo de las expensas</p>
                                        </div>
                                        <form action="#" className="space-y-8" onSubmit={handleSubmit}>
                                            <div>
                                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
                                                <input
                                                    id="text"
                                                    name="nombre"
                                                    value={inputValues.nombre}
                                                    onChange={handleChange}
                                                    type="text"
                                                    autoComplete="current-password"
                                                    required
                                                    className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Nombre..."
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Apellido</label>
                                                <input
                                                    id="text"
                                                    name="apellido"
                                                    value={inputValues.apellido}
                                                    onChange={handleChange}
                                                    type="text"
                                                    autoComplete="current-password"
                                                    required
                                                    className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Nombre..."
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tu Email</label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    value={inputValues.email}
                                                    onChange={handleChange}
                                                    type="email"
                                                    autoComplete="current-password"
                                                    required
                                                    className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="tu_email@email.com"
                                                />
                                            </div>
                                            <div className='flex gap-4 align-middle items-center justify-center text-center'>
                                                <div className="">
                                                    <label htmlFor="torre" className="inline-block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Torre</label>
                                                    <input
                                                        id="torre"
                                                        name="torre"
                                                        value={inputValues.torre}
                                                        onChange={handleChange}
                                                        type="text"
                                                        autoComplete="current-password"
                                                        required
                                                        className="relative block w-24 appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="1 a 48"
                                                    />
                                                </div>
                                                <div className="">
                                                    <label htmlFor="piso" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Piso</label>
                                                    <input
                                                        id="piso"
                                                        name="piso"
                                                        value={inputValues.piso}
                                                        onChange={handleChange}
                                                        type="text"
                                                        autoComplete="current-password"
                                                        required
                                                        className="relative block w-24 appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="0 a 10"
                                                    />
                                                </div>
                                                <div className="">
                                                    <label htmlFor="depto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Depto.</label>
                                                    <input
                                                        id="depto"
                                                        name="depto"
                                                        value={inputValues.depto}
                                                        onChange={handleChange}
                                                        type="text"
                                                        autoComplete="current-password"
                                                        required
                                                        className="relative block w-24 appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="a-b-c-d"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                onClick={handleClick}
                                                disabled={isDisabled}
                                                className="py-2 px-5 text-sm disabled:opacity-50 font-medium w-full text-center text-white rounded-lg bg-red  hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
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
