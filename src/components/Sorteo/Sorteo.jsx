import React from 'react'
import ContactoSorteo from './contactoSorteo'
import Link from 'next/link'

const Sorteo = () => {
  return (
    <section id='sorteo' className='bg-bgpink'>
        <div className="items-center mx-auto max-w-2xl px-4 pt-16 pb-32 sm:pt-32 lg:max-w-7xl lg:px-8">    
            <div className='sm:flex justify-around items-center'>
                <div className='mb-4'>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4" 
                        style={{ 
                            background: 'linear-gradient(to right, #9C27B0, #1E1E1E)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            }}>SORTEAMOS <strong>2</strong> EXPENSAS<br/> del CHW
                    </h2>
                    {/* <span className='text-lg font-medium'>ANOTATE! este puede ser tu mes</span><br/> */}
                    <Link href='/ruleta'>
                        <button className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrehover:border-transparent rounded" >Mira como se hace el sorteo!</button>
                    </Link>
                </div>
                <ContactoSorteo />
            </div>
        </div>
    </section>
  )
}

export default Sorteo