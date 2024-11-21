import React, { Suspense, useEffect, useState } from "react";
import Loading from '../../Loading/Loading';
import GanadorForm from "../../Forms/GanadorForm";
import MostrarGanadores from './MostrarGanadores';
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import { toast, ToastContainer } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

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
            const inicialSelected = ganadores2.filter((ganador) => ganador.actual);
            setSelectedNombres(inicialSelected);
        } else {
            axios
                .get("/api/sorteos/getGanadores")
                .then((response) => {
                    const ganadoresCargados = response.data.data;
                    setGanadores(ganadoresCargados);
    
                    // Filtrar y establecer los nombres seleccionados después de cargar
                    const inicialSelected = ganadoresCargados.filter((ganador) => ganador.actual);
                    setSelectedNombres(inicialSelected);
                })
                .catch((error) => {
                    console.error("Error al obtener los ganadores", error);
                });
        }
    }, []); // Solo se ejecuta una vez al montar el componente
    

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
                    ? { ...item, actual: !item.actual } // Alterna el valor de actual
                    : item
            )
        );
    
        setSelectedNombres((prevSelected) => {
            const isAlreadySelected = prevSelected.some((item) => item._id === ganador._id);
            console.log('isAlreadySelected:',isAlreadySelected)
            return isAlreadySelected
                ? prevSelected.filter((item) => item._id !== ganador._id) // Si estaba seleccionado, lo quita
                : [...prevSelected, { ...ganador, actual: !ganador.actual }]; // Si no, lo añade
        });
    };

    const handleGuardar = async () => {
        // Crear un nuevo array de ganadores actualizado según `selectedNombres`
        const ganadoresActualizados = ganadores.map((ganador) => ({
            ...ganador,
            actual: selectedNombres.some((item) => item._id === ganador._id),
        }));

        console.log("2-Ganadores antes de actualizar:", ganadores);
        console.log("2-Selected Nombres antes de actualizar:", selectedNombres);
        
        if (ganadores.length === selectedNombres.length) {
            console.log("No hay cambios para guardar.");
            return;
        }
    
        try {
            const response = await axios.put('/api/sorteos/checkGanadores', ganadoresActualizados);
            console.log("Ganadores actualizados en el servidor:", response.data);
    
            // Si la actualización en el servidor es exitosa, sincronizar el estado
            setGanadores(ganadoresActualizados);
            alert("Los cambios se han guardado correctamente.");
        } catch (error) {
            console.error("Error al actualizar los ganadores:", error);
            alert("Hubo un error al guardar los cambios. Por favor, inténtalo nuevamente.");
        }
    };
    
    const handleDeleteGanador = async (id) => {
        try {
            Swal.fire({
                icon: 'info',
                title: '¿Está seguro que quiere eliminar el usuario?',
                showCancelButton: true,
                showConfirmButton: true,
                customClass: {
                    confirmButton: 'bg-primary text-white hover:bg-green',
                    cancelButton: 'bg-red text-white hover:bg-green',
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete(`/api/sorteos/checkGanadores?id=${id}`);        
                    if (response.status === 200 || response.status === 204) {
                        toast.success('Inscripción eliminada con éxito');
                    }
                }
            });
        } catch (error) {
            console.error('Error al eliminar la inscripción:', error.response ? error.response.data : error.message);
            toast.error('Error al eliminar la inscripción');
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
                            <th className="px-2 py-2 border">DNI</th>
                            <th className="px-2 py-2 border">CHW</th>
                            <th className="px-2 py-2 border">Torre</th>
                            <th className="px-4 py-2 border">Localidad</th>
                            <th className="px-2 py-2 border">Ganadores</th>
                            <th className="px-2 py-2 border">Acc</th>
                        </tr>
                    </thead>
                    {paginatedGanadores.length ? (
                    <tbody>
                        {paginatedGanadores.map((ganador, index) => (
                            <tr key={index} className="bg-white hover:bg-gray-100">
                                <td className="px-4 py-2 border">{ganador.nombre}</td>
                                <td className="px-4 py-2 border">{ganador.apellido}</td>
                                <td className="px-4 py-2 border">{ganador.dni}</td>
                                <td className="px-2 py-2 border">{ganador.CHW ? "Sí" : "No"}</td>
                                <td className="px-2 py-2 border">{ganador.torre}</td>
                                <td className="px-4 py-2 border">{ganador.localidad}</td>
                                <td className="px-2 py-2 border items-center text-center">
                                    <input
                                        type="checkbox"
                                        checked={ganador.actual}
                                        onChange={() => handleCheckboxChange(ganador)}
                                        aria-label={`Select ganador ${ganador.nombre} ${ganador.apellido}`}
                                    />
                                </td>
                                <td className="px-2 py-2 border items-center text-center">
                                    <MdDelete className='text-red w-full cursor-pointer' onClick={() => handleDeleteGanador(ganador._id)} />
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
