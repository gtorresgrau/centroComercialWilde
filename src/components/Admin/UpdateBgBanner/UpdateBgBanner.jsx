'use client'
import React, { Suspense, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import processImages from '../../../Utils/proccesImage';
import processImageVert from '../../../Utils/proccesImageVert';
import Loading from '../../Loading/Loading';
import { toast, ToastContainer } from 'react-toastify';

const UpdateBgBanner = () => {
    const [fileState, setFileState] = useState({
        selectedFile: null,
        preview: null,
        uploading: false,
        hide: false,
    });

    const [fileStateVertical, setFileStateVertical] = useState({
        selectedFileVertical: null,
        previewVertical: null,
        uploadingVertical: false,
        hideVertical: false,
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

    const processImageVertical = useCallback(async (file) => {
        try {
            const processedFileVertical = await processImageVert([file]);
            setFileStateVertical((prevState) => ({
                ...prevState,
                selectedFileVertical: processedFileVertical[0],
                previewVertical: URL.createObjectURL(processedFileVertical[0]),
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
        // Fetch background image URL
        useEffect(() => {
            const fetchBackground = async () => {
                try {
                    const responseVertical = await fetch('/api/upload/getImageBannerVertical');
                    if (!responseVertical.ok) throw new Error(`HTTP error! Status: ${responseVertical.status}`);
                    const data = await responseVertical.json();
                    setFileStateVertical((prevState) => ({
                        ...prevState,
                        previewVertical: data.backgroundUrlVertical || null,
                    }));
                } catch (error) {
                    console.error('Error al obtener la URL del fondo:', error);
                }
            };
            fetchBackground();
        }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                toast.error('Solo se permiten imágenes en formato JPEG, JPG, PNG o WEBP.');
                return;
            }
            processImage(file);
        }
    };

    const handleFileChangeVertical = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                toast.error('Solo se permiten imágenes en formato JPEG, JPG, PNG o WEBP.');
                return;
            }
            processImageVertical(file);
        }
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
        //console.log("Archivo seleccionado para subir:", selectedFile);

        try {
            const response = await axios.post('/api/upload/imageUpload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            toast.success('Archivo subido exitosamente.');
            setFileState((prevState) => ({
                ...prevState,
                hide: true,
                preview: response.data.url, // Actualiza la URL al link de Cloudinary
            }));
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            toast.error('Error al subir el archivo. Intenta nuevamente.');
        } finally {
            setFileState((prevState) => ({ ...prevState, uploading: false }));
        }
    };

    const handleUploadVertical = async () => {
        const { selectedFileVertical } = fileStateVertical;
        if (!selectedFileVertical) {
            toast.error('No hay ningún archivo para subir.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', selectedFileVertical);
    
        setFileStateVertical((prevState) => ({ ...prevState, uploadingVertical: true }));
        //console.log("Archivo seleccionado para subir:", selectedFileVertical);

        try {
            const response = await axios.post('/api/upload/imageUploadVertical', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            toast.success('Archivo subido exitosamente.');
            setFileStateVertical((prevState) => ({
                ...prevState,
                hideVertical: true,
                previewVerthideVertical: response.data.url, // Actualiza la URL al link de Cloudinary
            }));
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            toast.error('Error al subir el archivo. Intenta nuevamente.');
        } finally {
            setFileStateVertical((prevState) => ({ ...prevState, uploadingVertical: false }));
        }
    };
    
    

    const handleDelete = async () => {
        try {
            const response = await axios.delete('/api/upload/deleteUploadedImage', {
                data: { public_id: 'cloudinary_public_id' },
            });
    
            if (response.status === 200) {
                toast.success('La imagen se ha eliminado correctamente.');
                setFileState({
                    selectedFile: null,
                    preview: null,
                    uploading: false,
                    hide: false,
                });
            }
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
            toast.error('Hubo un error al eliminar la imagen.');
        }
    };
    
    const handleDeleteVertical = async () => {
        try {
            const response = await axios.delete('/api/upload/deleteUploadedImageVertical', {
                data: { public_id: 'cloudinary_public_id' },
            });
    
            if (response.status === 200) {
                toast.success('La imagen se ha eliminado correctamente.');
                setFileStateVertical({
                    selectedFile: null,
                    preview: null,
                    uploading: false,
                    hide: false,
                });
            }
        } catch (error) {
            console.error('Error al eliminar la imagen:', error);
            toast.error('Hubo un error al eliminar la imagen.');
        }
    };

    const { preview, uploading, selectedFile, hide } = fileState;
    const { previewVertical, uploadingVertical, selectedFileVertical, hideVertical } = fileStateVertical;


    return (
        <Suspense fallback={<Loading />}>
             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable      pauseOnHover />
            <section className="flex flex-col items-center justify-center bg-primary p-4">
                <h2 className="text-2xl font-bold mb-5 text-secondary uppercase">Subir fondo de banner</h2>
                <h3 className='text-white'>Subir Foto en Horizonatal</h3>
                <article className="flex flex-col items-center justify-center">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="text-secondary mb-6 hover:bg-blue-400" />
                    {preview && (
                        <div className="relative mb-6">
                            <img src={preview} alt="Vista previa" style={{ maxWidth: '300px' }} className="mb-6" />
                            <button onClick={handleDelete} className="absolute top-2 right-2 rounded-full bg-red px-2 text-white ring-1 ring-slate-700 hover:scale-105" >
                                X
                            </button>
                        </div>
                    )}
                    {!hide && (
                        <button onClick={handleUpload} disabled={uploading || !selectedFile} className={`text-secondary w-1/3 items-center uppercase border mb-8 hover:bg-blue-400`} >
                            {uploading ? <Loading /> : 'Subir'}
                        </button>
                    )}
                </article>
                <article className="flex flex-col items-center justify-center">
                    <h3 className='text-white'>Subir Foto en Vertical</h3>
                    <input type="file" accept="image/*" onChange={handleFileChangeVertical} className="text-secondary mb-6 hover:bg-blue-400" />
                        {previewVertical && (
                            <div className="relative mb-6">
                                <img src={previewVertical} alt="Vista previa Vertical" style={{ maxWidth: '300px' }} className="mb-6" />
                                <button onClick={handleDeleteVertical} className="absolute top-2 right-2 rounded-full bg-red px-2 text-white ring-1 ring-slate-700 hover:scale-105" >
                                    X
                                </button>
                            </div>
                        )}
                        {!hideVertical && (
                            <button onClick={handleUploadVertical} disabled={uploadingVertical || !selectedFileVertical} className={`text-secondary w-1/3 items-center uppercase border mb-8 hover:bg-blue-400`} >
                                {uploadingVertical ? <Loading /> : 'Subir'}
                            </button>
                        )}
                </article>
            </section>
        </Suspense>
    );
};

export default UpdateBgBanner;
