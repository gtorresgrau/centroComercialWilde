import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const GanadorForm = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const alert = (nombre) => {
    Swal.fire({
        title: `${nombre},se anoto correctamente.`,
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
            confirmButton: 'bg-primary text-white hover:bg-blue-700',
        }
    });
};
const alertError = (message) => {
    Swal.fire({
        text: `${message}`,
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
            confirmButton: 'bg-primary text-white hover:bg-blue-700',
        }
    });
};

const alertLoading = () => {
    Swal.fire({
        title: 'Aguarde un momento',
        didOpen: () => {
            Swal.showLoading();
        },
        showConfirmButton: false,
        customClass: {
            confirmButton: 'bg-primary text-white hover:bg-blue-700',
        }
    });
};
  const onSubmit = async (data) => {
    //console.log(data);
    const {nombre } = data;
    try {
        alertLoading();
        //('data:',data)
        const response = await axios.post('/api/sorteos/postGanadores', {
            ...data,
        });
        Swal.close();
        if (response.status === 200) {
            alert(nombre);
            reset();
        }
    } catch (error) {
        Swal.close();
       if (error.response && error.response.status === 400) {
            console.error('Error:', error.response.data.message);
            reset()
            alertError(error.response.data.message); 
        } else if (error.response && error.response.status === 409) {
            return
        } else {
            console.error('Error:', error.response ? error.response.data : error.message);
            reset()
            alertError('Ocurrió un error. Intente nuevamente.');
        }
    }
  };

  const especialValue = watch('especial');

  return (
    <div className="flex items-center justify-center bg-primary p-4 ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 bg-secondary rounded-lg shadow-lg min-h-[520px]" >
        <h2 className="text-2xl font-semibold text-primary uppercase text-center mb-6">Ingresar Ganadores</h2>
        <div className="justify-between">
        {/* Nombre */}
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="nombre" className="block text-primary mb-2 mx-4">Nombre</label>
          <input
             id="nombre"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primary max-w-[300px]"
            type="text"
            placeholder="Jhon"
          />
          {errors.nombre && (
            <p className="text-red text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

        {/* Apellido */}
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="apellido" className="block text-primary mb-2 mx-4">Apellido</label>
          <input
            id="apellido"
            {...register("apellido", { required: "El apellido es obligatorio" })}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primary max-w-[300px]"
            type="text"
            placeholder="Doe"
          />
          {errors.apellido && (
            <p className="text-red text-sm mt-1">{errors.apellido.message}</p>
          )}
        </div>

        {/* DNI */}
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="dni" className="block text-primary mb-2 mx-4">DNI</label>
            <input
              id="dni"
              {...register("dni")}
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primary max-w-[300px]"
              type="text"
              placeholder="1122334455"
              />
            {errors.torre && (
              <p className="text-red text-sm mt-1">{errors.dni.message}</p>
            )}
        </div>

        {/* Torre */}
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="torre" className="block text-primary mb-2 mx-4">Torre</label>
          <input
            id="torre"
            {...register("torre")}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primary max-w-[150px]"
            type="text"
            placeholder="9"
          />
          {errors.torre && (
            <p className="text-red text-sm mt-1">{errors.torre.message}</p>
          )}
          <label htmlFor="localidad" className="block text-primary mb-2 mx-4">Localidad</label>
          <input
            id="localidad"
            {...register("localidad")}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primary max-w-[150px]"
            type="text"
            placeholder="Wilde"
          />
          {errors.localidad && (
            <p className="text-red text-sm mt-1">{errors.localidad.message}</p>
          )}
        </div>
        {/* CHW */}
        <div className="flex justify-evenly">
            <div className="mb-6">
              <label htmlFor="CHW" className="block text-primary mb-2">¿CHW?</label>
              <input
                  id="CHW"
                  type="checkbox"
                  {...register("CHW")}
                  className="w-5 h-5 rounded border-gray-300 bg-primary text-primary focus:outline-none  max-w-[300px]"
              />
              {errors.CHW && (
                  <p className="text-red text-sm mt-1">{errors.CHW.message}</p>
              )}
              </div>
            <div className="mb-6">
              <label htmlFor="actual" className="block text-primary mb-2">¿Ganador Actual?</label>
              <input
                  id="actual"
                  type="checkbox"
                  {...register("actual")}
                  className="w-5 h-5 rounded border-gray-300 bg-primary text-primary focus:outline-none  max-w-[300px]"
              />
              {errors.actual && (
                  <p className="text-red text-sm mt-1">{errors.actual.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="especial" className="block text-primary mb-2">Sorteo Especial</label>
              <input
                  id="especial"
                  type="checkbox"
                  {...register("especial")}
                  className="w-5 h-5 rounded border-gray-300 bg-primary text-primary focus:outline-none  max-w-[300px]"
              />
              {errors.especial && (
                  <p className="text-red text-sm mt-1">{errors.especial.message}</p>
              )}
            </div>
        </div>

        {/* Nombre Sorteo */}

        {especialValue?( 
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="nombreSorteo" className="block text-primary mb-2 mx-4">Nombre</label>
              <input
                id="nombreSorteo"
                {...register("nombreSorteo")}
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primary max-w-[300px]"
                type="text"
                placeholder="Navidad"
              />
              {errors.nombreSorteo && (
                <p className="text-red text-sm mt-1">{errors.nombreSorteo.message}</p>
              )}
          </div>
          ):null}
        </div>
        <button type="submit" className="w-full bg-primary hover:opacity-50 text-white font-semibold py-2 px-4 rounded">Enviar</button>
      </form>
    </div>
  );
};

export default GanadorForm;
