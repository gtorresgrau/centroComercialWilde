import React from 'react';
import ContactoSorteo from './contactoSorteo';
import Link from 'next/link';
import './sorteo.css';

const Sorteo = () => {
  return (
    <section id='sorteo' className='bg-bgpink'>
      <div className="items-center mx-auto max-w-2xl px-4 pt-16 pb-32 sm:pt-32 lg:max-w-7xl lg:px-8">
        <div className='grid grid-cols-1 justify-around items-center justify-self-center text-center'>
          <div className='grid grid-cols-1 mb-4 items-center'>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 my-4 mb-8"
              style={{ 
                background: 'linear-gradient(to right, #9C27B0, #1E1E1E)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}>SORTEAMOS <strong>2</strong> EXPENSAS del <br /> COMPLEJO HABITACIONAL WILDE
            </h2>
            <span className='text-lg font-medium'><strong>¡ANOTATE!</strong> Este puede ser tu mes</span><br />
          </div>
          <div className="grid grid-cols-1 place-items-center md:grid-cols-2">
            <div className="">
              <Link href='/ruleta'>
                <button className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrehover:border-transparent rounded">
                  ¡Mira cómo se hace el sorteo!
                </button>
              </Link>
            </div>
            <div className="my-4">
              <ContactoSorteo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sorteo;
