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
            calle:'',
            altura:'',
            localidad:'',
            torre: '',
            piso: '',
            depto: '',
            aceptar: false,
        },
        mode: 'onChange'

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
            //console.log('data:',data)
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
                return
            }
        } catch (error) {
            Swal.close();
           if (error.response && error.response.status === 400) {
                console.error('Error:', error.response.data.message);
                reset({calle:'',torre:'',piso:'',depto:''})
                alreadyExist(error.response.data.message); 
            } else if (error.response && error.response.status === 409) {
                return
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

    const isDisabled = isSubmitting || !watch("aceptar");

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    // clase de input
    function getInputClasses(hasError) {
        return `relative block w-full appearance-none rounded-md border px-3 py-2 mb-1 text-gray-900 shadow-sm placeholder-gray-300   focus:z-10 focus:outline-none sm:text-sm
        ${hasError ? 'border-red' : 'border-gray-100 focus:border-primary focus:ring-primary'}`;
    }
    
    return (
        <section >
            <article className={`inset-y-0 right-0 flex flex-col items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0 ${padTop}`}>
                <button className={`hover:bg-transparent bg-purple hover:text-purple font-semibold text-white py-3 px-4 border font  hover:border-transparentrounded cursor-pointer rounded-full`} onClick={openModal} >Anotate YA!</button>
            </article>
            {isOpen && (
            <Transition  className='z-20' appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <button type="button" onClick={closeModal} className="absolute top-5 right-6 "><IoClose size={32} style={{ color: 'gray' }} /></button>
                                    <div className="py-1 lg:py-4 px-2 mx-auto max-w-screen-md">
                                        <div className="flex flex-col items-center">
                                            <img className="h-24 w-24 lg:block" src='assets/logo/administracion.webp' alt="Sermar Logo" width={96} height={96} loading='lazy' aria-label='imagen de logo del ccw' title='imagen de logo del ccw' />
                                            <h2 className="mb-2 lg:mb-4 mt-4 font-bold text-center text-primary sm:text-xl">SORTEOS</h2>
                                            <div className="min-w-[290px] max-w-[300px]">
                                                <h3 className="mb-2 font-semibold text-start text-primary text-sm">Todos los meses</h3>
                                                <ul className=" mb-2 font-light text-sm text-start text-gray-800 list-disc min-w-[290px]">
                                                    <li className="block text-xs pb-1 text-gray-600" ><p className='text-gray-900 font-semibold'>Expensas:</p> Se sortean 2 expensas para 2 departamentos cada mes. valido para las personas que viven dentro del Complejo Habitacional Wilde</li>
                                                </ul>
                                            </div>
                                            <div className="min-w-[290px] max-w-[300px]">
                                                <h3 className="mb-2 font-semibold text-start text-primary text-sm">Ocaciones especiales</h3>
                                                <ul className="mb-2 font-light text-sm text-start text-gray-800 list-disc">
                                                    <li className="block text-xs pb-1 text-gray-600"><p className='text-gray-900 font-semibold'>Orden de compra:</p> Se sortea 1 orden de compra para 2 usuarios. Valido para todos los usuarios que se registren.</li>
                                                    <li className="block text-xs pb-1 text-gray-600"><p className='text-gray-900 font-semibold'>Sorteos adicionales</p>  en días festivos. Valido para todos los usuarios que se registren.</li>
                                                </ul> 
                                            </div>
                                            <div className="min-w-[290px] max-w-[300px]">
                                                <h3 className="mb-2 lg:mb-4 font-bold text-center text-primary sm:text-xl"><strong className='mb-1 font-semibold text-start text-primary text-sm'>Regístrate para participar.</strong></h3>
                                                <p className='mx-auto font-light text-start px-2 md:px-6 text-gray-600 text-xs '>
                                            Al registrarte, tu correo electrónico será suscrito automáticamente a nuestro boletín de noticias. La participación está limitada a mayores de 18 años, con un máximo de un participante por hogar.</p>
                                            </div>   
                                        </div>
                                        <br />
                                        <hr /><br />
                                        {/* Formulario */}
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                            {/* Nombre */}
                                            <div className=''>
                                                <label htmlFor="nombre" className="flex mb-1 ml-1 text-sm font-medium text-gray-900 "><p>Nombre</p><p className='text-red ml-2'>*</p></label>
                                                <input id="nombre" {...register("nombre", { required: true })} type="text" className={getInputClasses(errors.nombre)}   placeholder="Nombre..." />
                                                {errors.nombre && <p className="text-red text-xs ml-1">Este campo es obligatorio</p>}
                                            </div>
                                            {/* Apellido */}
                                            <div>
                                                <label htmlFor="apellido" className="flex mb-1 ml-1 text-sm font-medium text-gray-900 "><p>Apellido</p><p className='text-red ml-2'>*</p></label>
                                                <input id="apellido" {...register("apellido", { required: true })} type="text" className={getInputClasses(errors.apellido)} placeholder="Apellido..." />
                                                {errors.apellido && <p className="text-red text-xs ml-1">Este campo es obligatorio</p>}
                                            </div>
                                            {/* DNI */}
                                            <div>
                                                <label htmlFor="dni" className="flex mb-1 ml-1 text-sm font-medium text-gray-900"><p>DNI</p><p className='text-red ml-2'>*</p></label>
                                                <input id="dni" {...register("dni", { required: true })} type="number"  className={getInputClasses(errors.dni)} placeholder="12345678" />
                                                {errors.dni && <p className="text-red text-xs ml-1">Este campo es obligatorio</p>}
                                            </div>
                                            {/* Celular */}
                                            <div>
                                                <label htmlFor="celular" className="flex mb-1 ml-1 text-sm font-medium text-gray-900"><p>Celular</p><p className='text-red ml-2'>*</p></label>
                                                <input id="celular" {...register("celular", { required: true })} type="number"  className={getInputClasses(errors.celular)} placeholder="115345678" />
                                                {errors.dni && <p className="text-red text-xs ml-1">Este campo es obligatorio</p>}
                                            </div>
                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="flex mb-1 ml-1 text-sm font-medium text-gray-900 "><p>Tu Email</p><p className='text-red ml-2'>*</p></label>
                                                <input id="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} type="email"  className={getInputClasses(errors.email)} placeholder="tu_email@email.com" />
                                                {errors.email && <p className="text-red text-xs ml-1">Correo electrónico no válido</p>}
                                            </div>
                                            <br />   
                                            <hr />
                                            {/* Toggle SI chw - No chw */}
                                            <div className='flex items-center space-x-2 align-middle'>
                                                <input id="chw" {...register("chw")} type='checkbox' />
                                                <label htmlFor="chw" className="inline-block text-sm font-medium text-gray-900 ">Soy del Complejo Habitacional Wilde</label>
                                            </div>
                                            {chw ? (
                                                <div className="flex gap-4">
                                                {/* Torre */}
                                                <div>
                                                    <label htmlFor="torre" className="flex mb-1 ml-1 text-sm font-medium text-gray-900">Torre <p className='text-red ml-2'>*</p></label>
                                                    <input id="torre" {...register("torre", { required: true, onChange: (e) => setValue("torre", e.target.value.toUpperCase()), pattern: {value: /^([1-9]|[1-3][0-9]|4[0-8])$/, message: "Debe ingresar un número del 1 al 48"}})} type="text" className={getInputClasses(errors.torre)} placeholder="1-48"/>
                                                    {errors.torre && (<p className="text-red text-xs ml-1">{errors.torre.type === "required" ? "Este campo es obligatorio" : errors.torre.message}</p>)}
                                                </div>
                                                {/* Piso */}
                                                <div>
                                                    <label htmlFor="piso" className="flex mb-1 ml-1 text-sm font-medium text-gray-900">Piso<p className='text-red ml-2'>*</p></label>
                                                    <input id="piso" {...register("piso", { required: true, onChange: (e) => setValue("piso", e.target.value.toUpperCase()),pattern: {value: /^(1[0-1]|[0-9])$/, message: "Ingrese del 0 al 11. Planta Baja = 0" } })} type="text" className={getInputClasses(errors.piso)} placeholder="0-11"/>
                                                    {errors.piso && (<p className="text-red text-xs ml-1">{errors.piso.type === "required" ? "Este campo es obligatorio"  : errors.piso.message}</p>)}
                                                </div>
                                                {/* Depto */}
                                                <div>
                                                    <label htmlFor="depto" className="flex mb-1 ml-1 text-sm font-medium text-gray-900">Depto<p className='text-red ml-2'>*</p></label>
                                                    <input id="depto" {...register("depto", { required: true, onChange: (e) => setValue("depto", e.target.value.toUpperCase()),pattern: { value: /^[abcdABCD]$/, message: "Debe ingresar una letra válida (A, B, C, D)"} })} type="text" className={getInputClasses(errors.depto)} placeholder="A-B-C-D"/>
                                                    {errors.depto && (<p className="text-red text-xs ml-1">{errors.depto.type === "required" ? "Este campo es obligatorio" : errors.depto.message} </p>)}
                                                </div>
                                                </div>
                                            ) : (
                                            <div className="flex flex-col gap-4">
                                                {/* Calle */}
                                                <div>
                                                    <label htmlFor="calle" className="flex mb-1 ml-1 text-sm font-medium text-gray-900">Calle <p className='text-red ml-2'>*</p></label>
                                                    <input id="calle" {...register("calle", { required: true, onChange: (e) => setValue("calle", e.target.value.toUpperCase())})} type="text" className={getInputClasses(errors.calle)} placeholder="FIERRO"/>
                                                    {errors.calle && <p className="text-red text-xs ml-1">Este campo es obligatorio</p>}
                                                </div>

                                                {/* Altura */}
                                                <div>
                                                    <label htmlFor="altura" className="flex mb-1 ml-1 text-sm font-medium text-gray-900">Altura <p className='text-red ml-2'>*</p></label>
                                                    <input id="altura"  {...register("altura", { required: true, onChange: (e) => setValue("altura", e.target.value.toUpperCase()) })} type="text" className={getInputClasses(errors.altura)} placeholder="184"/>
                                                    {errors.altura && <p className="text-red text-xs ml-1">Este campo es obligatorio</p>}
                                                </div>

                                                {/* Torre, Piso, Depto opcionales */}
                                                <div className="flex gap-4">
                                                    {/* Torre */}
                                                    <div>
                                                        <label htmlFor="torre" className="flex mb-1 ml-1 text-sm font-medium text-gray-900">Torre <small>(Opcional)</small></label>
                                                        <input id="torre" {...register("torre",{ onChange: (e) => setValue("torre", e.target.value.toUpperCase())})} type="text" className={getInputClasses(errors.torre)} placeholder="A1"/>
                                                    </div>
                                                    {/* Piso */}
                                                    <div>
                                                        <label htmlFor="piso" className="flex mb-1 ml-1 text-sm font-medium text-gray-900">Piso <small>(Opcional)</small></label>
                                                        <input id="piso" {...register("piso",{ onChange: (e) => setValue("piso", e.target.value.toUpperCase())})} type="text" className={getInputClasses(errors.piso)} placeholder="7"/>
                                                    </div>
                                                    {/* Depto */}
                                                    <div>
                                                        <label htmlFor="depto" className="flex mb-1 ml-1 text-sm font-medium text-gray-900">Depto <small>(Opcional)</small></label>
                                                        <input id="depto" {...register("depto",{ onChange: (e) => setValue("depto", e.target.value.toUpperCase())})} type="text" className={getInputClasses(errors.depto)} placeholder="6"/>
                                                    </div>
                                                </div>
                                                
                                                {/* Localidad */}
                                                <div>
                                                    <label htmlFor="localidad" className="flex mb-1 ml-1 text-sm font-medium text-gray-900">Localidad <p className='text-red ml-2'>*</p></label>
                                                    <input id="localidad" {...register("localidad", { required: true, onChange: (e) => setValue("localidad", e.target.value.toUpperCase()) })} type="text" className={getInputClasses(errors.localidad)} placeholder="WILDE"/>
                                                    {errors.localidad && <p className="text-red text-xs ml-1">Este campo es obligatorio</p>}
                                                </div>
                                            </div>
                                            )}

                                            <p className="text-xs text-gray-500">Los campos marcados con (<span className='text-red'>*</span>) son obligatorios.</p>
                                            <p>Para Planta Baja colocar <span className='text-red'>0</span> </p>
                                            <hr />

                                            {/* Terminos y condiciones */}
                                            <div className="flex flex-col items-center">
                                                <div className='flex items-center'>
                                                    <input id="aceptar" {...register("aceptar", { required: true })} type="checkbox" className="w-4 h-4 text-primary bg-primary" />
                                                    <label htmlFor="aceptar" className="ml-2 text-sm font-medium">Acepto los términos y condiciones</label>
                                                </div>
                                                {errors.aceptar && <p className="text-red text-xs ml-1">Debes aceptar los términos y condiciones para continuar.</p>}
                                            </div>

                                            {/* Submit */}
                                            <button
                                                disabled={isSubmitting}
                                                className="w-full text-white bg-primary hover:bg-secondary uppercase font-medium rounded-lg text-sm px-5 py-2.5"
                                                onClick={() => {
                                                if (!chw) {
                                                    const calle = getValues('calle') || '';
                                                    const torre = getValues('torre') ? ` - Torre ${getValues('torre')}` : '';
                                                    const piso = getValues('piso') ? ` - Piso ${getValues('piso')}` : '';
                                                    const depto = getValues('depto') ? ` - Depto ${getValues('depto')}` : '';
                                                    const direccionCompleta = `${calle}${torre}${piso}${depto}`.trim();
                                                    //console.log('direccioncompleta:',direccionCompleta)
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
            </Transition>)
            }

        </section>
    );
};

export default ContactoSorteo;
