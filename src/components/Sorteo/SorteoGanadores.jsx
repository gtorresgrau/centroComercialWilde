'use client'
import axios from 'axios';
import React, {useEffect, useState} from 'react';

const SorteoGanadores = () => {
    const [ganadores, setGanadores] = useState([]);
    const ganadores2 = [
        { nombre: 'Gonzalo', apellido: 'Torres Grau', torre: 9, CHW: true, actual: true, _id:1 },
        { nombre: 'pepe', apellido: 'Torres Grau', torre: 9, CHW: true, actual: false, _id:2 },
        { nombre: 'feli', apellido: 'Torres Grau', torre: 9, CHW: true, actual: true, _id:3 },
        { nombre: 'dani', apellido: 'Torres Grau', torre: 9, CHW: true, actual: true, _id:4 },
    ];
    useEffect(() => {
            axios
                .get("/api/sorteos/getGanadores")
                .then((response) => {
                    const ganadoresCargados = response.data.data;
                    setGanadores(ganadoresCargados);
                })
                .catch((error) => {
                    console.error("Error al obtener los ganadores", error);
                });
    }, []); // Solo se ejecuta una vez al montar el componente

    console.log('ganadores en front:', ganadores)
    return (
        <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold text-center text-primary mb-8">¡Felicidades a los Ganadores!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                {ganadores2.map((ganador, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
                        <div className="flex justify-center mb-4">
                            <div className={`w-16 h-16 rounded-full ${index === 0 ? 'bg-yellow-300' : index === 1 ? 'bg-sky-400' : index === 2 ? 'bg-green-400' : 'bg-orange-400'} flex items-center justify-center`} >
                                <span className="text-xl font-bold text-primary">{index + 1}</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-center text-primary">{ganador.nombre}</h3>
                        <p className="text-center text-gray-600 mt-2">🎉 ¡Has ganado el sorteo! 🎉</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SorteoGanadores;
