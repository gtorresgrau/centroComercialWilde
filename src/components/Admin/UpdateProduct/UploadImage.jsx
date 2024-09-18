/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import { Button, styled } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import heic2any from 'heic2any';
import Swal from 'sweetalert2';
import axios from 'axios';
import { imgNoDisponible } from '@/src/app/Constants/constantes';

export default function UploadImage({ localData, updateLocalData,id }) {
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

  const isLogoDisabled = archivos.some((archivo) => {
    if (archivo.name === 'logoLocal') {
      const previewFileName = archivo.preview.split('/').pop().split('.')[0];
      const isDefault = 'NoDisponible_jrzbvh' === previewFileName;  // Verifica si es imagen por defecto
      return !isDefault;  // Si es imagen por defecto, devuelve false; si no, devuelve true
    }
    return false;
  });
  
  const isFotoDisabled = archivos.some((archivo) => {
    if (archivo.name === 'fotoLocal') {
      const previewFileName = archivo.preview.split('/').pop().split('.')[0];
      const isDefault = 'NoDisponible_jrzbvh' === previewFileName;  // Verifica si es imagen por defecto
      return !isDefault;  // Si es imagen por defecto, devuelve false; si no, devuelve true
    }
    return false;
  });


  const submitUpdateImage = async (file,tipo,id) => {
     const formData = new FormData();
     formData.set('file', file);
     formData.set('tipo', tipo);
     formData.set('id', id);
    console.log(file,tipo, id)
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



  


  const handleArchivoSeleccionado = async (e, tipo,id) => {
    const archivo = e.target.files[0];
    console.log(archivo)
    if (!archivo) return;

    if (!archivo.type.startsWith('image/')) {
      toast.error('Solo se pueden cargar archivos de imagen.');
      return;
    }

    Swal.fire({
      title: 'Cargando...',
      text: 'Subiendo imagen, por favor espere.',
      allowOutsideClick: false,
      customClass: {
        confirmButton: 'bg-primary text-white hover:bg-blue-700',
    },
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
    console.log(archivoProcesado)
    

      const res =await submitUpdateImage(archivoProcesado,tipo,id)


    updateLocalData({
      ...localData,
      [tipo]: id ? res.preview : archivoProcesado,
    });

    Swal.close();
  };

  const handleEliminarArchivo = async (tipo) => {
    
    Swal.fire({
      title: 'Eliminando...',
      text: 'Eliminando imagen, por favor espere.',
      allowOutsideClick: false,
      customClass: {
        confirmButton: 'bg-primary text-white hover:bg-blue-700',
    },
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const folder = (tipo === 'fotoLocal' && 'LOCAL CCW') || (tipo === 'logoLocal' && 'LOGOS CCW')

      console.log(localData)
      
      // Obtener la URL de la imagen que deseas eliminar
      const imgAEliminar = `${folder}/${localData[tipo].split('/').pop().split('.')[0]}`;
      console.log(tipo)
      console.log(imgAEliminar)
      if (!imgAEliminar) {
        throw new Error('No se encontró la imagen para eliminar.');
      }
      
      if (imgAEliminar===`NoDisponible_jrzbvh`){
        return
      }
  
      // Realizar la solicitud DELETE al backend
      const res = await axios.delete('/api/images/deleteImage', {
        data: { file: imgAEliminar , id:id, tipo:tipo }, // Enviar la URL o el identificador de la imagen a eliminar
      });
  
      // Actualizar el estado solo si la eliminación fue exitosa
      if (res.status === 200) {
        const nuevosArchivos = archivos.map((arch) =>
          arch.name === tipo ? { ...arch, preview: '' } : arch
        );
        setArchivos(nuevosArchivos);
        updateLocalData({ ...localData, [tipo]: '' });
        Swal.fire('Eliminado!', 'La imagen ha sido eliminada.', 'success');
      } else {
        throw new Error('Error al eliminar la imagen');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la imagen. Por favor, inténtalo de nuevo.',
        customClass: {
          confirmButton: 'bg-primary text-white hover:bg-blue-700',
        },
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
            onChange={(e) => handleArchivoSeleccionado(e, 'logoLocal',id)}
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
            onChange={(e) => handleArchivoSeleccionado(e, 'fotoLocal',id)}
          />
        </Button>
      </div>

      <div className="relative pb-[50px] bg-white mt-[20px] rounded-md">
        <div className="grid grid-cols-2 gap-4">
          {console.log(archivos)}
          {archivos.map((archivo, index) => {
  // Verificación para comprobar si la imagen es "NoDisponible"
  const isNoDisponible = (
    (typeof archivo.preview === 'string' && archivo.preview === imgNoDisponible) 
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
              handleVerArchivo(archivo);
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
