'use client'; 
import React, { useState, useEffect, Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from '../Checkbox/Checkbox';
import useProducts from '../../../Hooks/useProducts';
import axios from 'axios';
import Loading from '../../Loading/Loading';
import RuletaAdmin from '../RuletaAdmin';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const TablaSorteosEventos = ({userSorteos}) => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const {userSorteo} = useProducts(userSorteos)
  
  useEffect(() => {
    // Actualiza el estado `selectAll` basado en los correos electrónicos seleccionados
    if (selectedEmails.length === userSorteo.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedEmails]);

  const handleCheckboxChange = (email) => {
    setSelectedEmails(prev =>
      prev.includes(email)
        ? prev.filter(item => item !== email)
        : [...prev, email]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(userSorteo.map(item => item.email));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteUser = async (id) => {
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
      }).then(async(result) => {
        if (result.isConfirmed) {
        const response = await axios.delete(`/api/sorteos/${id}`);        
        if (response.status === 200 || response.status === 204) {
            toast.success('Inscripción eliminada con éxito');
        } }
      })
    } catch (error) {
        console.error('Error al eliminar la inscripción 2:', error.response ? error.response.data : error.message);
        toast.error('Error al eliminar la inscripción');
    }
};

  return (
    <Suspense fallback={<Loading />}>
      <section className="text-center">
      <h1 className="text-2xl font-bold mb-5 text-secondary ">Sorteos eventos </h1>
      <RuletaAdmin userSorteo={userSorteo}/>

      {/* tabla de usuarios */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-xl">
          <thead>
            <tr className='bg-slate-300 text-sm md:text-base'>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Nombre</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">DNI</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Email</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Celular</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Calle/Torre</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Altura/Piso</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Localidad/Depto</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Acc</th>
              <th className="flex gap-2 justify-end px-1 py-1 md:px-4 md:py-3 border-b items-center">
                <p className='font-bold'>All</p>
                <Checkbox email="select-all" handleCheckboxChange={handleSelectAll} isChecked={selectAll} />
              </th>
            </tr>
          </thead>
          {!userSorteo.length ? (
            <tbody>
              <tr className="text-center">
                <td colSpan="2" className="py-10">
                  <span className="text-gray-500 font-semibold">No hay usuarios para el sorteo</span>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {userSorteo.map((user, index) => (
                <tr key={user._id} className={`text-sm md:text-base ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                    <td className="px-1 py-4 md:px-4 md:py-3 border-b">{user.nombre} {user.apellido}</td>
                    <td className="px-1 py-4 md:px-4 md:py-3 border-b">{user.dni}</td>
                    <td className="px-1 py-4 md:px-4 md:py-3 border-b">{user.email}</td>
                    <td className="px-1 py-4 md:px-4 md:py-3 border-b">{user.celular}</td>
                    <td className="px-1 py-4 md:px-4 md:py-3 border-b">{user.torre}</td>
                    <td className="px-1 py-4 md:px-4 md:py-3 border-b">{user.piso}</td>
                    <td className="px-1 py-4 md:px-4 md:py-3 border-b">{user.depto}</td>
                    <td className="px-1 py-4 md:px-4 md:py-2 border-b text-end">
                      <MdDelete className='text-red w-full cursor-pointer' onClick={() => handleDeleteUser(user._id)}/>
                    </td>
                    <td className="px-1 py-4 md:px-4 md:py-3 border-b text-end items-end">
                      <Checkbox email={user.email} handleCheckboxChange={handleCheckboxChange} isChecked={selectedEmails.includes(user.email)}/>
                    </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      </section>
    </Suspense>
  );
};

export default TablaSorteosEventos;
