'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UnsubscribePage = () => {
  const params = useParams().unsubscribe;
  const [status, setStatus] = useState('');
  const email = params
 

  const handleUnsubscribe = async () => {
    if (!email) {
      setStatus('Email no proporcionado.');
      return;
    }

    try {
      const response = await axios.delete(`/api/newsletter/deleteNewsletter?email=${email}`);
      setStatus('Correo electrónico eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el correo electrónico:', error);
      setStatus('Error al eliminar el correo electrónico');
    }
  };

  return (
    <div className='bg-slate-50 h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold mb-4'>Confirmación de Desuscripción</h1>
        <p>¿Estás seguro de que deseas darte de baja de nuestra lista de distribución?</p>
        <button
          onClick={handleUnsubscribe}
          className='mt-4 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'
          disabled={!email} // Desactiva el botón si no hay email
        >
          Confirmar Bajaa
        </button>
        {status && <p className='mt-4'>{status}</p>}
      </div>
    </div>
  );
};

export default UnsubscribePage;
