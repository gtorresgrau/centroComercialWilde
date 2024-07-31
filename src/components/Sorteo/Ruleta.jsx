'use client'
import Link from 'next/link'
import React, {useState} from 'react'

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const sortearCandidatos = () => {
  const torres = 48;
  const pisos = 10;
  const departamentos = ['A', 'B', 'C', 'D'];

  const resultados = [];
  while (resultados.length < 4) {
    const torre = generateRandomNumber(1, torres);
    const piso = generateRandomNumber(0, pisos);
    const depto = departamentos[generateRandomNumber(0, departamentos.length - 1)];
    const resultado = `Torre ${torre} Piso ${piso} Depto ${depto}`;

    if (!resultados.includes(resultado)) {
      resultados.push(resultado);
    }
  }

  return resultados;
};

const Ruleta = () => {
    const [ganadores, setGanadores] = useState([]);
    const [suplentes, setSuplentes] = useState([]);
  
    const handleSortear = () => {
      const resultados = sortearCandidatos();
      setGanadores(resultados.slice(0, 2));
      setSuplentes(resultados.slice(2, 4));
    };

  return (
    <section id='ruleta' className='bg-bgpink px-4'>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 py-4" style={{ background: 'linear-gradient(to right, #9C27B0, #1E1E1E)', WebkitBackgroundClip: 'text', color: 'transparent'}}>SORTEO DE EXPENSAS PARA CHW</h1>
        <span className='text-center text-xs md:text-base'>El sorteo se realiza desde la administacion del centro comercial wilde para los departamentos del Complejo Habitacional Wilde.</span>
        <div className='flex justify-around items-center mt-4'>
            <div className="items-center mx-auto max-w-2xl px-4 pb-32 mb-32 lg:max-w-7xl lg:px-8">    
                <div className='mb-4 md:min-h-[100px] md:min-w-[521px] w-full'>
                    <div className='flex flex-col md:flex-row gap-4 align-middle text-center'>
                        <div className="">
                            <button className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrehover:border-transparent rounded m-4 md:my-0" onClick={handleSortear}>SORTEAR</button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-10">
                            <div className='min-h-[80px] md:min-w-[170px] mx-2'>
                                <h2>Ganadores</h2>
                                {ganadores.map((ganador, index) => (
                                <p key={index} className='text-start'>{index+1}-{ganador}</p>
                                ))}
                            </div>
                            <div className='min-h-[80px] md:min-w-[170px] mx-2'>
                                <h2>Suplentes</h2>
                                {suplentes.map((suplente, index) => (
                                <p key={index} className='text-start'>{index+1}-{suplente}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Ruleta