'use client'
import React, { Suspense, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import processImages from '../../../Utils/proccesImage';
import Loading from '../../Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';

const UpdateBgBanner = () => {
    const [fileState, setFileState] = useState({
        selectedFile: null,
        preview: null,
        uploading: false,
        hide: false,
    });

    // Extracted image processing logic
    const processImage = useCallback(async (file) => {
        try {
            const processedFile = await processImages([file]);
            setFileState((prevState) => ({
                ...prevState,
                selectedFile: processedFile[0],
                preview: URL.createObjectURL(processedFile[0]),
            }));
        } catch (error) {
            console.error('Error processing the image:', error);
            toast.error('Error al procesar la imagen. Por favor, inténtalo de nuevo.');
        }
    }, []);

    // Fetch background image URL
    useEffect(() => {
        const fetchBackground = async () => {
            try {
                const response = await fetch('/api/upload/getImageBanner');
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                setFileState((prevState) => ({
                    ...prevState,
                    preview: data.backgroundUrl || null,
                }));
            } catch (error) {
                console.error('Error al obtener la URL del fondo:', error);
            }
        };
        fetchBackground();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) processImage(file);
    };

    const handleUpload = async () => {
        const { selectedFile } = fileState;
        if (!selectedFile) {
            toast.error('No hay ningún archivo para subir.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        setFileState((prevState) => ({ ...prevState, uploading: true }));

        try {
            const response = await axios.post('/api/upload/imageUpload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Archivo subido exitosamente.');
            setFileState((prevState) => ({
                ...prevState,
                hide: true,
            }));
            console.log('File uploaded:', response.data.url);
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Error al subir el archivo. Intenta nuevamente.');
        } finally {
            setFileState((prevState) => ({ ...prevState, uploading: false }));
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('/api/upload/deleteUploadedImage', {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('La imagen se ha eliminado correctamente.');
                setFileState({
                    selectedFile: null,
                    preview: null,
                    uploading: false,
                    hide: false,
                });
            } else {
                const data = await response.json();
                toast.error(data.error || 'Error al eliminar la imagen.');
            }
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
            toast.error('Hubo un error al eliminar la imagen.');
        }
    };

    const { preview, uploading, selectedFile, hide } = fileState;

    return (
        <Suspense fallback={<Loading />}>
            <section className="flex flex-col items-center justify-center bg-primary p-4">
                <h2 className="text-2xl font-bold mb-5 text-secondary uppercase">Subir fondo de banner</h2>
                <div className="flex flex-col items-center justify-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="text-secondary mb-6"
                    />
                    {preview && (
                        <div className="relative mb-6">
                            <img
                                src={preview}
                                alt="Vista previa"
                                style={{ maxWidth: '300px' }}
                                className="mb-6"
                            />
                            <button
                                onClick={handleDelete}
                                className="absolute top-2 right-2 rounded-full bg-red px-2 text-white ring-1 ring-slate-700 hover:scale-105"
                            >
                                X
                            </button>
                        </div>
                    )}
                    {!hide && (
                        <button
                            onClick={handleUpload}
                            disabled={uploading || !selectedFile}
                            className={`text-secondary w-1/3 items-center uppercase border`}
                        >
                            {uploading ? 'Cargando...' : 'Subir'}
                        </button>
                    )}
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Suspense>
    );
};

export default UpdateBgBanner;
