/* eslint-disable @next/next/no-img-element */
"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import RedesSociales from '../Socials/RedesSociales'
import Loading from '../Loading/Loading'
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';


export default function Modal({ product, onClose }: any) {
  const [imageLoaded, setImageLoaded] = useState(true);
  let [isOpen, setIsOpen] = useState(true)

  const {local, email, ubicacion, horarios, n_local, rubro, rubroSecundario, instagram, facebook, celular, fotoLocal, texto, linea } = product;

  const sector = ubicacion === 'Afuera'? 'en la galeria externa':'en '+ ubicacion;
  const frase = rubroSecundario === 'No tengo'? null: 'Ademas de ' + rubro + ' tambien posee ' + rubroSecundario + '.' ;
  const fraseUsuario = texto || null;

  const handleImageLoad = () => {
    setImageLoaded(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Detalles del local: ${local}`,
          text: `Visita el local ${local}, ubicado ${sector}. ${fraseUsuario ? fraseUsuario + ' ' : ''}${frase ? frase : ''}`,
          url: window.location.href, // La URL actual incluyendo el hash del local
        });
        console.log('Contenido compartido exitosamente');
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      console.error('La API de compartir no está soportada en este navegador.');
    }
  };

  return (
    <>
      <Transition appear  show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" style={{zIndex:100}} onClose={()=>onClose()}>
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
                <button className="absolute top-3 right-5 rounded-sm bg-slate-200 hover:bg-primary text-gray-500 hover:text-gray-200" onClick={()=>onClose()}>
                  <CloseIcon />
                </button>
                <h2 className="text-lg font-semibold mb-2">{local.toUpperCase()}</h2>
                {imageLoaded && <Loading />}
                  <div className="rounded-xl shadow-lg w-350 h-350">
                    <img src={fotoLocal} alt={local} className='rounded-xl shadow-lg object-cover' style={{ maxHeight: '350px', width:'500px'}} width={500} height={500} onLoad={handleImageLoad} loading='lazy'/> 
                  </div>
                  <div className="mt-2">
                      {fraseUsuario
                        ?(<p className="text-sm text-gray-500 pt-2">{fraseUsuario}</p>)
                        :(<><p className="text-sm text-gray-500 pt-2">El local {local} esta ubicado {sector}, en el local número {n_local}. El horario de atención es de {horarios} hs. {frase} </p></>)}
                  </div>
                  <div className="items-center flex justify-center mt-4">
                    <button className="bg-slate-300 text-black font-medium mx-4  w-8 h-8 rounded-lg  transition-transform transform hover:scale-110" onClick={handleShare}>
                      <ShareIcon />
                    </button>
                    <RedesSociales
                        instagram={instagram}
                        facebook={facebook}
                        contact={celular}
                        linea={linea}
                        email={email}
                    />

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
