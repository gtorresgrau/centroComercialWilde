'use client'
import React from 'react';

const Ubicacion =()=>{

    return(
        <section id="ubicacion" className="mx-auto max-w-2xl pb-16 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8">
            <article className='flex flex-col items-center justify-center p-2 m-2  w-full'>
                <h2 className='text-2xl text-black pb-10'>¿Dónde nos encontras?</h2>
                <div className='w-full'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3280.5077133504637!2d-58.3034688!3d-34.6923721!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a33362e201a62d%3A0x1cc2d66dad49ac4e!2sCentro%20Comercial%20Wilde!5e0!3m2!1ses-419!2sar!4v1699369810228!5m2!1ses-419!2sar"
                        height="450"
                        width='fit'
                        className='w-full'
                        style={{ border: "0" }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>
            </article>
        </section>
    );
};


export default Ubicacion;