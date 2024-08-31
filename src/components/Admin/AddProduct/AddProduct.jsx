'use client'
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaPlus } from "react-icons/fa";
import UploadImage from '../UploadImage';
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading';


export default function AddProduct({
    isOpenModal,
    toggleModal,
  //  product
  }) {
    // const [isDropdownMarcaOpen, setIsDropdownMarcaOpen] = useState(false);
    // const [isDropdownCategoriaOpen, setIsDropdownCategoriaOpen] = useState(false);
    // const [isDropdownVehiculoOpen, setIsDropdownVehiculoOpen] = useState(false);
    // const [marcas, setMarcas] = useState('');
    // const [categorias, setCategorias] = useState('');
    // const [vehiculos, setVehiculos] = useState('');

  
    // // Estado para mantener las imágenes originales
    // const [originalImages, setOriginalImages] = useState({
    //   foto_1_1: "",
    //   foto_1_2: "",
    //   foto_1_3: "",
    //   foto_1_4: "",
    // });
  
    const [producto, setProducto] = useState({
        _id: null,
        local: null,
        n_local: null,
        email: null,
        contacto: null,
        celular: null,
        linea: null,
        ubicacion: null,
        categoria: null,
        rubro: null,
        rubroSecundario: 'No tengo',
        horarios: null,
        logoLocal: null,
        fotoLocal: null,
        instagram: 'No tengo',
        facebook: 'No tengo',
        web: 'No tengo',
        texto: null
      });
  
    const marcaDropdownRef = useRef(null);
    const categoriaDropdownRef = useRef(null);
    const vehiculoDropdownRef = useRef(null);
  
    // Efecto para manejar clics fuera de los dropdowns y cerrarlos si es necesario
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    // Función para manejar clics fuera de los dropdowns y cerrarlos
    const handleClickOutside = (event) => {
      if (marcaDropdownRef.current && !marcaDropdownRef.current.contains(event.target)) {
        setIsDropdownMarcaOpen(false);
      }
      if (categoriaDropdownRef.current && !categoriaDropdownRef.current.contains(event.target)) {
        setIsDropdownCategoriaOpen(false);
      }
      if ( vehiculoDropdownRef.current &&!vehiculoDropdownRef.current.contains(event.target)) {
        setIsDropdownVehiculoOpen(false);
      }
    };
  
    
    
    
    // // Función para alternar la visibilidad del dropdown de marca
    // const toggleMarca = (e) => {
    //     e.preventDefault();
    //     setIsDropdownMarcaOpen(!isDropdownMarcaOpen);
    // };
  
    // // Función para alternar la visibilidad del dropdown de categoría
    // const toggleCategoria = (e) => {
    //     e.preventDefault();
    //   setIsDropdownCategoriaOpen(!isDropdownCategoriaOpen);
    // };
    
    // // Función para alternar la visibilidad del dropdown de categoría
    // const toggleVehiculo = (e) => {
    //     e.preventDefault();
    //     setIsDropdownVehiculoOpen(!isDropdownVehiculoOpen);
    // };
    
    
//     // Función para agregar una nueva marca a la lista de marcas disponibles
//     const handleAgregarNuevaMarca = (campo, valorNuevo) => {
//         setMarcas([...marcas, { brand: valorNuevo }]);
//         setIsDropdownMarcaOpen(false);
//     };
    
//     // Función para agregar una nueva marca a la lista de marcas disponibles
//     const handleAgregarNuevoVehiculo = (campo, valorNuevo) => {
//         setVehiculos([...vehiculo, { vehiculo: valorNuevo }]);
//         setIsDropdownVehiculoOpen(false);
//     };
    
//     // Función para agregar una nueva categoría a la lista de categorías disponibles
//     const handleAgregarNuevaCategoria = (campo, valorNuevo) => {
//         setCategorias([...categorias, { category: valorNuevo }]);
//         setIsDropdownCategoriaOpen(false);
//     };
    
//     // Función para actualizar las imágenes del producto
//     const handleUpdateImages = (newImages) => {
//         setProducto((prevState) => ({
//             ...prevState,
//             foto_1_1: newImages[0]?.preview || "",
//             foto_1_2: newImages[1]?.preview || "",
//             foto_1_3: newImages[2]?.preview || "",
//         foto_1_4: newImages[3]?.preview || "",
//     }));
// };

// // Función para eliminar una imagen específica del producto
// const handleRemoveImage = (index) => {
//     setProducto((prevState) => {
//         const updatedState = { ...prevState };
//         switch (index) {
//             case 0:
//             updatedState.foto_1_1 = "";
//             break;
//           case 1:
//               updatedState.foto_1_2 = "";
//             break;
//           case 2:
//             updatedState.foto_1_3 = "";
//             break;
//             case 3:
//                 updatedState.foto_1_4 = "";
//                 break;
//                 default:
//                     break;
//         }
//         return updatedState;
//     });
// };

// // Función para verificar si ha habido cambios en las imágenes
// const hasImageChanges = () => {
//     return (
//         producto.foto_1_1 !== originalImages.foto_1_1 ||
//         producto.foto_1_2 !== originalImages.foto_1_2 ||
//         producto.foto_1_3 !== originalImages.foto_1_3 ||
//         producto.foto_1_4 !== originalImages.foto_1_4
//     );
//     };
  
    // Función para manejar el cierre del modal
    const handleToggleModal = () => {
      //   if (hasImageChanges()) {
      //       // Mostrar alerta si hay cambios no guardados
      //       Swal.fire({
      //     icon:'warning',
      //     title:'Debe guardar los cambios antes de cerrar.',
      //     showCancelButton:false,})
      // } else {
          // Cerrar modal si no hay cambios
          toggleModal();
        // }
    };
    
    // Función para manejar cambios en los inputs del formulario del producto
    const handleChangeInput = (e) => {
        const { name, value, type, checked } = e.target;
        console.log(name, value, type)
        setProducto ( (prevState) => ({
        ...prevState,
          [name]:value
        // titulo_de_producto:`${producto.nombre} ${producto.marca} para ${producto.vehiculo}`
        }
        ));
    //console.log(producto,'acaas')
    };

     // esto es para incorporar el spinner dentro del sweetAlert
    const loadingElement = document.createElement('div');
    const root = ReactDOM.createRoot(loadingElement);
    const container = document.createElement('div');
    root.render(<Loading />);
    container.innerHTML = `<h2><strong>AGUARDE</strong></h2><br/><p> se está creando el producto</p>`;
    container.appendChild(loadingElement);


    // Función para enviar el formulario actualizado del producto
    const submitAddProduct = async (e) => {
      e.preventDefault();
      console.log(producto,'submit')
      
      //   // Validación básica del campo nombre
      //   if (!producto.nombre.trim()) {
        //     alert("Por favor ingrese un nombre para el producto.");
        //     return;
        //   }
  
        // Filtrar solo las propiedades que no están vacías o que tienen algún valor
        const filteredProducto = {};
        Object.keys(producto).forEach((key) => {
            if (
            producto[key] !== undefined &&
            producto[key] !== null &&
            producto[key] !== ""
          ) {
            filteredProducto[key] = producto[key];
          }
        });
        console.log(filteredProducto)
        // Crear FormData y agregar propiedades del producto filtrado
        const formData = new FormData();
        Object.keys(filteredProducto).forEach((key) => {
          formData.append(key, filteredProducto[key]);
        });
       
       //console.log(formData,'formdatasubmit')
      Swal.fire({
    title: 'Agregando Local...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    // Mostrar SweetAlert con indicador de carga
    Swal.fire({
      title: 'Agregando Local...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
console.log(producto)
// // Realizar la solicitud para agregar el producto
// const res = await fetch("api/addProduct", {
  //   method: "POST",
  //   body: formData,
  // });
  
  // Obtener datos de la respuesta
  // const data = await res.json();
  
  // Cerrar SweetAlert al completar la solicitud con éxito
  Swal.fire({
    icon: 'success',
    title: 'Local agregado',
    showConfirmButton: false,
    timer: 1500 // Tiempo en milisegundos para cerrar automáticamente
  });
  
  // Cerrar modal de añadir producto
  // toggleModal();
  
  // Manejar la respuesta si es necesario
  // console.log(data.descripcion, "dataaaaaa");
} catch (error) {
  // Cerrar SweetAlert en caso de error
  console.log(formData)
  Swal.fire({
      icon: 'error',
      title: 'Error al agregar producto',
      text: 'Por favor, inténtelo de nuevo más tarde.',
    });

    // Cerrar modal de añadir producto
    // toggleModal();

    console.error("Error al agregar el producto:", error);
  }
};
    // // Filtrar las imágenes que existen para pasarle a UploadImage
    // const imagenes = [
    //   producto.foto_1_1,
    //   producto.foto_1_2,
    //   producto.foto_1_3,
    //   producto.foto_1_4,
    // ].filter(Boolean);
  
    return (
      <div>
        <div
          id="updateProductModal"
          tabIndex="-1"
          aria-hidden="true"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 overflow-hidden ${
            isOpenModal ? "" : "hidden"
          }`}
        >
          <div className="rounded-none max-w-3xl w-full max-h-full overflow-y-auto">
            <div className="relative p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Agregar Local
                </h3>
                <button
                  aria-label="Agregar producto"
                  type="button"
                  onClick={handleToggleModal} // Utilizamos la función para manejar el cierre del modal
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="updateProductModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    width={20}
                    height={20}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
  
              <form id='formAddProduct' onSubmit={submitAddProduct}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                
  {/* Local */}
<div>
  <label
    htmlFor="localAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Local
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="local"
    id="localAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Nombre del local"
  />
</div>

{/* Número de local */}
<div>
  <label
    htmlFor="n_localAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Número de local
  </label>
  <input
    onChange={handleChangeInput}
    type="number"
    name="n_local"
    id="n_localAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Número del local"
  />
</div>

{/* Email */}
<div>
  <label
    htmlFor="emailAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Email
  </label>
  <input
    onChange={handleChangeInput}
    type="email"
    name="email"
    id="emailAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Email del local"
  />
</div>

{/* Contacto */}
<div>
  <label
    htmlFor="contactoAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Contacto
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="contacto"
    id="contactoAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Persona de contacto"
  />
</div>

{/* Celular */}
<div>
  <label
    htmlFor="celularAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Celular
  </label>
  <input
    onChange={handleChangeInput}
    type="number"
    name="celular"
    id="celularAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Número de celular"
  />
</div>

{/* Línea */}
<div>
  <label
    htmlFor="lineaAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Línea
  </label>
  <input
    onChange={handleChangeInput}
    type="number"
    name="linea"
    id="lineaAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Línea telefónica"
  />
</div>

{/* Ubicación */}
<div>
  <label
    htmlFor="ubicacionAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Ubicación
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="ubicacion"
    id="ubicacionAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Ubicación del local"
  />
</div>

{/* Categoría */}
<div>
  <label
    htmlFor="categoriaAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Categoría
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="categoria"
    id="categoriaAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Categoría del local"
  />
</div>

{/* Rubro */}
<div>
  <label
    htmlFor="rubroAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Rubro
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="rubro"
    id="rubroAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Rubro principal"
  />
</div>

{/* Rubro Secundario */}
<div>
  <label
    htmlFor="rubroSecundarioAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Rubro Secundario
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="rubroSecundario"
    id="rubroSecundarioAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Rubro secundario"
  />
</div>

{/* Horarios */}
<div>
  <label
    htmlFor="horariosAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Horarios
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="horarios"
    id="horariosAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Horarios de atención"
  />
</div>

{/* Logo del Local */}
<div>
  <label
    htmlFor="logoLocalAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Logo del Local
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="logoLocal"
    id="logoLocalAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="URL del logo del local"
  />
</div>

{/* Foto del Local */}
<div>
  <label
    htmlFor="fotoLocalAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Foto del Local
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="fotoLocal"
    id="fotoLocalAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="URL de la foto del local"
  />
</div>

{/* Instagram */}
<div>
  <label
    htmlFor="instagramAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Instagram
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="instagram"
    id="instagramAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Instagram del local"
  />
</div>

{/* Facebook */}
<div>
  <label
    htmlFor="facebookAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Facebook
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="facebook"
    id="facebookAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Facebook del local"
  />
</div>

{/* Sitio Web */}
<div>
  <label
    htmlFor="webAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Sitio Web
  </label>
  <input
    onChange={handleChangeInput}
    type="text"
    name="web"
    id="webAdd"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    placeholder="Sitio web del local"
  />
</div>

{/* Descripción */}
<div className='col-span-2'>
  <label
    htmlFor="textoAdd"
    className="block mb-2 text-sm font-medium text-gray-900"
  >
    Descripción
  </label>
  <textarea
    onChange={handleChangeInput}
    name="texto"
    id="textoAdd"
    className="block p-2.5 w-full h-28 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
    placeholder="Descripción del local"
  />
</div>


                    {/* destacados */}
                {/* <div className='flex gap-2 mb-2'>
                  <input onChange={handleChangeInput} type="checkbox" name="destacados" id="destacadosAdd" checked={producto.destacados}/>
                  <label htmlFor="destacadosAdd" className="block  text-sm font-medium text-gray-900" >Producto Destacado</label>
                </div> */}
                </div>
  
                {/* Subir Archivo */}
                {/* <UploadImage
                  imagenes={imagenes}
                  updateImages={handleUpdateImages}
                  handleRemoveImage={handleRemoveImage}
                />
   */}
                {/* Guardar cambios */}
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
          </div>
        </div>
      </div>
    );
  }
  