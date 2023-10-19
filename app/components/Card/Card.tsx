import React, { useState } from 'react';
import Modal from '../Locales/Modal';
import Image from 'next/image';

export interface CardProps {
  product: {
    local: string;
    n_local: number;
    email: string;
    contacto: string;
    celular: number;
    ubicacion: string;
    rubro: string;
    rubroSecundario: string;
    horarios: string;
    logoLocal: string;
    fotoLocal: string;
    texto?: string;
  };
}

const Card: React.FC<CardProps> = ({ product }) => {
  const { logoLocal, ubicacion, n_local, local } = product;
  const mod = (data: any) => {
    if (data === false) setModal(data);
  };
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div
      key={n_local}
      className="group relative shadow-md bg-white rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <div className="w-full h-80 overflow-hidden rounded-t-lg bg-gray-200">
        <Image
          src={logoLocal}
          width={500}
          height={500}
          alt={`Product Image: ${ubicacion}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-offblack text-center mb-2">{local}</h2>
        <h3 className="text-sm text-gray-700 text-center mb-4">{ubicacion}</h3>
        <div className="flex justify-center">
          <button
            className="bg-[#a855f7] text-white font-medium py-2 px-6 rounded-full hover:bg-[#701a75] transition-transform transform hover:scale-110"
            onClick={handleModal}
          >
            Ver detalle
          </button>
        </div>
      </div>
      {modal && <Modal product={product} modal={mod} />}
    </div>
  );
};

export default Card;


