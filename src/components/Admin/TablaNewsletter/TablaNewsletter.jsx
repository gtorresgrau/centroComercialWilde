'use client'; 
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from '../CheckboxDestacados/CheckboxDestacados';
import getNewsletter from '../../../../server/utils/fetchsNewsletter/getNewsletter';
import axios from 'axios';

const TablaNewsletter = () => {
  const [news, setNews] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNewsletter();
        setNews(newsData.emails);
        console.log(newsData.emails);
      } catch (error) {
        console.error('Error fetching newsletter:', error);
        toast.error('Error al obtener los correos');
      }
    };

    fetchData();
  }, []);

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

  const handleSendEmails = async () => {
    if (!subject || !message || selectedEmails.length === 0) {
      toast.error('Por favor completa todos los campos y selecciona al menos un email.');
      return;
    }

    try {
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

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-5">Newsletter Emails</h1>
      <div className='flex justify-end mb-2'>
        <button
          onClick={openModal}
          type="button"
          aria-label="agregar producto"
          className="items-center text-white border bg-primary hover:bg-[#612c67] active:bg-[#9c47a5] font-medium rounded-lg h-10 text-xs xs:text-sm px-5 py-2 text-center "
        >
          Iniciar campaña
        </button>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Enviar Correos Masivos
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              
              <div className="p-4 md:p-5 space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Asunto
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Ingresa el asunto"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700">
                    Mensaje
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Escribe tu mensaje"
                    rows="4"
                  />
                </div>
              </div>
              
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  onClick={handleSendEmails}
                  type="button"
                  className="items-center text-white border bg-primary hover:bg-[#612c67] active:bg-[#9c47a5] font-medium rounded-lg h-10 text-xs xs:text-sm px-5 py-2 text-center "
                  >
                  Enviar correos
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-bgpurple  hover:bg-gray-100 hover:text-bgpurple"
                >
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
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Email</th>
            </tr>
          </thead>
          {!news.length ? (
            <tbody>
              <tr className="text-center">
                <td colSpan="5" className="py-10">
                  <span className="text-gray-500 font-semibold">No hay productos</span>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {news.map((email, index) => (
                <tr key={email._id} className={`text-sm md:text-base ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                  <td className="px-1 py-4 md:px-4 md:py-3 border-b">
                    {email.email}
                  </td>
                  <td>
                    <Checkbox 
                      email={email.email} 
                      handleCheckboxChange={handleCheckboxChange} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <ToastContainer
        className="toast-container"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default TablaNewsletter;
