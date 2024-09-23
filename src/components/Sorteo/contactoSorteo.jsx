'use client'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';

const ContactoSorteo = () => {
    let [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            nombre: '',
            apellido: '',
            dni: '',
            email: '',
            celular:'',
            chw: false,
            torre: '',
            piso: '',
            depto: '',
            aceptar: false,
        }
    });

    const alert = (nombre) => {
        Swal.fire({
            title: `${nombre}, te anotaste correctamente.`,
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: {
                confirmButton: 'bg-primary text-white hover:bg-blue-700',
            }
        });
    };

    const alertLoading = () => {
        Swal.fire({
            title: 'Aguarde un momento',
            didOpen: () => {
                Swal.showLoading();
            },
            showConfirmButton: false,
            customClass: {
                confirmButton: 'bg-primary text-white hover:bg-blue-700',
            }
        });
    };

    const alertError = (email) => {
        Swal.fire({
            text: `${email}, No es un correo electrónico válido`,
            icon: 'error',
            confirmButtonText: 'Ok',
            customClass: {
                confirmButton: 'bg-primary text-white hover:bg-blue-700',
            }
        });
    };
    const alreadyExist = (message) => {
        Swal.fire({
            title: `${message}`,
            icon: 'error',
            confirmButtonText: 'Ok',
            customClass: {
                confirmButton: 'bg-primary text-white hover:bg-blue-700',
            }
        });
    };

    const onSubmit = async (data) => {
        const { email, nombre } = data;
        try {
            alertLoading();
            console.log('data:',data)
            const response = await axios.post('/api/sorteos', {
                ...data,
                sorteo: 'sorteo',
            });
            Swal.close();
            if (response.status === 200) {
                alert(nombre);
                reset();
                setIsOpen(false);
            }
            const responseNews = await axios.post('/api/newsletter/newsletters', {
                newsletter:email,
            });
            if (responseNews.status === 200) {
                console.log('Se suscribio correctamente');
            }
        } catch (error) {
            Swal.close();
           if (error.response && error.response.status === 400) {
                console.error('Error:', error.response.data.message);
                reset({calle:'',torre:'',piso:'',depto:''})
                alreadyExist(error.response.data.message); 
            } else {
                console.error('Error:', error.response ? error.response.data : error.message);
                reset({calle:'',torre:'',piso:'',depto:''})
                alertError('Ocurrió un error. Intente nuevamente.');
            }
            setIsOpen(false);
        }
    };
    

    const chw = watch("chw");
    const path =usePathname();
    const padTop = path === '/ruleta' || path !== '/' ? 'pt-2 pb-4' : '';

    const isDisabled = isSubmitting || Object.values(watch()).some((value) => value === '') || !watch("aceptar");

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };
    
    return (
        <section >
            <article className={`inset-y-0 right-0 flex flex-col items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0 ${padTop}`}>
                <button className={`hover:bg-transparent bg-purple hover:text-purple font-semibold text-white py-3 px-4 border hover:border-transparentrounded cursor-pointer rounded-full`} onClick={openModal} >Anotate YA!</button>
            </article>
            <Transition  className='z-20' appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-5" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <button type="button" onClick={closeModal} className="absolute top-5 right-6 "><IoClose size={32} style={{ color: 'gray' }} /></button>
                                    <div className="py-1 lg:py-4 px-2 mx-auto max-w-screen-md">
                                        <div className="flex flex-col items-center">
                                            <img className="h-48px w-48px lg:block" src='assets/logo/administracion.webp' alt="Sermar Logo" width={100} height={100} loading='lazy' aria-label='imagen de logo del ccw' />
                                            <p className="mb-2 lg:mb-4 mt-4 font-bold text-center text-primary sm:text-xl">SORTEOS<br /><small className="m-2 font-light text-sm text-center text-gray-500">* Se sortea 1 expensa para 2 departamentos por mes.<br/>* Se sortea 1 orden de compra para 2 usuarios por mes.<br/>* Sorteos especiales para dias festivos.<br/></small></p>
                                            <p className='m-2 font-light text-center text-gray-500 text-xs'>Completa tus datos para participar. El correo se añade al Newsletter, Para mayores de 18años y 1 participante por vivienda.</p>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                                            <div>
                                                <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                                                <input id="nombre" {...register("nombre", { required: true })} type="text" required className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Nombre..." />
                                                {errors.nombre && <p className="text-red">Este campo es obligatorio</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-gray-900 ">Apellido</label>
                                                <input id="apellido" {...register("apellido", { required: true })} type="text" required className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Apellido..." />
                                                {errors.apellido && <p className="text-red">Este campo es obligatorio</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="dni" className="block mb-2 text-sm font-medium text-gray-900">DNI</label>
                                                <input id="dni" {...register("dni", { required: true })} type="number" required className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="12345678" />
                                                {errors.dni && <p className="text-red">Este campo es obligatorio</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="celular" className="block mb-2 text-sm font-medium text-gray-900">Celular</label>
                                                <input id="celular" {...register("celular", { required: true })} type="number" required className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="115345678" />
                                                {errors.dni && <p className="text-red">Este campo es obligatorio</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Tu Email</label>
                                                <input id="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} type="email" required className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="tu_email@email.com" />
                                                {errors.email && <p className="text-red">Correo electrónico no válido</p>}
                                            </div>
                                            <div className='flex items-center space-x-2 align-middle'>
                                                <input id="chw" {...register("chw")} type='checkbox' />
                                                <label htmlFor="chw" className="inline-block text-sm font-medium text-gray-900 ">Soy del Complejo Habitacional Wilde</label>
                                            </div>
                                            {chw ? (
                                                <div className="flex gap-4 align-middle items-center justify-center text-center">
                                                    <div>
                                                        <label htmlFor="torre" className="inline-block mb-2 text-sm font-medium text-gray-900">Torre</label>
                                                        <input
                                                            id="torre"
                                                            {...register("torre", {
                                                            required: true,
                                                            onChange: (e) => setValue("torre", e.target.value.toUpperCase()),
                                                            })}
                                                            type="text"
                                                            required
                                                            className="relative block w-24 appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm uppercase"
                                                            placeholder="1 - 48"
                                                        />
                                                        {errors.torre && <p className="text-red">Este campo es obligatorio</p>}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="piso" className="inline-block mb-2 text-sm font-medium text-gray-900">
                                                            Piso
                                                        </label>
                                                        <input
                                                            id="piso"
                                                            {...register("piso", {
                                                            required: true,
                                                            onChange: (e) => setValue("piso", e.target.value.toUpperCase()),
                                                            })}
                                                            type="text"
                                                            required
                                                            className="relative block w-24 appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm uppercase"
                                                            placeholder="1 - 11"
                                                        />
                                                        {errors.piso && <p className="text-red">Este campo es obligatorio</p>}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="depto" className="inline-block mb-2 text-sm font-medium text-gray-900">
                                                            Depto
                                                        </label>
                                                        <input
                                                            id="depto"
                                                            {...register("depto", {
                                                            required: true,
                                                            onChange: (e) => setValue("depto", e.target.value.toUpperCase()),
                                                            })}
                                                            type="text"
                                                            required
                                                            className="relative block w-24 appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm uppercase"
                                                            placeholder="A - D"
                                                        />
                                                        {errors.depto && <p className="text-red">Este campo es obligatorio</p>}
                                                    </div>
                                                </div>
                                                ) : (
                                                <div className="flex flex-col gap-4">
                                                    {/* Input para Calle */}
                                                    <div>
                                                    <label htmlFor="calle" className="inline-block mb-2 text-sm font-medium text-gray-900">
                                                        Calle
                                                    </label>
                                                    <input
                                                        id="calle"
                                                        {...register("calle", { required: true, onChange: (e) => setValue("calle", e.target.value.toUpperCase())})}
                                                        type="text"
                                                        className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="San Martin"
                                                    />
                                                    </div>
                                                    <div>
                                                    <label htmlFor="torre" className="inline-block mb-2 text-sm font-medium text-gray-900">
                                                        Torre (Opcional)
                                                    </label>
                                                    <input
                                                        id="torre"
                                                        {...register("torre",{ onChange: (e) => setValue("torre", e.target.value.toUpperCase())})}
                                                        type="text"
                                                        className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="A1"
                                                    />
                                                    </div>

                                                    {/* Input para Piso */}
                                                    <div>
                                                    <label htmlFor="piso" className="inline-block mb-2 text-sm font-medium text-gray-900">
                                                        Piso (Opcional)
                                                    </label>
                                                    <input
                                                        id="piso"
                                                        {...register("piso",{ onChange: (e) => setValue("piso", e.target.value.toUpperCase())})}
                                                        type="text"
                                                        className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="7"
                                                    />
                                                    </div>

                                                    {/* Input para Depto */}
                                                    <div>
                                                    <label htmlFor="depto" className="inline-block mb-2 text-sm font-medium text-gray-900">
                                                        Depto (Opcional)
                                                    </label>
                                                    <input
                                                        id="depto"
                                                        {...register("depto",{ onChange: (e) => setValue("depto", e.target.value.toUpperCase())})}
                                                        type="text"
                                                        className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="1"
                                                    />
                                                    </div>

                                                    {/* Input para Altura */}
                                                    <div>
                                                    <label htmlFor="altura" className="inline-block mb-2 text-sm font-medium text-gray-900">
                                                        Altura
                                                    </label>
                                                    <input
                                                        id="altura"
                                                        {...register("altura", { required: true, onChange: (e) => setValue("altura", e.target.value.toUpperCase()) })}
                                                        type="text"
                                                        className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="2610"
                                                    />
                                                    </div>

                                                    {/* Input para Localidad */}
                                                    <div>
                                                    <label htmlFor="localidad" className="inline-block mb-2 text-sm font-medium text-gray-900">
                                                        Localidad
                                                    </label>
                                                    <input
                                                        id="localidad"
                                                        {...register("localidad", { required: true, onChange: (e) => setValue("localidad", e.target.value.toUpperCase()) })}
                                                        type="text"
                                                        className="relative block w-full appearance-none rounded-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="Wilde"
                                                    />
                                                    </div>
                                                </div>
                                                )}

                                            <div className="flex items-center">
                                                <input id="aceptar" {...register("aceptar", { required: true })} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                                <label htmlFor="aceptar" className="ml-2 text-sm font-medium text-gray-900 ">Acepto los términos y condiciones arriba mencionados</label>
                                                {errors.aceptar && <p className="text-red ml-2">Este campo es obligatorio</p>}
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isDisabled}
                                                className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                onClick={() => {
                                                    if (!chw) {
                                                    const calle = getValues('calle') || '';
                                                    const torre = getValues('torre') ? ` - Torre ${getValues('torre')}` : '';
                                                    const piso = getValues('piso') ? ` - Piso ${getValues('piso')}` : '';
                                                    const depto = getValues('depto') ? ` - Depto ${getValues('depto')}` : '';
                                                    const direccionCompleta = `${calle}${torre}${piso}${depto}`;
                                                    setValue('torre', direccionCompleta.toUpperCase());
                                                    const altura = getValues('altura');
                                                    setValue('piso', altura.toUpperCase());
                                                    const localidad = getValues('localidad');
                                                    setValue('depto', localidad.toUpperCase());
                                                    }
                                                }}
                                                >
                                                {isSubmitting ? "Enviando..." : "Anotarme"}
                                                </button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section>
    );
};

export default ContactoSorteo;
