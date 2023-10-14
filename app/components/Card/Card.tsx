// Locales DATA
import React from 'react';
import ButtonWsp from '../Whatsapp/ButtonWsp';

interface CardProps {
    product: {
      email: string;
      n_local: string;
      contacto: string;
      celular: string;
      ubicacion: string;
      rubro: string;
      horarios: string;
      imagen: string;
      redes_sociales: string;
    };
  }


  const Card: React.FC<CardProps> = ({ product }) => {
  const { imagen, redes_sociales, ubicacion, contacto, celular } = product;
  return (
    <div key={contacto} className="group relative shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-lg">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 ">
        <img
          src={imagen}
          alt={`Product Image: ${ubicacion}`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-center">
            <div className="border border-white rounded-lg -mt-8 bg-white p-2 mentorShadow">
              <h2 className="text-sm text-gray-700 text-center">
                <a href={redes_sociales}>{ubicacion}</a>
              </h2>
              <p className="mt-3 text-2xl font-semibold text-offblack text-center">{contacto}</p>
            </div>
      </div>
      <ButtonWsp text='contacto' contact={`+54${celular}`} />
    </div>
  );
};

export default Card;
