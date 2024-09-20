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

const TablaSorteosNoCHW = () => {
  const [news, setNews] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const {userSorteo, userSorteoCHW, userSorteoNoCHW} = useProducts()
  //console.log('Sorteos:',userSorteo)
  //console.log('userSorteoCHW:',userSorteoCHW)
  //console.log('userSorteoNoCHW:',userSorteoNoCHW)

  useEffect(() => {
    // Actualiza el estado `selectAll` basado en los correos electrónicos seleccionados
    if (selectedEmails.length === userSorteoNoCHW.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedEmails, userSorteoNoCHW]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      setSelectedEmails(userSorteoNoCHW.map(item => item.email));
    }
    setSelectAll(!selectAll);
  };

  const handleSendEmails = async () => {
    if (!subject || !message || selectedEmails.length === 0) {
      toast.error('Por favor completa todos los campos y selecciona al menos un email.');
      return;
    }

    try {
      console.log(subject,message,selectedEmails)
       const response = await axios.post('/api/newsletter/sendNewsletter', {
         subject,
         message,
         emails: selectedEmails
       });
      if (response.status === 200) {
         toast.success('Correos enviados exitosamente');
         closeModal();
       } else {
         throw new Error('Error al enviar los correos');
       }
    } catch (error) {
      console.error('Error sending emails:', error);
      toast.error('Error al enviar los correos');
    }
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
      <h1 className="text-2xl font-bold mb-5 text-secondary ">Sorteos NO - CHW </h1>
      <div className='flex justify-end mb-2'>
        <button onClick={openModal} type="button" aria-label="agregar producto" className="items-center text-white border bg-primary hover:bg-[#612c67] active:bg-[#9c47a5] font-medium rounded-lg h-10 text-xs xs:text-sm px-5 py-2 text-center ">
            Iniciar campaña
        </button>
      </div>
      <RuletaAdmin userSorteoCHW={userSorteoCHW} userSorteoNoCHW={userSorteoNoCHW} userSorteos/>
      
      {/* Modal */}
      {isModalOpen && (
        <div id="default-modal"tabIndex="-1" aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 g-opacity-50" >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h2 className="text-xl font-semibold text-gray-900">Enviar Correos Masivos</h2>
                <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              
              <div className="p-4 md:p-5 space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">Asunto</label>
                  <input type="text"value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Ingresa el asunto"/>
                </div>
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Mensaje
                  </label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Escribe tu mensaje" rows="4"/>
                </div>
              </div>
              
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button onClick={handleSendEmails} type="button" className="items-center text-white border bg-primary hover:bg-[#612c67] active:bg-[#9c47a5] font-medium rounded-lg h-10 text-xs xs:text-sm px-5 py-2 text-center ">
                  Enviar correos
                </button>
                <button onClick={closeModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-bgpurple  hover:bg-gray-100 hover:text-bgpurple">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-xl">
          <thead>
            <tr className='bg-slate-300 text-sm md:text-base'>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Nombre</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">DNI</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Email</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Celular</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Calle</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Altura</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Localidad</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Acc</th>
              <th className="flex gap-2 justify-end px-1 py-1 md:px-4 md:py-3 border-b items-center">
                <p className='font-bold'>All</p>
                <Checkbox email="select-all" handleCheckboxChange={handleSelectAll} isChecked={selectAll} />
              </th>
            </tr>
          </thead>
          {!userSorteoNoCHW.length ? (
            <tbody>
              <tr className="text-center">
                <td colSpan="2" className="py-10">
                  <span className="text-gray-500 font-semibold">No hay productos</span>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {userSorteoNoCHW.map((user, index) => (
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

export default TablaSorteosNoCHW;
