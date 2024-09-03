'use client'; 
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from '../CheckboxDestacados/CheckboxDestacados';
import getNewsletter from '../../../../server/utils/fetchsNewsletter/getNewsletter'

const TablaNewsletter = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNewsletter();
        setNews(newsData.emails);
        console.log(newsData.emails)
      } catch (error) {
        console.error('Error fetching newsletter:', error);
        toast.error('Error al obtener los correos');
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-5">Newsletter Emails</h1>
      <div className='flex justify-end mb-2'>

       <button type="button" aria-label="agregar producto" className="items-center text-white border bg-primary hover:bg-[#612c67] active:bg-[#9c47a5] font-medium rounded-lg h-10 text-xs xs:text-sm px-5 py-2 text-center " >Iniciar campaña</button>
      </div>
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
              {news.map((product, index) => (
                <tr key={product._id} className={`text-sm md:text-base ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                  <td className="px-1 py-4 md:px-4 md:py-3 border-b">{product.email}</td>
                  <Checkbox product={product} />
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
