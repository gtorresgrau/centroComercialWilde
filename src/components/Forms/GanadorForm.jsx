import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const GanadorForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const alert = (nombre) => {
    Swal.fire({
        title: `${nombre}, te anotaste correctamente.`,
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
    console.log(data);
    const {nombre } = data;
    try {
        alertLoading();
        console.log('data:',data)
        const response = await axios.post('/api/sorteos/postGanadores', {
            ...data,
        });
        Swal.close();
        if (response.status === 200) {
            alert(nombre);
            reset();
            setIsOpen(false);
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
        setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-primary p-4 ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 bg-secondary rounded-lg shadow-lg min-h-[415px]" >
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
          />
          {errors.apellido && (
            <p className="text-red text-sm mt-1">{errors.apellido.message}</p>
          )}
        </div>

        {/* Torre */}
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="torre" className="block text-primary mb-2 mx-4">Torre</label>
          <input
            id="torre"
            {...register("torre", { required: "La torre es obligatoria" })}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primary max-w-[300px]"
            type="text"
          />
          {errors.torre && (
            <p className="text-red text-sm mt-1">{errors.torre.message}</p>
          )}
        </div>

        {/* CHW */}
        <div className="flex justify-evenly">
            <div className="mb-6">
            <label htmlFor="CHW" className="block text-primary mb-2">¿Es CHW?</label>
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
            <label htmlFor="actual" className="block text-primary mb-2">¿Es ganador actual?</label>
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
        </div>
        </div>
        <button type="submit" className="w-full bg-primary hover:opacity-50 text-white font-semibold py-2 px-4 rounded">Enviar</button>
      </form>
    </div>
  );
};

export default GanadorForm;
