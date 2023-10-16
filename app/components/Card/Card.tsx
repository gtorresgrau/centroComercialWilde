// Locales DATA
import React,{useState} from 'react';
import Modal from '../Socials/Modal';

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
    <div key={n_local} className="group relative shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-lg">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80 ">
        <img
          src={logoLocal}
          alt={`Product Image: ${ubicacion}`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-center">
            <div className="border border-white rounded-lg -mt-8 bg-white p-2 mentorShadow">
              <h2 className="text-sm text-gray-700 text-center">{ubicacion}</h2>
              <p className="mt-3 text-2xl font-semibold text-offblack text-center">{local}</p>
            </div>
      </div>
      <div className='grid grid-cols-2 mt-1 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-lg'>
        <button className="col-span-1 bg-transparent  hover:bg-purple text-purple font-medium hover:text-white py-0 px-3 m-3 outline outline-1  outeline- bg-purple rounded " onClick={handleModal}>Ver detalle</button>
      </div>      
        { modal && <Modal  product={product} modal={mod}/> }
    </div>
  );
};

export default Card;
