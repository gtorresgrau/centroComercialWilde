/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { Button, styled } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import heic2any from 'heic2any';
import Swal from 'sweetalert2';
import { imgNoDisponible } from '../../../app/Constants/constantes';

export default function AgregarImagen ({ localData, updateLocalData }) {
  console.log(localData)
  const [archivos, setArchivos] = useState([]);


  useEffect(() => {
    // Inicializar el estado con los datos proporcionados
    setArchivos([
      { name: 'logoLocal', preview: localData.logoLocal, isURL: true },
      { name: 'fotoLocal', preview: localData.fotoLocal, isURL: true }
    ]);
  }, [localData]);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  console.log(archivos)
  const isLogoDisabled = archivos.some((archivo) => {
    if (archivo.name === 'logoLocal') {
      let previewURL = '';
  
      // Verifica si preview es un string o un objeto
      if (typeof archivo.preview === 'string') {
        previewURL = archivo.preview;
      } else if (typeof archivo.preview === 'object' && archivo.preview.preview) {
        previewURL = archivo.preview.preview;
      }
  
      const previewFileName = previewURL.split('/').pop().split('.')[0];
      const isDefault = 'NoDisponible_jrzbvh' === previewFileName;  // Verifica si es imagen por defecto
      return !isDefault;  // Si es imagen por defecto, devuelve false; si no, devuelve true
    }
    return false;
  });
  
  const isFotoDisabled = archivos.some((archivo) => {
    if (archivo.name === 'fotoLocal') {
      let previewURL = '';
  
      // Verifica si preview es un string o un objeto
      if (typeof archivo.preview === 'string') {
        previewURL = archivo.preview;
      } else if (typeof archivo.preview === 'object' && archivo.preview.preview) {
        previewURL = archivo.preview.preview;
      }
  
      const previewFileName = previewURL.split('/').pop().split('.')[0];
      const isDefault = 'NoDisponible_jrzbvh' === previewFileName;  // Verifica si es imagen por defecto
      return !isDefault;  // Si es imagen por defecto, devuelve false; si no, devuelve true
    }
    return false;
  });  


const handleArchivoSeleccionado = async (e, tipo) => {
  const archivo = e.target.files[0];
  if (!archivo) return;

  if (!archivo.type.startsWith('image/')) {
    toast.error('Solo se pueden cargar archivos de imagen.');
    return;
  }

  Swal.fire({
    title: 'Cargando...',
    text: 'Subiendo imagen, por favor espere.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  let archivoProcesado = archivo;
  // Verifica si el archivo es HEIC o HEIF y conviértelo a JPEG si es necesario
  if (['image/heic', 'image/heif'].includes(archivo.type) || archivo.name.endsWith('.heic') || archivo.name.endsWith('.heif')) {
    try {
      const convertedBlob = await heic2any({ blob: archivo, toType: 'image/jpeg' });
      archivoProcesado = new File([convertedBlob], archivo.name.replace(/\.[^/.]+$/, '.jpg'), { type: 'image/jpeg' });
    } catch (error) {
      console.error('Error al convertir HEIC a JPEG:', error);
      toast.error('Error al convertir archivo HEIC.');
      Swal.close();
      return;
    }
  }

  // Crea una URL de objeto para la vista previa
  const previewURL = URL.createObjectURL(archivoProcesado);

  // Actualiza el estado con la URL de vista previa y el archivo original para el post futuro
  updateLocalData({
    ...localData,
    [tipo]: { file: archivoProcesado, preview: previewURL },
  });

  Swal.close();
};

  const handleEliminarArchivo = async (tipo) => {
        updateLocalData({ ...localData, [tipo]: imgNoDisponible });
  };
  

  const handleVerArchivo = (archivo) => {
    if (archivo) {
      window.open(archivo);
    }
  };
  

  return (
    <div>
      <ToastContainer
        className="toast-container"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex mt-[10px] gap-4">
        <Button
          component="label"
          variant="outlined"
          tabIndex={-1}
          disabled={isLogoDisabled}
          >
          Subir Logo del Local
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => handleArchivoSeleccionado(e, 'logoLocal')}
            />
        </Button>
        <Button
          component="label"
          variant="outlined"
          tabIndex={-1}
          disabled={isFotoDisabled}
        >
          Subir Foto del Local
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => handleArchivoSeleccionado(e, 'fotoLocal')}
          />
        </Button>
      </div>

      <div className="relative pb-[50px] bg-white mt-[20px] rounded-md">
  <div className="grid grid-cols-2 gap-4">
  {archivos.map((archivo, index) => {
    // Verificación para comprobar si la imagen es "NoDisponible"
    const isNoDisponible = (
      (typeof archivo.preview === 'string' && archivo.preview === imgNoDisponible) ||
      (typeof archivo.preview.preview === 'string' && archivo.preview.preview=== imgNoDisponible)
    );

    return (
      archivo.preview && (
        <div key={index} className="relative shadow-md rounded-lg">
          <h4>{archivo.name === 'logoLocal' ? 'Logo del local' : 'Foto del local'}</h4>

          {/* Verifica si archivo.preview es un string o un objeto */}
          <img
            src={typeof archivo.preview === 'string' ? archivo.preview : archivo.preview.preview}
            alt={archivo.name}
            className={`w-full object-cover h-36 max-w-full rounded-lg ${!isNoDisponible ? 'cursor-pointer' : ''}`}
            onClick={() => {
              if (!isNoDisponible) {
                handleVerArchivo(typeof archivo.preview === 'string' ? archivo.preview : archivo.preview.preview);
              }
            }}
            loading="lazy"
          />

          {/* Verificación de archivo.preview y si no es imagen por defecto */}
          {!isNoDisponible && (
            <button
              type="button"
              aria-label="eliminar archivo"
              onClick={() => handleEliminarArchivo(archivo.name)}
              className="absolute top-1 right-1 cursor-pointer bg-gray-300 text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm w-6 h-6 inline-flex items-center justify-center"
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
            </button>
          )}
        </div>
      )
    );
})}

  </div>
</div>


    </div>
  );
}
