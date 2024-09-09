'use client';
import React, { useState, useEffect } from 'react';
import { Button, styled } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import heic2any from 'heic2any';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function UploadImage({ localData, updateLocalData }) {
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

  const isLogoDisabled = archivos.find((archivo) => archivo.name === 'logoLocal' && archivo.preview);
  const isFotoDisabled = archivos.find((archivo) => archivo.name === 'fotoLocal' && archivo.preview);



  const submitUpdateImage = async (file,tipo) => {
     const formData = new FormData();
     formData.set('file', file);
     formData.set('tipo', tipo);

    try {
        const res = await axios.post('/api/images/postImage', formData);

        const data = res.data;
        console.log(data, 'data');
        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
        return { error: 'Failed to upload image' };
    }
};



  


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
    if (['image/heic', 'image/heif'].includes(archivo.type) || archivo.name.endsWith('.heic') || archivo.name.endsWith('.heif')) {
      try {
        const convertedBlob = await heic2any({ blob: archivo, toType: 'image/jpeg' });
        archivoProcesado = new File([convertedBlob], archivo.name.replace(/\.[^/.]+$/, '.jpg'), { type: 'image/jpeg' });
      } catch (error) {
        console.error('Error al convertir HEIC a JPEG:', error);
        toast.error('Error al convertir archivo HEIC.');
        return;
      }
    }

    const newArchivo = {
      name: tipo,
      preview: URL.createObjectURL(archivoProcesado),
      isURL: false,
    };
    const res =await submitUpdateImage(archivo,tipo)

    setArchivos((prevArchivos) => {
      const updatedArchivos = prevArchivos.map((arch) =>
        arch.name === tipo ? newArchivo : arch
      );
      return updatedArchivos;
    });

    updateLocalData({
      ...localData,
      [tipo]: newArchivo.preview,
    });

    Swal.close();
  };

  const handleEliminarArchivo = async (tipo) => {
    Swal.fire({
      title: 'Eliminando...',
      text: 'Eliminando imagen, por favor espere.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const nuevosArchivos = archivos.map((arch) =>
        arch.name === tipo ? { ...arch, preview: '' } : arch
      );
      setArchivos(nuevosArchivos);
      updateLocalData({ ...localData, [tipo]: '' });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la imagen. Por favor, inténtalo de nuevo.',
      });
    } finally {
      Swal.close();
    }
  };

  const handleVerArchivo = (archivo) => {
    if (archivo.preview) {
      window.open(archivo.preview);
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
          {console.log(archivos)}
          {archivos.map((archivo, index) => (
            archivo.preview && (
              <div key={index} className="relative shadow-md rounded-lg">
                <h4>{archivo.name === 'logoLocal' ? 'Logo del local' : 'Foto del local'}</h4>
                <img
                  src={archivo.preview}
                  alt={archivo.name}
                  className="w-full object-cover cursor-pointer h-36 max-w-full rounded-lg"
                  onClick={() => handleVerArchivo(archivo)}
                  loading="lazy"
                />

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
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
