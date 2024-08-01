'use client'
import React, { useState } from 'react';
import Loading from '../Loading/Loading';

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const sortearCandidatos = () => {
  const torres = 48;
  const torresR = {
    torre: [1, 3, 4, 14, 17, 18, 21, 22, 23, 24, 25, 28, 29, 32, 33, 35, 36, 38, 39, 44],
    pisos: 11,
    deptos: ['A', 'B', 'C', 'D'],
  };
  const torresM = {
    torre: [5, 6, 8, 9, 11, 12, 13, 15, 19, 20, 26, 27, 30, 31, 40, 42, 43, 45, 46, 47, 48],
    pisos: 10,
    deptos: ['A', 'B', 'C', 'D'],
  };
  const torresV = {
    torre: [2, 7, 10, 16, 34, 37, 41],
    pisos: 6,
    deptos: ['A', 'B', 'C', 'D'],
  };
  const resultados = [];
  while (resultados.length < 4) {
    const torre = generateRandomNumber(1, torres);

    let cantPisos;
    if (torresR.torre.includes(torre)) {
      cantPisos = torresR.pisos;
    } else if (torresM.torre.includes(torre)) {
      cantPisos = torresM.pisos;
    } else {
      cantPisos = torresV.pisos;
    }

    const piso = generateRandomNumber(0, cantPisos);
    let departamentos = ['A', 'B', 'C', 'D'];

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
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);

  const handleSortear = () => {
    const resultados = sortearCandidatos();
    setLoading(true);
    setGanadores([]);
    setSuplentes([]);
    setLoadingIndex(0);

    const loadResults = (index) => {
      if (index < resultados.length) {
        setTimeout(() => {
          if (index < 2) {
            setGanadores((prev) => [...prev, resultados[index]]);
          } else {
            setSuplentes((prev) => [...prev, resultados[index]]);
          }
          setLoadingIndex(index + 1);
          loadResults(index + 1);
        }, 1500);
      } else {
        setLoading(false);
      }
    };

    loadResults(0);
  };

  return (
    <section id='ruleta' className='bg-bgpink px-4'>
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 py-4" style={{ background: 'linear-gradient(to right, #9C27B0, #1E1E1E)', WebkitBackgroundClip: 'text', color: 'transparent' }}>SORTEO DE EXPENSAS PARA CHW</h1>
      <span className='text-center text-xs md:text-base'>El sorteo se realiza con este mismo sistema desde la administacion del centro comercial wilde para los departamentos del Complejo Habitacional Wilde.</span>
      <div className='flex justify-around items-center mt-4'>
        <div className="items-center mx-auto max-w-2xl px-4 pb-32 mb-32 lg:max-w-7xl lg:px-8">
          <div className='mb-4 md:min-h-[100px] md:min-w-[600px] w-full'>
            <div className='flex flex-col md:flex-row gap-4 items-center text-center'>
              <div className="">
                <button className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrehover:border-transparent rounded m-4 md:my-0" onClick={handleSortear} disabled={loading}>
                  {loading ? 'SORTEANDO...' : 'SORTEAR'}
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-10">
                <div className='min-h-[80px] md:min-w-[170px] mx-2'>
                  <h2><strong>Ganadores</strong></h2>
                  {ganadores.map((ganador, index) => (
                    <p key={index} className='text-start'>{index + 1}-{ganador}</p>
                  ))}
                  {loading && loadingIndex < 2 && <Loading ancho={'20px'}  />}
                </div>
                <div className='min-h-[80px] md:min-w-[170px] mx-2'>
                  <h2><strong>Suplentes</strong></h2>
                  {suplentes.map((suplente, index) => (
                    <p key={index} className='text-start'>{index + 1}-{suplente}</p>
                  ))}
                  {loading && loadingIndex >= 2 && <Loading ancho={'20px'} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ruleta;
