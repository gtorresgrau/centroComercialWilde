'use client';
import { useParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const UnsubscribePage = () => {
  const params = useParams().unsubscribe;
  const email = params
 

  const handleUnsubscribe = async () => {
    if (!email) {
      toast.error('Email no proporcionado.')
      return;
    }

    try {
      const response = await axios.delete(`/api/newsletter/deleteNewsletter?email=${email}`);
      toast.success('Correo electrónico eliminado con éxito')
    } catch (error) {
      console.error('Error al eliminar el correo electrónico:', error);
      toast.error('Error al eliminar el correo electrónico')
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <article className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Confirmación de Baja</h1>
        <p className="text-gray-600 mb-6">Lamentamos verte ir. Estás a punto de darte de baja de nuestra lista de suscriptores. Si decides continuar, ya no recibirás nuestras actualizaciones y noticias.</p>
        <p className="text-gray-600 mb-6">¿Estás seguro de que deseas proceder con la baja?</p>
        <p className="text-gray-600 mb-4"><strong>Recuerda:</strong> Si cambias de opinión, siempre puedes volver a suscribirte en cualquier momento.</p>
        <div className="flex space-x-4 justify-end">
          <Link href="/" className="items-center my-4 text-gray-800 border bg-gray hover:bg-gray-100 active:bg-gray-200 font-medium rounded-lg h-10 text-xs xs:text-sm px-5 py-2 text-center ">Cancelar</Link>
          <button onClick={handleUnsubscribe} className="items-center my-4 text-white border bg-primary hover:bg-[#612c67] active:bg-[#9c47a5] font-medium rounded-lg h-10 text-xs xs:text-sm px-5 py-2 text-center " disabled={!email}>Confirmar Baja</button>
        </div>
      </article>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    </section>
  );
};

export default UnsubscribePage;

