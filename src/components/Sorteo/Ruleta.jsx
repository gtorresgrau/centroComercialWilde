'use client';
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';


const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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

const sortearCandidatos = () => {
  const resultados = [];
  while (resultados.length < 4) {
    const torre = generateRandomNumber(1, 48);
    let cantPisos;

    if (torresR.torre.includes(torre)) {
      cantPisos = torresR.pisos;
    } else if (torresM.torre.includes(torre)) {
      cantPisos = torresM.pisos;
    } else {
      cantPisos = torresV.pisos;
    }

    const piso = generateRandomNumber(0, cantPisos);
    const depto = torresR.deptos[generateRandomNumber(0, 3)];
    const resultado = `Torre ${torre} Piso ${piso} Depto ${depto}`;

    if (!resultados.includes(resultado)) {
      resultados.push(resultado);
    }
  }
  return resultados;
};

const Ruleta = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1); // Estado para la opacidad

  const [state, setState] = useState({
    ganadores: [],
    suplentes: [],
    loading: false,
    loadingIndex: 0,
    randomDisplay: 'Torre 1 Piso 0 Depto A',
  });

  const handleCelebrar = () => {
    // Genera confetti
    confetti({
      particleCount: 500, // Aumenta la cantidad de confetti
      spread: 160, // Aumenta el ángulo de dispersión
      startVelocity: 90,
      decay: 0.9,
      gravity: 0.1,
      origin: { y: 1.3 }, // Origen de la lluvia de confetti
    });
  };
  

  const handleSortear = () => {
    const resultados = sortearCandidatos();
    setState((prev) => ({ ...prev, loading: true, ganadores: [], suplentes: [], loadingIndex: 0 }));

    const loadResults = (index) => {
      if (index < resultados.length) {
        const randomDuration = 2500;

        const showRandom = setInterval(() => {
          setState((prev) => ({
            ...prev,
            randomDisplay: `Torre ${generateRandomNumber(1, 48)} Piso ${generateRandomNumber(0, 11)} Depto ${['A', 'B', 'C', 'D'][generateRandomNumber(0, 3)]}`,
          }));
        }, 100);

        setTimeout(() => {
          clearInterval(showRandom);
          const ganador = resultados[index];
          setState((prev) => {
            const updatedGanadores = index < 2 ? [...prev.ganadores, ganador] : prev.ganadores;
            const updatedSuplentes = index >= 2 ? [...prev.suplentes, ganador] : prev.suplentes;

            return {
              ...prev,
              ganadores: updatedGanadores,
              suplentes: updatedSuplentes,
              randomDisplay: ganador,
              loadingIndex: index + 1,
            };
          });

          // Llama directamente a loadResults(index + 1) sin un retraso
          loadResults(index + 1);
        }, randomDuration);
      } else {
        setState((prev) => ({ ...prev, loading: false }));
  // Llama a handleCelebrar cada 200 ms
  let celebracionCount = 4 // Número de veces que quieres llamar a handleCelebrar
  const interval = setInterval(() => {
      handleCelebrar();
      celebracionCount -= 1;

      if (celebracionCount <= 0) {
          clearInterval(interval); // Detener el intervalo después de 3 llamadas
      }
  }, 350); // Cada 200 milisegundos
      }
    };

    loadResults(0);
  };

  useEffect(() => {
    let interval;
    if (state.loading) {
      interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          randomDisplay: `Torre ${generateRandomNumber(1, 48)} Piso ${generateRandomNumber(0, 11)} Depto ${['A', 'B', 'C', 'D'][generateRandomNumber(0, 3)]}`,
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [state.loading]);

  const renderResult = (result) => {
    const partes = result.split(' ');
    return (
      <div className='grid grid-cols-3 items-center min-h-[60px]'>
        <div className='grid grid-cols-2 gap-2 text-center'>
          <p className='font-bold'>Torre</p>
          <p>{partes[1]}</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <p className='font-bold'>Piso</p>
          <p>{partes[3]}</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <p className='font-bold'>Depto</p>
          <p>{partes[5]}</p>
        </div>
      </div>
    );
  };

  return (
    <section id='ruleta' className='bg-bgpink px-4'>
    
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 py-4" style={{ background: 'linear-gradient(to right, #9C27B0, #1E1E1E)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        SORTEO DE EXPENSAS PARA CHW
      </h1>
      <span className='text-center text-xs md:text-base'>
        El sorteo se realiza con este mismo sistema desde la administración del centro comercial wilde para los departamentos del Complejo Habitacional Wilde.
      </span>
      <div className='flex justify-around items-center mt-4'>
        <div className="items-center mx-auto max-w-2xl px-4 pb-32 mb-32 lg:max-w-7xl lg:px-8">
          <div className='mb-4 md:min-h-[100px] md:min-w-[600px] w-full'>
            <div className='flex flex-col md:flex-row gap-4 items-center text-center'>
              <div>
                <button className="bg-transparent hover:bg-purple text-purple font-semibold hover:text-white py-3 px-4 border border-lightgrehover:border-transparent rounded m-4 md:my-0" onClick={handleSortear} disabled={state.loading}>
                  {state.loading && state.loadingIndex < 4 ? 'SORTEANDO...' : 'SORTEAR'}
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className='min-h-[80px] md:min-w-[370px] mx-2'>
                  <div className='border border-purple rounded px-4 py-4'>
                    <h2><strong>Ganadores</strong></h2>
                    {state.ganadores.map((ganador) => renderResult(ganador))}
                    {state.loading && state.loadingIndex < 2 && renderResult(state.randomDisplay)}
                  </div>
                </div>
                <div className='min-h-[80px] md:min-w-[170px] mx-2'>
                  <div className='border border-purple rounded px-4 py-4'>
                    <h2><strong>Suplentes</strong></h2>
                    {state.suplentes.map((suplente) => renderResult(suplente))}
                    {state.loading && state.loadingIndex > 1 && state.loadingIndex < 4 && renderResult(state.randomDisplay)}
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
