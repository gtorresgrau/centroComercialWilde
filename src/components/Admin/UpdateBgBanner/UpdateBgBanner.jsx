'use client'
import React, { Suspense, useState } from 'react';
import axios from 'axios';
import processImages from '../../../Utils/proccesImage';
import Loading from '../../Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';


const UpdateBgBanner = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (event) => {
        const archivo = event.target.files[0];
        if (!archivo) return; // Exit if no file selected
    
        try {
            const processedFile = await processImages([archivo]); // Wait for processing
            setSelectedFile(processedFile[0]); // Set the processed file
            setPreview(URL.createObjectURL(processedFile[0])); // Show preview
        } catch (error) {
            console.error('Error processing the image:', error);
            alert('Error al procesar la imagen. Por favor, inténtalo de nuevo.');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return alert('Selecciona una imagen primero.');

        setUploading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const { data } = await axios.post('/api/upload/imageUpload', formData); // Ajusta la URL según tu backend
            toast.success('Imagen cargada con éxito.');
            // Aquí podrías guardar la URL en tu base de datos.
        } catch (error) {
            console.error(error);
            toast.error('Error al cargar la imagen.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Suspense fallback={<Loading/>}>
            <section className="flex flex-col items-center justify-center bg-primary p-4">
                <h2 className="text-2xl font-bold mb-5 text-secondary uppercase">Subir fondo de banner</h2>
                <div className="flex flex-col items-center justify-center">
                    <input type="file" accept="image/*" onChange={handleFileChange} className='text-secondary mb-6' />
                    {preview && (
                        <div className='flex flex-col items-center justify-center'>
                            <img src={preview} alt="Vista previa" style={{ maxWidth: '300px' }} className='mb-6'/>
                        </div>
                    )}
                    <button onClick={handleUpload} disabled={uploading} className='text-secondary w-1/3 items-center uppercase border'>
                        {uploading ? 'Cargando...' : 'Subir'}
                    </button>
                </div>
            </section>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </Suspense>
    );
};

export default UpdateBgBanner;
