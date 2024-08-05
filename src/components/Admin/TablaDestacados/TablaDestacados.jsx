'use client'
import React, { useState, Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from '../CheckboxDestacados/CheckboxDestacados';
import useProducts from '../../../Hooks/useProducts';

function TablaDestacados() {
  const [products, setProducts] = useState([]);

  const {allDestacados} = useProducts()
  console.log(allDestacados,'destacados')

  const handleToggleDestacados = async (updatedProduct) => {
    try {
      const response = await fetch(`/api/updateDestacados`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      //console.log(response.ok,'res')
       if (response.ok) {
         const updatedProducts = products.map((product) =>
           product._id === updatedProduct._id ? updatedProduct : product
         );
         setProducts(updatedProducts)
         // Mostrar toast de éxito
         toast.success('Producto actualizado correctamente');
       } else {
         toast.error('Error al actualizar el producto');
       }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error al actualizar el producto');
    }
  };

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-5">Productos Destacados</h1>
        <div className="overflow-x-auto">

        <table className="min-w-full bg-white border border-gray-300 shadow-xl">
          <thead>
            <tr className='bg-slate-300 text-sm md:text-base'>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Categoría</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Marca</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Nombre</th>
              <th className="px-1 py-1 md:px-4 md:py-3 border-b">Destacados</th>
            </tr>
          </thead>
          {!allDestacados.length
            ?(<tbody>
              <tr className="text-center">
                <td colSpan="5" className="py-10">
                  <span className="text-gray-500  font-semibold ">No hay productos</span>
                </td>
              </tr>
            </tbody>
            ):(<tbody>
                  {allDestacados.map((product, index) => (
                    <tr key={product._id} className={`text-sm md:text-base ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                      <td className="px-1 py-4 md:px-4 md:py-3 border-b">{product.categoria}</td>
                      <td className="px-1 py-4 md:px-4 md:py-3 border-b">{product.marca}</td>
                      <td className="px-1 py-4 md:px-4 md:py-3 border-b">{product.nombre}</td>
                      <td className="px-1 py-4 md:px-4 md:py-3 border-b">
                        <Checkbox
                          product={product}
                          onToggleDestacados={handleToggleDestacados}
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
            pauseOnHover /> {/* Container para los toasts */}
      </div>
    </Suspense>
  );
}

export default TablaDestacados;
