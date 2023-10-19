// Locales DATA
import React,{useState} from 'react';
import Modal from '../Locales/Modal';
import Image from 'next/image';

export interface CardProps {
    product: {
      local: string,
      n_local: number,
      email: string,
      contacto: string,
      celular: number,
      ubicacion: string,
      rubro: string,
      rubroSecundario: string,
      horarios: string,
      logoLocal: string,
      fotoLocal: string,
      texto?: string,
    };
  }
  
  
  const Card: React.FC<CardProps> = ({ product }) => {
      const { logoLocal, ubicacion, n_local, local } = product;
 const mod= (data:any)=>{
  if(data===false)
  setModal(data)
}
const [modal, setModal] = useState(false)
  const handleModal = () => {
    setModal(!modal)
  }

  return ( 
    <div key={n_local} className="group relative shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-xl flex flex-col justify-center items-center" >
      <div className="min-h-80 aspect-w-1 aspect-h-1  w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 sm:aspect-none sm:h-80 ">
        <Image
          src={logoLocal}
          width={500}
          height={500}
          alt={`Product Image: ${ubicacion}`}
          className="h-full w-full object-cover object-center p-2 rounded-xl"
        />
      </div>
      <div className="flex justify-center">
            <div className="border border-white rounded-lg -mt-4 bg-white p-2 mentorShadow">
              <h2 className="text-lg md:text-2xl font-semibold text-offblack text-center">{local}</h2>
              <h3 className="text-sm md:text-lg text-gray-700 text-center">{ubicacion}</h3>
            </div>
      </div>
      <div className='flex justify-center items-center mt-1 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-lg'>
        <button className=" bg-transparent hover:bg-purple text-purple font-medium hover:text-white py-0 px-6 m-3 outline outline-1  outeline- bg-purple rounded " onClick={handleModal}>Ver detalle</button>
      </div>      
        { modal && <Modal  product={product} modal={mod}/> }
    </div>
  );
};

export default Card;
