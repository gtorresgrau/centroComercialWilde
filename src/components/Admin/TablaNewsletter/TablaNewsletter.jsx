'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from '../Checkbox/Checkbox';
import getNewsletter from '../../../../server/utils/fetchsNewsletter/getNewsletter';
import axios from 'axios';
import Loading from '../../Loading/Loading';
import Pagination from '@mui/material/Pagination';
import * as XLSX from 'xlsx';

const TablaNewsletter = () => {
  const [news, setNews] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Para el buscador
  const [page, setPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Número de elementos por página

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const newsData = await getNewsletter(controller.signal);
        setNews(newsData.emails);
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Error al obtener los correos');
        }
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (selectedEmails.length === news.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedEmails, news]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email)
        ? prev.filter((item) => item !== email)
        : [...prev, email]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map((item) => item.email));
    }
    setSelectAll(!selectAll);
  };

  const handleSendEmails = async () => {
    setLoading(true);
    if (!subject || !message || selectedEmails.length === 0) {
      toast.error('Por favor completa todos los campos y selecciona al menos un email.');
      setLoading(false);
      return;
    }



    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('emails', JSON.stringify(selectedEmails));
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('/api/newsletter/sendNewsletter', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {
        toast.success('Correos enviados exitosamente');
        closeModal();
        setSelectedEmails([]);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      toast.error('Error al enviar los correos');
    } finally {
      setLoading(false);
    }
  };

  // Filtro de correos basado en el término de búsqueda
  const filteredEmails = news.filter((email) =>
    email.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de paginación
  const totalPages = Math.ceil(filteredEmails.length / itemsPerPage);
  const paginatedEmails = filteredEmails.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDownloadExcel = () => {
    const date = new Date().toISOString().split('T')[0];
    const fileName = `newsletter_${date}.xlsx`;

    // Split emails into groups of 50
    const emailGroups = [];
    for (let i = 0; i < news.length; i += 50) {
      emailGroups.push(news.slice(i, i + 50));
    }

    // Create workbook and sheets
    const workbook = XLSX.utils.book_new();
    emailGroups.forEach((group, index) => {
      const sheetData = group.map((item, i) => ({ Nro: i + 1, Email: item.email }));
      const sheet = XLSX.utils.json_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(workbook, sheet, `Hoja ${index + 1}`);
    });

    // Write and download Excel file
    XLSX.writeFile(workbook, fileName);
  };
  
  return (
    <div className="text-center">
      <h1 className="text-2xl text-gray-100 font-bold mb-5">Newsletter Emails</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar correo..."
          className="mb-2 md:mb-0 p-2 border border-gray-300 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={openModal}
          type="button"
          className="items-center text-gray-100 border bg-primary hover:bg-[#612c67] active:bg-[#9c47a5] font-medium rounded-lg h-10 text-xs xs:text-sm px-5 py-2"
        >
          Iniciar campaña
        </button>
        <button
            onClick={handleDownloadExcel}
            type="button"
            className="items-center text-gray-100 border bg-green-500 hover:bg-green-600 active:bg-green-700 font-medium rounded-lg h-10 text-xs xs:text-sm px-5 py-2"
          >
            Descargar Excel
          </button>
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        className="mt-4 flex justify-center"
      />
      {/* Modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal Content */}
            <div className="relative bg-gray-100 rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Enviar Correos Masivos</h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                >
                  <span className="sr-only">Close modal</span>
                  ×
                </button>
              </div>

              {/* Formulario */}
              <div className="p-4 space-y-4">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Asunto"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mensaje"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="block w-full"
                />
              </div>

              <div className="flex justify-end p-4 border-t">
                {loading ? <Loading /> : (
                  <button
                    onClick={handleSendEmails}
                    type="button"
                    className="text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded"
                  >
                    Enviar
                  </button>
                )}
                <button
                  onClick={closeModal}
                  type="button"
                  className="ml-2 text-gray-700 border px-4 py-2 rounded"
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
            <tr className="bg-slate-300">
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 flex justify-end items-center">
                <span>Seleccionar todos</span>
                <Checkbox
                  email="select-all"
                  handleCheckboxChange={handleSelectAll}
                  isChecked={selectAll}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmails.length ? (
              paginatedEmails.map((email) => (
                <tr key={email._id} className="border-b">
                  <td className="px-4 py-2">{email.email}</td>
                  <td className="px-4 py-2 flex justify-end">
                    <Checkbox
                      email={email.email}
                      handleCheckboxChange={handleCheckboxChange}
                      isChecked={selectedEmails.includes(email.email)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No hay resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        className="mt-4 flex justify-center"
      />

      <ToastContainer />
    </div>
  );
};

export default TablaNewsletter;
