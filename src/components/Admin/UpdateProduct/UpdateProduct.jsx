'use client'
import React, { useState, useRef, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";
import axios from "axios";
import UploadImage from "./UploadImage";
import { imgNoDisponible } from '../../../app/Constants/constantes'


export default function UpdateProduct({
  isOpenModal,
  toggleModal,
  n_local,
 
}) {
  const [product, setProduct] = useState({})

  const [isDropdownUbicacionOpen, setIsDropdownUbicacionOpen] = useState(false);
  const [isDropdownCategoriaOpen, setIsDropdownCategoriaOpen] = useState(false);
  const [isDropdownRubroOpen, setIsDropdownRubroOpen] = useState(false);
  
  const [categorias, setCategorias] = useState([])
  const [ubicaciones, setUbicaciones] = useState([])
  const [rubros, setRubros] = useState([])
  const [imagenes, setImagenes] = useState([]);

  
  
  const fetchUpdateProduct = async () => {
    const product = await axios.get(`/api/locales/${n_local}`)
    setProducto(product.data.localEncontrado)
    setImagenes([product.data.localEncontrado.logoLocal, product.data.localEncontrado.fotoLocal]);
    return 
  }
  const fetchSelectAdmin = async () => {
    const res = await axios.get('/api/locales/selectAdmin');
    const { categorias, rubros, ubicaciones } = res.data;
    setCategorias(categorias)
    setUbicaciones(ubicaciones)
    setRubros(rubros)
  }

  useEffect(() => {
    fetchUpdateProduct()
    fetchSelectAdmin()
  }, [])



  const [producto, setProducto] = useState({
    _id: product._id,
    local: product.local,
    n_local: product.n_local,
    email: product.email,
    contacto: product.contacto,
    celular: product.celular,
    linea: product.linea,
    ubicacion: product.ubicacion,
    categoria: product.categoria,
    rubro: product.rubro,
    rubroSecundario: 'No tengo',
    horarios: product.horarios,
    logoLocal: product.logoLocal,
    fotoLocal: product.fotoLocal,
    instagram: 'No tengo',
    facebook: 'No tengo',
    web: 'No tengo',
    texto: product.texto,
    activo: product.activo
  });
  //console.log(producto)
  
   const ubicacionDropdownRef = useRef(null);
   const categoriaDropdownRef = useRef(null);
   const rubroDropdownRef = useRef(null)
   //Efecto para manejar clics fuera de los dropdowns y cerrarlos si es necesario
   useEffect(() => {
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, [])
   
   //Función para manejar clics fuera de los dropdowns y cerrarlos
   const handleClickOutside = (event) => {
     if (ubicacionDropdownRef.current && !ubicacionDropdownRef.current.contains(event.target)) {
       setIsDropdownUbicacionOpen(false);
     }
     if (categoriaDropdownRef.current && !categoriaDropdownRef.current.contains(event.target)) {
       setIsDropdownCategoriaOpen(false);
     }
     if ( rubroDropdownRef.current &&!rubroDropdownRef.current.contains(event.target)) {
       setIsDropdownRubroOpen(false);
     }
   };

  // Función para manejar cambios en los inputs del formulario del producto
  const handleChangeInput = (e) => {
    const { name, type, checked, value } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setProducto((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleUpdateImages = (newImages) => {
    //console.log('Tipo de newImages:', typeof newImages);
    //console.log('newImages:', newImages);
  
    setProducto((prevState) => ({
      ...prevState,
      logoLocal: newImages.logoLocal ,
      fotoLocal: newImages.fotoLocal ,
    }));
  };
  
  


  // Función para alternar la visibilidad del dropdown de marca
   const toggleUbicacion = (e) => {
     e.preventDefault();
     setIsDropdownUbicacionOpen(!isDropdownUbicacionOpen);
   }
   //Función para alternar la visibilidad del dropdown de categoría
   const toggleCategoria = (e) => {
     e.preventDefault();
     setIsDropdownCategoriaOpen(!isDropdownCategoriaOpen);
   };
   //Función para alternar la visibilidad del dropdown de categoría
   const toggleRubro = (e) => {
     e.preventDefault();
     setIsDropdownRubroOpen(!isDropdownRubroOpen);
   };
  

  // Función para agregar una nueva marca a la lista de marcas disponibles
   const handleAgregarNuevaUbicacion = ( valorNuevo) => {
     setUbicaciones([...ubicaciones, valorNuevo ]);
     setIsDropdownUbicacionOpen(false);
   };
  
  // Función para agregar una nueva marca a la lista de marcas disponibles
   const handleAgregarNuevoRubro = ( valorNuevo) => {
     setRubros([...rubros, valorNuevo ]);
     setIsDropdownRubroOpen(false);
   };

  // Función para agregar una nueva categoría a la lista de categorías disponibles
  const handleAgregarNuevaCategoria = (valorNuevo) => {
    setCategorias([...categorias, valorNuevo ]);
    setIsDropdownCategoriaOpen(false);
  };

  // Función para verificar si ha habido cambios en las imágenes
  // const hasImageChanges = () => {
  //   return (
  //     producto.foto_1_1 !== originalImages.foto_1_1 ||
  //     producto.foto_1_2 !== originalImages.foto_1_2 ||
  //     producto.foto_1_3 !== originalImages.foto_1_3 ||
  //     producto.foto_1_4 !== originalImages.foto_1_4
  //   );
  // };

  // Función para manejar el cierre del modal
  const handleToggleModal = () => {
    // if (hasImageChanges()) {
    //   // Mostrar alerta si hay cambios no guardados
    //   Swal.fire({
    //     icon:'warning',
    //     title:'Debe guardar los cambios antes de cerrar.',
    //     showCancelButton:false,})
    // } else {
    //   // Cerrar modal si no hay cambios
      toggleModal();
    // }
  };

 // esto es para incorporar el spinner dentro del sweetAlert
  const loadingElement = document.createElement('div');
  const root = createRoot(loadingElement);
  const container = document.createElement('div');
  root.render(<Loading />);
  container.innerHTML = `<h2><strong>AGUARDE</strong></h2><br/><p> se está actualizando la información del producto</p>`;
  container.appendChild(loadingElement);

  // Función para enviar el formulario actualizado del producto
  const submitUpdateProduct = async (e) => {
    e.preventDefault();
    // Validación básica del campo nombre
    if (!producto.local.trim()) {
      alert("Por favor ingrese un nombre para el producto.");
      return;
    }

    //console.log('productoSubmit:',producto);
    
    try {
      // Mostrar SweetAlert con loading
       Swal.fire({
        title: 'Guardando cambios...',
        allowOutsideClick: false,
        customClass: {
          confirmButton: 'bg-primary text-white hover:bg-blue-700',
        },
        didOpen: () => {
          Swal.showLoading();
        },
      });
       const res = await axios.put("/api/locales/localesUpdate", producto);
     const data = await res.data;

    // Cerrar SweetAlert al completar la solicitud
    Swal.fire({
      icon: 'success',
      title: 'Cambios guardados',
      showConfirmButton: false,
      customClass: {
        confirmButton: 'bg-primary text-white hover:bg-blue-700',
      },
      timer: 1500 // Tiempo en milisegundos para cerrar automáticamente
    });

    toggleModal(); // Cerrar modal de edición

    // Manejar la respuesta si es necesario
  } catch (error) {
    // Cerrar SweetAlert en caso de error
    Swal.fire({
      icon: 'error',
      title: 'Error al guardar cambios',
      text: 'Por favor, inténtelo de nuevo más tarde.',
      customClass: {
        confirmButton: 'bg-primary text-white hover:bg-blue-700',
      }
    });
    toggleModal(); // Cerrar modal de edición
  }
};

  // Filtrar las imágenes que existen para pasarle a UploadImage
  const images = {
    logoLocal: producto.logoLocal || imgNoDisponible,
    fotoLocal: producto.fotoLocal || imgNoDisponible,
  };
  

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
                Editar Local
              </h3>
              <button
                type="button"
                onClick={handleToggleModal} // Utilizamos la función para manejar el cierre del modal
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="updateProductModal"
                aria-label="editar producto"
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
            <form id="formUpdateProduct" onSubmit={submitUpdateProduct}>
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
                    onChange={(e) => handleChangeInput(e)}
                    type="text"
                    name="local"
                    value={producto.local}
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
                    value={producto.n_local}
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
                    value={producto.email}
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
                    value={producto.contacto}
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
                    value={producto.celular}
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
                    value={producto.linea}
                    name="linea"
                    id="lineaAdd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Línea telefónica"
                  />
                </div>

                {/* Ubicación */}
                <div>
                  <label
                    htmlFor="ubicacionUpdate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Ubicación
                  </label>

                  <div className="flex gap-4">
                    <select
                      onChange={handleChangeInput}
                      name="ubicacion"
                      id="ubicacionUpdate"
                      value={producto.ubicacion}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                      {ubicaciones.map((ubicacion, index) => (
                        <option key={index} value={ubicacion}>
                          {ubicacion}
                        </option>
                      ))}
                    </select>

                    <div className="relative" ref={ubicacionDropdownRef}>
                      <button
                        aria-label="seleccionar ubicacion"
                        className="text-gray-800 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm ml-auto inline-flex items-center w-auto h-full p-3"
                        onClick={toggleUbicacion}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") toggleUbicacion(e);
                        }}
                        tabIndex="0"
                      >
                        <FaPlus />
                      </button>

                      {isDropdownUbicacionOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                          <div className="block w-full px-2 py-2 text-left text-gray-700">
                            <input
                              type="text"
                              name="ubicacionNueva"
                              id="ubicacionNueva"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-1"
                              placeholder="Ingrese una ubicación"
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleAgregarNuevaUbicacion(e.target.value);
                              }}
                            />

                            <button
                              aria-label="agregar neuva categoria"
                              onClick={() =>
                                handleAgregarNuevaUbicacion(
                                  document.getElementById("ubicacionNueva")
                                    .value
                                )
                              }
                              className="w-full rounded-lg m-auto px-4 py-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:outline-none focus:ring-4"
                            >
                              AGREGAR
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <label
                    htmlFor="categoriaUpdate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Categoría
                  </label>

                  <div className="flex gap-4">
                    <select
                      onChange={handleChangeInput}
                      name="categoria"
                      id="categoriaUpdate"
                      value={producto.categoria}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                      {categorias.map((categoria, index) => (
                        <option key={index} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>

                    <div className="relative" ref={categoriaDropdownRef}>
                      <button
                        aria-label="seleccionar categoria"
                        className="text-gray-800 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm ml-auto inline-flex items-center w-auto h-full p-3"
                        onClick={toggleCategoria}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") toggleCategoria(e);
                        }}
                        tabIndex="0"
                      >
                        <FaPlus />
                      </button>

                      {isDropdownCategoriaOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                          <div className="block w-full px-2 py-2 text-left text-gray-700">
                            <input
                              type="text"
                              name="categoriaNueva"
                              id="categoriaNueva"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-1"
                              placeholder="Ingrese una categoría"
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleAgregarNuevaCategoria(e.target.value);
                              }}
                            />

                            <button
                              aria-label="agregar neuva categoria"
                              onClick={() =>
                                handleAgregarNuevaCategoria(
                                  document.getElementById("categoriaNueva")
                                    .value
                                )
                              }
                              className="w-full rounded-lg m-auto px-4 py-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:outline-none focus:ring-4"
                            >
                              AGREGAR
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rubro */}
                <div>
                  <label
                    htmlFor="rubroUpdate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Rubro
                  </label>

                  <div className="flex gap-4">
                    <select
                      onChange={handleChangeInput}
                      name="rubro"
                      id="rubroUpdate"
                      value={producto.rubro}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                      {rubros.map((rubro, index) => (
                        <option key={index} value={rubro}>
                          {rubro}
                        </option>
                      ))}
                    </select>

                    <div className="relative" ref={rubroDropdownRef}>
                      <button
                        aria-label="seleccionar rubro"
                        className="text-gray-800 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm ml-auto inline-flex items-center w-auto h-full p-3"
                        onClick={toggleRubro}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") toggleRubro(e);
                        }}
                        tabIndex="0"
                      >
                        <FaPlus />
                      </button>

                      {isDropdownRubroOpen && (
                        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                          <div className="block w-full px-2 py-2 text-left text-gray-700">
                            <input
                              type="text"
                              name="rubroNueva"
                              id="rubroNueva"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-1"
                              placeholder="Ingrese una categoría"
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handleAgregarNuevoRubro(e.target.value);
                              }}
                            />

                            <button
                              aria-label="agregar neuva rubro"
                              onClick={() =>
                                handleAgregarNuevoRubro(
                                  document.getElementById("rubroNueva")
                                    .value
                                )
                              }
                              className="w-full rounded-lg m-auto px-4 py-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:outline-none focus:ring-4"
                            >
                              AGREGAR
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
                    value={producto.rubroSecundario}
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
                    value={producto.horarios}
                    id="horariosAdd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Horarios de atención"
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
                    value={producto.instagram}
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
                    value={producto.facebook}
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
                    value={producto.web}
                    id="webAdd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Sitio web del local"
                  />
                </div>

                {/* Descripción */}
                <div className="col-span-2">
                  <label
                    htmlFor="textoAdd"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Descripción
                  </label>
                  <textarea
                    onChange={handleChangeInput}
                    name="texto"
                    value={producto.texto}
                    id="textoAdd"
                    className="block p-2.5 w-full h-28 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Descripción del local"
                  />
                </div>
              </div>
             
          {/* activos */}
            <div className="flex gap-2 mb-4">
              <input
                onChange={handleChangeInput}
                type="checkbox"
                name="activo"
                id="activo"
                checked={producto.activo}
              />
              <label
                htmlFor="activo"
                className="block text-sm font-medium text-gray-900"
              >
                Local activo
              </label>
            </div>

              {/* Subir Archivo */}
              <UploadImage localData={images} updateLocalData={handleUpdateImages} id={producto._id}/>

              {/* Guardar cambios */}
              <div className="flex justify-center mt-6">
                <button
                  aria-label="guardar la actualizacion"
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
