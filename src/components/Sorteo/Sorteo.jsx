import React from 'react';
import ContactoSorteo from './contactoSorteo';
import Link from 'next/link';
import './sorteo.css';

const Sorteo = () => {
  return (
    <section id="sorteo" className="bg-bgpink">
      <div className="items-center mx-auto max-w-2xl px-4 pt-16 pb-32 sm:pt-32 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 auto-rows-auto gap-4">
          <article className="flex flex-col justify-center row-span-1 items-center">
            <h2 className="text-center text-4xl md:text-5xl font-bold tracking-tight text-gray-900 my-4 "
              style={{ 
                background: 'linear-gradient(to right, #9C27B0, #1E1E1E)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}>
              Sorteos Todos los Meses
            </h2>
            <span className='text-center mb-8'><strong>¡Anotate! </strong>este puede ser tu mes</span>
          </article>
          <article className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="flex flex-col justify-between row-span-1 col-span-1">
              <div className="min-h-24 mb-8">
                <h3 className="text-lg font-bold">2 expensas del Complejo Habitacional Wilde</h3>
                <span>¿Sos del Complejo Habitacional Wilde?<br/> Ingresa al siguiente link para anotarte y participar por las expensas.</span>
              </div>
              <div>
                <ContactoSorteo />
                <Link href="/ruleta">
                  <button className="bg-transparent mt-8 hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgre hover:border-transparent rounded w-full">
                    ¡Mira cómo se hace el sorteo!
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-between row-span-1 col-span-1">
              <div className="min-h-24 mb-8">
                <h3 className="text-lg font-bold">2 órdenes de compra</h3>
                <span>¿Vivís afuera del Complejo Habitacional Wilde?<br/> Tenés la oportunidad de ganarte una orden de compra en el centro comercial.</span>
              </div>
              <div>
                <ContactoSorteo />
                <Link href="/ruleta">
                  <button className="bg-transparent mt-8 hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgre hover:border-transparent rounded w-full">
                    ¡Mira cómo se hace el sorteo!
                  </button>
                </Link>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

export default Sorteo;