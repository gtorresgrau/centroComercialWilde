'use client';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const torres = {
  R: { torre: [1, 3, 4, 14, 17, 18, 21, 22, 23, 24, 25, 28, 29, 32, 33, 35, 36, 38, 39, 44], pisos: 11, deptos: ['A', 'B', 'C', 'D'] },
  M: { torre: [5, 6, 8, 9, 11, 12, 13, 15, 19, 20, 26, 27, 30, 31, 40, 42, 43, 45, 46, 47, 48], pisos: 10, deptos: ['A', 'B', 'C', 'D'] },
  V: { torre: [2, 7, 10, 16, 34, 37, 41], pisos: 6, deptos: ['A', 'B', 'C', 'D'] }
};

const sortResults = () => {
  const resultados = [];
  while (resultados.length < 4) {
    const torre = generateRandomNumber(1, 48);
    let cantPisos;

    if (torres.R.torre.includes(torre)) {
      cantPisos = torres.R.pisos;
    } else if (torres.M.torre.includes(torre)) {
      cantPisos = torres.M.pisos;
    } else {
      cantPisos = torres.V.pisos;
    }

    const piso = generateRandomNumber(1, cantPisos);
    const depto = torres.R.deptos[generateRandomNumber(0, 3)];
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
  const [randomDisplay, setRandomDisplay] = useState('Torre 1 Piso 0 Depto A');

  const handleCelebrar = () => {
    confetti({
      particleCount: 500,
      spread: 160,
      startVelocity: 90,
      decay: 0.9,
      gravity: 0.1,
      origin: { y: 1.3 },
    });
  };

  const loadResults = (index, resultados) => {
    if (index < resultados.length) {
      const randomDuration = 2500;
      const showRandom = setInterval(() => {
        setRandomDisplay(`Torre ${generateRandomNumber(1, 48)} Piso ${generateRandomNumber(1, 11)} Depto ${['A', 'B', 'C', 'D'][generateRandomNumber(0, 3)]}`);
      }, 150);

      setTimeout(() => {
        clearInterval(showRandom);
        const ganador = resultados[index];

        if (index < 2) setGanadores((prev) => [...prev, ganador]);
        else setSuplentes((prev) => [...prev, ganador]);

        setRandomDisplay(ganador);
        setLoadingIndex(index + 1);

        loadResults(index + 1, resultados);
      }, randomDuration);
    } else {
      setLoading(false);
      let celebracionCount = 4;
      const interval = setInterval(() => {
        handleCelebrar();
        celebracionCount -= 1;

        if (celebracionCount <= 0) {
          clearInterval(interval);
        }
      }, 350);
    }
  };

  const handleSortear = () => {
    const resultados = sortResults();
    setLoading(true);
    setGanadores([]);
    setSuplentes([]);
    setLoadingIndex(0);
    loadResults(0, resultados);
  };

  const renderResult = (result, index) => {
    const [_, torre, __, piso, ___, depto] = result.split(' ');
    return (
      <div key={index} className='grid grid-cols-3 items-center min-h-[60px]'>
        <div className='grid grid-cols-2 gap-2 text-center'>
          <p className='font-bold'>Torre</p>
          <p>{torre}</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <p className='font-bold'>Piso</p>
          <p>{piso}</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <p className='font-bold'>Depto</p>
          <p>{depto}</p>
        </div>
      </div>
    );
  };

  return (
    <section id='ruleta' className='bg-bgpink px-4 text-center mt-20'>
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 py-4" style={{ background: 'linear-gradient(to right, #9C27B0, #1E1E1E)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        SORTEO DE EXPENSAS PARA CHW
      </h1>
      <span className='text-center text-xs md:text-base'>
        El sorteo se realiza con este mismo sistema desde la administración del Centro Comercial Wilde para los departamentos del Complejo Habitacional Wilde.
      </span><br/>
      <span className='text-center text-xs md:text-base'>
        ¡Ya hay varios ganadores, y vos podés ser el próximo! <strong>¡Anotate fácil y rápido!</strong>
      </span>
      <div className='flex justify-around items-center mt-4'>
        <div className="items-center mx-auto max-w-2xl px-1 pb-32 mb-32 lg:max-w-7xl lg:px-4">
          <div className='mb-4 md:min-h-[100px] md:min-w-[600px] w-full'>
            <div className='flex flex-col md:flex-row items-center text-center'>
              <div>
                <button className="min-w-[150px] bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-2 border border-lightgrehover:border-transparent rounded m-4 md:my-0" onClick={handleSortear} disabled={loading}>
                  {loading && loadingIndex < 4 ? 'SORTEANDO...' : 'SORTEAR'}
                </button>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 w-full">
                <div className='min-h-[178px] w-full xs:min-w-[320px] sm:min-w-[370px] border border-purple rounded'>
                  <div className='px-2 py-4'>
                    <h2><strong>GANADORES</strong></h2>
                    {ganadores.map((ganador, index) => renderResult(ganador, index))}
                    {loading && loadingIndex < 2 && renderResult(randomDisplay)}
                  </div>
                </div>
                <div className='min-h-[178px] w-full xs:min-w-[320px] sm:min-w-[370px] border border-purple'>
                  <div className='rounded px-2 py-4'>
                    <h2><strong>SUPLENTES</strong></h2>
                    {suplentes.map((suplente, index) => renderResult(suplente, index))}
                    {loading && loadingIndex > 1 && loadingIndex < 4 && renderResult(randomDisplay)}
                  </div>
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
