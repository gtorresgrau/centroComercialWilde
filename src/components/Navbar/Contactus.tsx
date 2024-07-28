import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { IoClose } from 'react-icons/io5';



const Contactusform = () => {
    let [isOpen, setIsOpen] = useState(false)

    const [inputValues, setInputValues] = useState({
        input1: '',
        input2: '',
        input3: ''
    });

    const alert = () => {
        Swal.fire({
        title: `${inputValues.input1},tu mensaje ha sido enviado correctamente.`,
        text: `Pronto se comunicarán contigo al siguiente email, ${inputValues.input2} `,
        icon: "success",
        confirmButtonText: "Ok",
        })  
    };

    const alertLoading = () => {
        Swal.fire({
        title:'Aguarde un momento',
        text: `Tu mensaje se esta enviando...`,
        showConfirmButton: false,
        });  
    };

    const alertError = () => {
        Swal.fire({
        text: `${inputValues.input2}, No es un correo electronico Valido`,
        icon: "error",
        confirmButtonText: "Ok",
        });  
    };

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({ ...prevState, [name]: value }));
    }

    const handleClick = () => {
    }

    // FORM SUBMIT
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!inputValues.input2.match(emailPattern)) {
            console.error('Correo electrónico no válido');
            alertError()
        }else{
            try {
                alertLoading();
                const response = await axios.post('/api/contact', inputValues); // Utiliza Axios para hacer la solicitud POST
                console.log('Response received', response.data);
                Swal.close();
                if (response.status === 200) {
                    alert();
                    setInputValues({
                        input1: '',
                        input2: '',
                        input3: '',
                    });
                setIsOpen(false)
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const isDisabled = Object.values(inputValues).some((value) => value === '');

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0">
                <div className='md:hidden'>
                    <button type="button" className='text-15px font-medium' onClick={openModal}>CONTACTO</button>
                </div>
                <div className='hidden md:block'>
                    <button type="button" className='text-15px font-medium space-links' onClick={openModal}>CONTACTO</button>
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
                                        />                                        
                                        <p className="mb-8 lg:mb-16 mt-6 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Deja un comentario a la administración por acá o comunícate por Whatsapp</p>
                                        </div>
                                        <form action="#" className="space-y-8" onSubmit={handleSubmit}>
                                            <div>
                                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre</label>
                                                <input
                                                    id="text"
                                                    name="input1"
                                                    value={inputValues.input1}
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
                                                    name="input2"
                                                    value={inputValues.input2}
                                                    onChange={handleChange}
                                                    type="email"
                                                    autoComplete="current-password"
                                                    required
                                                    className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="tu_email@email.com"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Mensaje</label>
                                                <textarea
                                                    id="message"
                                                    name="input3"
                                                    value={inputValues.input3}
                                                    onChange={handleChange}
                                                    className="relative block w-full appearance-none  rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Dejar un comentario..."></textarea>
                                            </div>
                                            <button type="submit"
                                                onClick={handleClick}
                                                disabled={isDisabled}
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

export default Contactusform;
