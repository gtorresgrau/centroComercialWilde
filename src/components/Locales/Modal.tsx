"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import RedesSociales from '../Socials/RedesSociales'
import Loading from '../Loading/Loading'


export default function Modal(props:any) {
  let [isOpen, setIsOpen] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(true);

  function closeModal() {
    setIsOpen(false)
    props.modal(false)
  }

  const {local, email, ubicacion, horarios, n_local, rubro, rubroSecundario, instagram, facebook, celular, fotoLocal, texto, linea } = props.product;

  const sector = ubicacion === 'Afuera'? 'en la galeria externa':'en '+ ubicacion;
  const frase = rubroSecundario === 'No tengo'? null: 'Ademas de ' + rubro + ' tambien posee ' + rubroSecundario + '.' ;
  const fraseUsuario = texto || null;

  const handleImageLoad = () => {
    setImageLoaded(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" style={{zIndex:100}} onClose={closeModal}>
        <div className="fixed inset-0"></div>
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
                <Dialog.Panel className="flex flex-col justify-center items-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {imageLoaded && <Loading />}
                  <div className="rounded-xl shadow-lg w-350 h-350">
                    <img src={fotoLocal} alt={local} className='rounded-xl shadow-lg object-cover' style={{ maxHeight: '350px', width:'500px'}} width={500} height={500} onLoad={handleImageLoad}/> 
                  </div>
                  <div className="mt-2">
                      {fraseUsuario
                        ?fraseUsuario
                        :(<><p className="text-sm text-gray-500 pt-2">El local {local} esta ubicado {sector}, en el local número {n_local}. El horario de atención es de {horarios} hs. {frase} </p><p className="text-sm text-gray-500">El email de contacto es: {email}</p></>)}
                  </div>
                  <div className="grid grid-cols-2 mt-4">
                        <button type="button" className="col-span-1 bg-lightgrey hover:bg-purple text-white font-medium hover:text-white py-0 px-3 m-3 outline outline-1 rounded-full transition-transform transform hover:scale-110 " onClick={closeModal}>VOLVER</button>
                        <RedesSociales instagram={instagram} facebook={facebook} contact={celular} linea={linea}/>
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
