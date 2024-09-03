'use client'
// pages/unsubscribe.jsx
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import path from 'path';

const UnsubscribePage = () => {
  const params = usePathname();
  console.log(params);
  const [status, setStatus] = useState('');

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.delete(`/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`);
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
          className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
        >
          Confirmar Baja
        </button>
        {status && <p className='mt-4'>{status}</p>}
      </div>
    </div>
  );
};

export default UnsubscribePage;
