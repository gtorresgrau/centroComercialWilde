
'use client'
import React, { useState } from 'react';

const AgregarLocalPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    contacto: '',
    celular: '',
    linea: 0,
    ubicacion: '',
    categoria: '',
    rubro: '',
    rubroSecundario: 'No tengo',
    horarios: '',
    logoLocal: '',
    fotoLocal: '',
    instagram: 'No tengo',
    facebook: 'No tengo',
    texto: ''
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const submitAddInfo = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await fetch('api/postLocal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indica que los datos son JSON
      },
      body: JSON.stringify(formData), // Convierte formData a JSON
    });
  
    // Maneja la respuesta
    if (res.ok) {
      const result = await res.json();
      console.log('Local agregado:', result);
    } else {
      console.error('Error al agregar el local:', res.statusText);
    }
  };
  

  return (
    <div className="px-96 py-10  bg-[#FCF5EF]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Nuevo Local</h3>

      <form id="formAddInfo" onSubmit={submitAddInfo} className="bg-white shadow-sm rounded-lg p-6">
        <div className="grid gap-4 mb-4 sm:grid-cols-2">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input
              onChange={handleChangeInput}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese su email"
              required
            />
          </div>

          {/* Contacto */}
          <div>
            <label htmlFor="contacto" className="block mb-2 text-sm font-medium text-gray-900">Contacto</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="contacto"
              id="contacto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese su contacto"
              required
            />
          </div>

          {/* Celular */}
          <div>
            <label htmlFor="celular" className="block mb-2 text-sm font-medium text-gray-900">Celular</label>
            <input
              onChange={handleChangeInput}
              type="number"
              name="celular"
              id="celular"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese su celular"
              required
            />
          </div>

          {/* Línea */}
          <div>
            <label htmlFor="linea" className="block mb-2 text-sm font-medium text-gray-900">Línea</label>
            <input
              onChange={handleChangeInput}
              type="number"
              name="linea"
              id="linea"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese la línea"
              defaultValue={0}
            />
          </div>

          {/* Ubicación */}
          <div>
            <label htmlFor="ubicacion" className="block mb-2 text-sm font-medium text-gray-900">Ubicación</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="ubicacion"
              id="ubicacion"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese la ubicación"
              required
            />
          </div>

          {/* Categoría */}
          <div>
            <label htmlFor="categoria" className="block mb-2 text-sm font-medium text-gray-900">Categoría</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="categoria"
              id="categoria"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese la categoría"
              required
            />
          </div>

          {/* Rubro */}
          <div>
            <label htmlFor="rubro" className="block mb-2 text-sm font-medium text-gray-900">Rubro</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="rubro"
              id="rubro"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese el rubro"
              required
            />
          </div>

          {/* Rubro Secundario */}
          <div>
            <label htmlFor="rubroSecundario" className="block mb-2 text-sm font-medium text-gray-900">Rubro Secundario</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="rubroSecundario"
              id="rubroSecundario"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese el rubro secundario"
              defaultValue="No tengo"
            />
          </div>

          {/* Horarios */}
          <div>
            <label htmlFor="horarios" className="block mb-2 text-sm font-medium text-gray-900">Horarios</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="horarios"
              id="horarios"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese los horarios"
              required
            />
          </div>

          {/* Logo Local */}
          <div>
            <label htmlFor="logoLocal" className="block mb-2 text-sm font-medium text-gray-900">Logo Local</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="logoLocal"
              id="logoLocal"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese la URL del logo"
              required
            />
          </div>

          {/* Foto Local */}
          <div>
            <label htmlFor="fotoLocal" className="block mb-2 text-sm font-medium text-gray-900">Foto Local</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="fotoLocal"
              id="fotoLocal"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese la URL de la foto"
              required
            />
          </div>

          {/* Instagram */}
          <div>
            <label htmlFor="instagram" className="block mb-2 text-sm font-medium text-gray-900">Instagram</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="instagram"
              id="instagram"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese el Instagram"
              defaultValue="No tengo"
            />
          </div>

          {/* Facebook */}
          <div>
            <label htmlFor="facebook" className="block mb-2 text-sm font-medium text-gray-900">Facebook</label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="facebook"
              id="facebook"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ingrese el Facebook"
              defaultValue="No tengo"
            />
          </div>

          {/* Texto */}
          <div className="sm:col-span-2">
            <label htmlFor="texto" className="block mb-2 text-sm font-medium text-gray-900">Texto</label>
            <textarea
              onChange={handleChangeInput}
              id="texto"
              rows="5"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600"
              name="texto"
              placeholder="Ingrese información adicional..."
            />
          </div>

        </div>

        {/* Botón Guardar */}
        <div className="flex justify-center mt-6">
          <button
            aria-label="guardar cambios"
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-green hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-lg"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarLocalPage;
