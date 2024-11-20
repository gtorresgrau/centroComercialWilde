import React from "react";

const MostrarGanadores = ({ selectedGanadores, handleGuardar }) => {
    return (
        <div className="flex items-center justify-center bg-primary p-4 ">
            <div className="w-full max-w-md p-6 bg-secondary rounded-lg shadow-lg min-h-[415px]">
                <h2 className="text-xl font-bold mb-4 text-primary uppercase">Ganadores Seleccionados</h2>
                {selectedGanadores.length > 0 ? (
                    <ul>
                        {selectedGanadores.map((ganador, index) => (
                            <li key={index} className="flex items-center justify-between p-2 my-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors" >
                            <div className="flex items-center space-x-4">
                                <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-semibold">{ganador.nombre[0]}</div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-800">Felicidades <span className="text-primary font-bold text-lg">{ganador.nombre}</span></p>
                                    <p className="text-sm text-gray-600">{ganador.CHW?`Torre ${ganador.torre}`:null}</p>
                                </div>
                            </div>
                        </li>

                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No hay ganadores seleccionados</p>
                )}
                <button className="mt-4 bg-primary text-white py-2 px-4 rounded hover:opacity-50" onClick={handleGuardar}>Guardar</button>
            </div>
        </div>
    );
};

export default MostrarGanadores;
