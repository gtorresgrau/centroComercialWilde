import React, { Suspense, useEffect, useState } from "react";
import Loading from '../../Loading/Loading';
import GanadorForm from "../../Forms/GanadorForm";
import MostrarGanadores from './MostrarGanadores';
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import { ToastContainer } from "react-toastify";

const GanadorPage = () => {
    const [ganadores, setGanadores] = useState([]);
    const [selectedNombres, setSelectedNombres] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;


    const ganadores2 = [
        { nombre: 'Gonzalo', apellido: 'Torres Grau', torre: 9, CHW: true, actual: true, _id:1 },
        { nombre: 'pepe', apellido: 'Torres Grau', torre: 9, CHW: true, actual: false, _id:2 },
        { nombre: 'feli', apellido: 'Torres Grau', torre: 9, CHW: true, actual: true, _id:3 },
        { nombre: 'dani', apellido: 'Torres Grau', torre: 9, CHW: true, actual: true, _id:4 },
    ];

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setGanadores(ganadores2);
        } else {
            axios
                .get("/api/sorteos/getGanadores")
                .then((response) => {
                    setGanadores(response.data.data);
                })
                .catch((error) => {
                    console.error("Error al obtener los ganadores", error);
                });
        }
        const inicialSelected = ganadores2.filter((ganador) => ganador.actual);
        setSelectedNombres(inicialSelected);
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
    };
    //console.log('ganadores:', ganadores);
    
    const filteredUsers = ganadores.filter((user) =>
        `${user.nombre} ${user.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.torre?.toString().includes(searchTerm)
    );
    //console.log('filtered:',filteredUsers)

    const handleCheckboxChange = (ganador) => {
        setGanadores((prevGanadores) =>
            prevGanadores.map((item) =>
                item._id === ganador._id
                    ? { ...item, actual: !item.actual } // Alterna el valor de `actual`
                    : item
            )
        );
    
        setSelectedNombres((prevSelected) => {
            const isAlreadySelected = prevSelected.some((item) => item._id === ganador._id);
            return isAlreadySelected
                ? prevSelected.filter((item) => item._id !== ganador._id) // Si estaba seleccionado, lo quita
                : [...prevSelected, { ...ganador, actual: !ganador.actual }]; // Si no, lo añade
        });
    };

    const handleGuardar = async () => {
        const ganadoresActualizados = ganadores.map((ganador) => ({
            ...ganador,
            actual: selectedNombres.some((item) => item._id === ganador._id),
        }));
    
        try {
            await axios.post('/api/sorteos/checkGanadores', ganadoresActualizados); // Supongamos que tu API permite actualizar múltiples ganadores
            console.log("Ganadores actualizados en el servidor:", ganadoresActualizados);
            setGanadores(ganadoresActualizados);
        } catch (error) {
            console.error("Error al actualizar los ganadores:", error);
        }
    };
    

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedGanadores = filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    //console.log('paginated:',paginatedGanadores)


  return (
        <Suspense fallback={<Loading />}>
            <section className="text-center">
                <h1 className="text-2xl font-bold mb-5 text-secondary">Ganadores de Sorteos</h1>
                    <div className="flex flex-col md:flex-row justify-center">
                        <MostrarGanadores selectedGanadores={selectedNombres} handleGuardar={handleGuardar}/>
                        <GanadorForm />
                    </div>
                <h2 className='text-secondary pt-2'>BUSCADOR</h2>
                <input type="text" placeholder="Buscar por nombre, DNI o email" className="my-4 p-2 border border-gray-300 rounded w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <div className="overflow-x-auto">
                <Pagination count={totalPages} page={page} onChange={handleChange} color="secondary" siblingCount={0} className="m-4 self-center"
                sx={{'& .MuiPaginationItem-root': {color: 'white'},'& .Mui-selected': { backgroundColor: 'secondary',color: 'black'}}}/>
                <table className="min-w-full bg-white border border-gray-300 shadow-xl overflow-hidden md:table-fixed">

                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Nombre</th>
                            <th className="px-4 py-2 border">Apellido</th>
                            <th className="px-4 py-2 border">Torre</th>
                            <th className="px-4 py-2 border">CHW</th>
                            <th className="px-1 py-1 md:px-4 md:py-3 border-b">Ganadores</th>
                        </tr>
                    </thead>
                    {paginatedGanadores.length ? (
                    <tbody>
                        {paginatedGanadores.map((ganador, index) => (
                            <tr key={index} className="bg-white hover:bg-gray-100">
                                <td className="px-4 py-2 border">{ganador.nombre}</td>
                                <td className="px-4 py-2 border">{ganador.apellido}</td>
                                <td className="px-4 py-2 border">{ganador.torre}</td>
                                <td className="px-4 py-2 border">{ganador.CHW ? "Sí" : "No"}</td>
                                <td className="px-1 py-4 md:px-4 md:py-3 border-b items-center text-center">
                                    <input
                                        type="checkbox"
                                        checked={ganador.actual}
                                        onChange={() => handleCheckboxChange(ganador)}
                                        aria-label={`Select ganador ${ganador.nombre} ${ganador.apellido}`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    ) : (
                        <tbody>
                            <tr className="text-center">
                                <td colSpan="9" className="py-10">
                                    <span className="text-gray-500 font-semibold">No hay usuarios que coincidan con la búsqueda</span>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
                </div>
            </section>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Suspense>
  );
};

export default GanadorPage;
