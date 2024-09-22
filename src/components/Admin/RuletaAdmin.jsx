'use client';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const RuletaAdmin = ({ userSorteo }) => {
  const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const torres = {
    R: { torre: [1, 3, 4, 14, 17, 18, 21, 22, 23, 24, 25, 28, 29, 32, 33, 35, 36, 38, 39, 44], pisos: 11, deptos: ['A', 'B', 'C', 'D'] },
    M: { torre: [5, 6, 8, 9, 11, 12, 13, 15, 19, 20, 26, 27, 30, 31, 40, 42, 43, 45, 46, 47, 48], pisos: 10, deptos: ['A', 'B', 'C', 'D'] },
    V: { torre: [2, 7, 10, 16, 34, 37, 41], pisos: 6, deptos: ['A', 'B', 'C', 'D'] }
  };

  const calles = ['Avenida_Rivadavia', 'Avenida_9_de_Julio', 'Avenida_Corrientes', 'Calle_Florida', 'Avenida_Belgrano', 'Avenida_de_Mayo', 'Calle_Lavalle', 'Avenida_Santa_Fe', 'Avenida_Callao', 'Avenida_Libertador', 'Calle_Reconquista', 'Calle_Esmeralda', 'Calle_Alsina', 'Avenida_Córdoba', 'Avenida_Pueyrredón'];
  const localidades = ['La_Plata', 'Mar_del_Plata', 'Bahía_Blanca', 'San_Nicolás', 'Tandil', 'Olavarría', 'San_Isidro', 'Lomas_de_Zamora', 'Lanús', 'Avellaneda', 'Quilmes', 'Morón', 'San_Fernando', 'Tres_de_Febrero', 'Vicente_López'];

  const sortResults = (vivoCHW) => {
    const resultados = [];
    while (resultados.length < 4) {
      const torre = vivoCHW ? generateRandomNumber(1, 48) : calles[generateRandomNumber(0, calles.length - 1)];
      let cantPisos;

      if (torres.R.torre.includes(torre)) {
        cantPisos = torres.R.pisos;
      } else if (torres.M.torre.includes(torre)) {
        cantPisos = torres.M.pisos;
      } else {
        cantPisos = torres.V.pisos;
      }

      const piso = vivoCHW ? generateRandomNumber(1, cantPisos) : generateRandomNumber(1, 6000);
      const depto = vivoCHW ? torres.R.deptos[generateRandomNumber(0, 3)] : localidades[generateRandomNumber(0, localidades.length - 1)];
      const resultado = `Torre ${torre} Piso ${piso} Depto ${depto}`;

      if (!resultados.includes(resultado)) {
        resultados.push(resultado);
      }
    }
    return resultados;
  };

  const [ganadores, setGanadores] = useState([]);
  const [suplentes, setSuplentes] = useState([]);
  const [vivoCHW, setVivoCHW] = useState(false);
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
        vivoCHW
          ? setRandomDisplay(`Torre ${generateRandomNumber(1, 48)} Piso ${generateRandomNumber(1, 11)} Depto ${['A', 'B', 'C', 'D'][generateRandomNumber(0, 3)]}`)
          : setRandomDisplay(`Calle ${calles[generateRandomNumber(0, calles.length - 1)]} Altura ${generateRandomNumber(1, 6000)} Localidad ${localidades[generateRandomNumber(0, localidades.length - 1)]}`);
      }, 150);

      setTimeout(() => {
        clearInterval(showRandom);
        const ganador = resultados[index];

        if (index < 2) setGanadores((prev) => [...prev, ganador]);
        else setSuplentes((prev) => [...prev, ganador]);

        setRandomDisplay(`${ganador.nombre} ${ganador.apellido}`);
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
    let resultados = [];
    
    resultados = shuffleArray(userSorteo).slice(0, 4);
        console.log(resultados)
      
  
    // If no valid results were found, log an error and prevent further execution
    if (resultados.length === 0) {
      console.error("No valid results found for the current userSorteo.");
      return;
    }
  
    setLoading(true);
    setGanadores([]);
    setSuplentes([]);
    setLoadingIndex(0);
    loadResults(0, resultados);
  }

  const renderResult = (result, index) => {
    if (vivoCHW) {
      return (
        <div key={index} className="grid grid-cols-3 items-center min-h-[60px]">
          <div className="grid grid-cols-2 gap-2 text-center">
            <p className="font-bold">Torre</p>
            <p>{result.torre}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <p className="font-bold">Piso</p>
            <p>{result.piso}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <p className="font-bold">Depto</p>
            <p>{result.depto}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div key={index} className="grid grid-cols-3 items-center min-h-[60px]">
          <div className="grid grid-cols-2 gap-2 text-center items-center">
            <span className="font-bold">Nombre</span>
            <small>{result.nombre}</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center items-center">
            <p className="font-bold">Apellido</p>
            <small>{result.apellido}</small>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center items-center">
            <p className="font-bold">Celular</p>
            <small>{result.celular}</small>
          </div>
        </div>
      );
    }
  };

  return (
    <section id="ruleta" className="bg-bgpink px-4 text-center">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 py-4" style={{ background: 'linear-gradient(to right, #f22b55, #f5b46a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Administrar Sorteo
      </h1>

      <div className="flex flex-col items-center justify-center gap-2 py-4">
        <button onClick={handleSortear} disabled={loading} className={`w-full bg-gradient-to-tr from-primary to-violet-500 hover:bg-gradient-to-bl text-white font-bold py-2 px-4 rounded-lg ${loading && 'opacity-50'}`}>
          {loading ? `Sorteando ganador ${loadingIndex} de 4` : 'Realizar Sorteo'}
        </button>

        <p className="font-semibold text-lg">{loading && `Ganadores actuales: ${ganadores.length}`}</p>
        <p className="text-md">{loading?randomDisplay:''}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-4">Ganadores</h2>
          {ganadores.length > 0
            ? ganadores.map((result, index) => renderResult(result, index))
            : <p>No hay ganadores aún</p>}
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-4">Suplentes</h2>
          {suplentes.length > 0
            ? suplentes.map((result, index) => renderResult(result, index))
            : <p>No hay suplentes aún</p>}
        </div>
      </div>
    </section>
  );
};

export default RuletaAdmin;
