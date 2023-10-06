// Locales DATA
import React from 'react';

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
  const { imagen, redes_sociales, ubicacion, contacto } = product;
  return (
    <div key={contacto} className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        <img
          src={imagen}
          alt={`Product Image: ${ubicacion}`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <div>
          <div className="border border-white rounded-lg -mt-8 bg-white p-2 mentorShadow">
            <h3 className="text-sm text-gray-700 text-center">
              <a href={redes_sociales}>
                <span aria-hidden="true" className="absolute inset-0" />
                {ubicacion}
              </a>
            </h3>
          </div>
          <p className="mt-3 text-2xl font-semibold text-offblack text-center">
            {contacto}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
