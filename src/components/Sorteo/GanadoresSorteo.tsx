"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Loading from '../Loading/Loading';

interface Ganador {
  nombre: string;
  torre: string;
  localidad: string;
  CHW: boolean;
  actual:boolean;
  especial:boolean;
  nombreSorteo:String;
}

export default function GanadoresSorteo() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [confettiActive, setConfettiActive] = useState(true);
  const [ganadores, setGanadores] = useState<Ganador[]>([
    // { nombre: 'Gonzalo', torre: '9', CHW: true, actual: true,localidad:'wilde', especial:true, nombreSorteo:''  },
    // { nombre: 'Felipe',  torre: '9', CHW: true, actual: false, localidad:'wilde',especial:false, nombreSorteo:'' },
    // { nombre: 'Romina',  torre: '9', CHW: true, actual: true, localidad:'wilde', especial:true, nombreSorteo:'Navidad'  },
]); // Estado tipado como array de Ganador

  // useEffect(() => {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   setWindowDimensions({ width, height });

  //   const timer = setTimeout(() => setConfettiActive(false), 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    axios
      .get("/api/sorteos/getGanadoresActual")
      .then((response) => {
        const ganadoresCargados: Ganador[] = response.data; // Tipar explícitamente la respuesta
        //console.log('ganadores:', ganadoresCargados)
        setGanadores(ganadoresCargados);
      })
      .catch((error) => {
        console.error("Error al obtener los ganadores", error);
      });
  }, []);

  return (
        <div className=" bg-secondary p-4">
        {confettiActive && <Confetti width={windowDimensions.width} height={windowDimensions.height} />}
        <h2 className="text-4xl font-bold text-primary text-center mb-8">¡Felicidades a los Ganadores!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
            {!ganadores ?<Loading/>
            :ganadores.map((ganador, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:rotate-1"
            >
              {ganador.especial?(
                  <p className="text-center text-gray-600 mt-2">🎉 ¡Ganaste! Sorteo {ganador.nombreSorteo} 🎉`</p>
                ):(
                  <p className="text-center text-gray-600 mt-2">{ganador.CHW?`🎉 ¡Ganaste 1 Expensas! 🎉`:`🎉 ¡Ganaste 1 Orden de Compra! 🎉`}</p>
                )}
                <div className="flex items-center justify-center my-4">
                <TrophyIcon className="text-primary w-12 h-12" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-semibold text-primary text-center mb-2">{ganador.nombre}</h2>
                <p className="text-lg text-gray-600 text-center">{ganador.CHW?`de la torre ${ganador.torre}`:ganador.localidad?`de ${ganador.localidad}`:''}</p>
            </motion.div>
            ))}
        </div>
        </div>
  );
}
