import { CardProps } from '@/src/types/interfaces';
import React from 'react';

const Card: React.FC<CardProps & { onOpen: () => void }> = ({ product, onOpen }) => {
  const { logoLocal, ubicacion, n_local, local } = product;

  const handleModal = () => {
    onOpen();
    window.history.pushState(null, '', `#${n_local}`); // Update the URL with the hash
  };

  return (
    <div key={n_local} className="group relative shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] bg-white rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg" >
      <div className="w-full p-2 h-80 overflow-hidden bg-white">
        <img src={logoLocal} width={500} height={500} aria-label={`Nombre local: ${local}`} alt={`Product Image: ${ubicacion}`} className="object-cover w-full h-full rounded-md" loading='lazy'/>
      </div>
      <div className="p-2 relative bottom-2 ">
        <div className="w-5/6 sm:w-3/4 mx-auto border border-white rounded-lg -mt-6 mb-2 bg-white">
            <h2 className="text-xl font-semibold text-offblack text-center">{local}</h2>
            <h3 className="text-sm text-gray-700 text-center mb-4">{ubicacion}</h3>
        </div>
         <div className="flex justify-center m-2">
            <button className="bg-lightgrey text-white font-medium py-2 px-6 rounded-full hover:bg-[#701a75] transition-transform transform hover:scale-110" onClick={handleModal}>Ver detalle</button>
         </div>
      </div>
    </div>
  );
};

export default Card;
