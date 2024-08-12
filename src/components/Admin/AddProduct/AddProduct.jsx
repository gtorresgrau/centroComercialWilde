'use client'
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FaPlus } from "react-icons/fa";
import UploadImage from '../UploadImage';
import Swal from 'sweetalert2';
import Loading from '../../Loading/Loading';


export default function AddProduct({
    isOpenModal,
    toggleModal,
    categoria,
    marca,
    vehiculo,
  }) {
    const [isDropdownMarcaOpen, setIsDropdownMarcaOpen] = useState(false);
    const [isDropdownCategoriaOpen, setIsDropdownCategoriaOpen] = useState(false);
    const [isDropdownVehiculoOpen, setIsDropdownVehiculoOpen] = useState(false);
    const [marcas, setMarcas] = useState(marca);
    const [categorias, setCategorias] = useState(categoria);
    const [vehiculos, setVehiculos] = useState(vehiculo);

  
    // Estado para mantener las imágenes originales
    const [originalImages, setOriginalImages] = useState({
      foto_1_1: "",
      foto_1_2: "",
      foto_1_3: "",
      foto_1_4: "",
    });
  
    const [producto, setProducto] = useState({
      _id: '',
      n_producto:'',
      cod_producto:'',
      marca: '',
      vehiculo: '',
      categoria: '',
      nombre: '',
      modelo: '',
      n_serie:  "",
      titulo_de_producto:'',
      descripcion: '',
      n_electronica: '',
      medidas: '',
      foto_1_1:  "",
      foto_1_2:  "",
      foto_1_3:  "",
      foto_1_4:  "",
      destacados:'',

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
  
    
    
    
    // Función para alternar la visibilidad del dropdown de marca
    const toggleMarca = (e) => {
        e.preventDefault();
        setIsDropdownMarcaOpen(!isDropdownMarcaOpen);
    };
  
    // Función para alternar la visibilidad del dropdown de categoría
    const toggleCategoria = (e) => {
        e.preventDefault();
      setIsDropdownCategoriaOpen(!isDropdownCategoriaOpen);
    };
    
    // Función para alternar la visibilidad del dropdown de categoría
    const toggleVehiculo = (e) => {
        e.preventDefault();
        setIsDropdownVehiculoOpen(!isDropdownVehiculoOpen);
    };
    
    
    // Función para agregar una nueva marca a la lista de marcas disponibles
    const handleAgregarNuevaMarca = (campo, valorNuevo) => {
        setMarcas([...marcas, { brand: valorNuevo }]);
        setIsDropdownMarcaOpen(false);
    };
    
    // Función para agregar una nueva marca a la lista de marcas disponibles
    const handleAgregarNuevoVehiculo = (campo, valorNuevo) => {
        setVehiculos([...vehiculo, { vehiculo: valorNuevo }]);
        setIsDropdownVehiculoOpen(false);
    };
    
    // Función para agregar una nueva categoría a la lista de categorías disponibles
    const handleAgregarNuevaCategoria = (campo, valorNuevo) => {
        setCategorias([...categorias, { category: valorNuevo }]);
        setIsDropdownCategoriaOpen(false);
    };
    
    // Función para actualizar las imágenes del producto
    const handleUpdateImages = (newImages) => {
        setProducto((prevState) => ({
            ...prevState,
            foto_1_1: newImages[0]?.preview || "",
            foto_1_2: newImages[1]?.preview || "",
            foto_1_3: newImages[2]?.preview || "",
        foto_1_4: newImages[3]?.preview || "",
    }));
};

// Función para eliminar una imagen específica del producto
const handleRemoveImage = (index) => {
    setProducto((prevState) => {
        const updatedState = { ...prevState };
        switch (index) {
            case 0:
            updatedState.foto_1_1 = "";
            break;
          case 1:
              updatedState.foto_1_2 = "";
            break;
          case 2:
            updatedState.foto_1_3 = "";
            break;
            case 3:
                updatedState.foto_1_4 = "";
                break;
                default:
                    break;
        }
        return updatedState;
    });
};

// Función para verificar si ha habido cambios en las imágenes
const hasImageChanges = () => {
    return (
        producto.foto_1_1 !== originalImages.foto_1_1 ||
        producto.foto_1_2 !== originalImages.foto_1_2 ||
        producto.foto_1_3 !== originalImages.foto_1_3 ||
        producto.foto_1_4 !== originalImages.foto_1_4
    );
    };
  
    // Función para manejar el cierre del modal
    const handleToggleModal = () => {
        if (hasImageChanges()) {
            // Mostrar alerta si hay cambios no guardados
            Swal.fire({
          icon:'warning',
          title:'Debe guardar los cambios antes de cerrar.',
          showCancelButton:false,})
      } else {
          // Cerrar modal si no hay cambios
          toggleModal();
        }
    };
    
    // Función para manejar cambios en los inputs del formulario del producto
    const handleChangeInput = (e) => {
        const { name, value, type, checked } = e.target;
        setProducto ( (prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
        titulo_de_producto:`${producto.nombre} ${producto.marca} para ${producto.vehiculo}`
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
      //console.log(producto,'submit')
      
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
       // Crear FormData y agregar propiedades del producto filtrado
       const formData = new FormData();
       Object.keys(filteredProducto).forEach((key) => {
         formData.append(key, filteredProducto[key]);
       });
       
       //console.log(formData,'formdatasubmit')
      Swal.fire({
    title: 'Agregando producto...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    // Mostrar SweetAlert con indicador de carga
    Swal.fire({
      title: 'Agregando producto...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Realizar la solicitud para agregar el producto
    const res = await fetch("api/addProduct", {
      method: "POST",
      body: formData,
    });

    // Obtener datos de la respuesta
    const data = await res.json();

    // Cerrar SweetAlert al completar la solicitud con éxito
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      showConfirmButton: false,
      timer: 1500 // Tiempo en milisegundos para cerrar automáticamente
    });

    // Cerrar modal de añadir producto
    toggleModal();

    // Manejar la respuesta si es necesario
    console.log(data.descripcion, "dataaaaaa");
  } catch (error) {
    // Cerrar SweetAlert en caso de error
    Swal.fire({
      icon: 'error',
      title: 'Error al agregar producto',
      text: 'Por favor, inténtelo de nuevo más tarde.',
    });

    // Cerrar modal de añadir producto
    toggleModal();

    console.error("Error al agregar el producto:", error);
  }
};
    // Filtrar las imágenes que existen para pasarle a UploadImage
    const imagenes = [
      producto.foto_1_1,
      producto.foto_1_2,
      producto.foto_1_3,
      producto.foto_1_4,
    ].filter(Boolean);
  
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
                  Agregar Producto
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
                
                {/* Nombre */}
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Nombre
                    </label>
                    <div className='flex'>

                    <input
                      onChange={handleChangeInput}
                      type="text"
                      name="nombre"
                      id="nombreAddProduct"
                      value={producto.nombre}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Nombre del producto"
                      />
                      {producto.destacados
                        ?<img src="/images/FotoDestacados.webp" alt={producto.nombre} width={30} height={20} className="m-1" loading='lazy'/>
                        :null}
                        </div>
                  </div>

              
  
                  {/* Marca */}
                  <div>
                    <label  htmlFor="marcaAddProduct" className="block mb-2 text-sm font-medium text-gray-900" >Marca</label>
  
                    <div className="flex gap-4">
                      <select onChange={handleChangeInput} name="marca" id="marcaAddProduct" value={producto.marca} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                        <option value="" hidden>Seleccione una marca</option>
                          {marcas.map((marca, index) => (
                            <option key={index} value={marca.brand}>
                              {marca.brand}
                            </option>
                        ))}
                      </select>
  
                      <div className="relative" ref={marcaDropdownRef}>
                        <button aria-label="seleccionar marca" className="text-gray-800 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm ml-auto inline-flex items-center w-auto h-full p-3" onClick={toggleMarca} onKeyDown={(e) => { if (e.key === "Enter") toggleMarca(e); }} tabIndex="0"><FaPlus />
                        </button>
  
                        {isDropdownMarcaOpen && (
                          <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                            <div className="block w-full px-2 py-2 text-left text-gray-700">
                              <input
                                type="text"
                                name="marcaNueva"
                                id="marcaNueva"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-1"
                                placeholder="Ingrese una marca nueva"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    handleAgregarNuevaMarca(
                                      "marca",
                                      e.target.value
                                    );
                                }}
                              />
  
                              <button aria-label="agregar nueva marca" onClick={() =>handleAgregarNuevaMarca("marca", document.getElementById("marcaNueva").value)} className="w-full rounded-lg m-auto px-4 py-2 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:outline-none focus:ring-4" >
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
                      htmlFor="categoriaAdd"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Categoría
                    </label>
  
                    <div className="flex gap-4">
                      <select
                        onChange={handleChangeInput}
                        name="categoria"
                        id="categoriaAdd"
                        value={producto.categoria}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      >
                        <option value="" hidden>Seleccione una categoria</option>
                        {categorias.map((categoria, index) => (
                          <option key={index} value={categoria.category}>
                            {categoria.category}
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-1 z-10"
                                placeholder="Ingrese una categoría"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    handleAgregarNuevaCategoria(
                                      "categoria",
                                      e.target.value
                                    );
                                }}
                              />
  
                              <button
                              aria-label="agregar nueva categoria"
                                onClick={() =>
                                  handleAgregarNuevaCategoria(
                                    "categoria",
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
  
                  {/* Vehiculo */}
                  <div>
                    <label
                      htmlFor="vehiculoAdd"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Vehiculo
                    </label>
  
                    <div className="flex gap-4">
                      <select
                        onChange={handleChangeInput}
                        name="vehiculo"
                        id="vehiculoAdd"
                        value={producto.vehiculo}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      >
                        <option value="" hidden>Seleccione una vehiculo</option>
                        {vehiculos.map((vehiculo, index) => (
                          <option key={index} value={vehiculo.vehiculo}>
                            {vehiculo.vehiculo}
                          </option>
                        ))}
                      </select>
  
                      <div className="relative" ref={vehiculoDropdownRef}>
                        <button
                        aria-label="seleccionar vehiculo"
                          className="text-gray-800 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm ml-auto inline-flex items-center w-auto h-full p-3"
                          onClick={toggleVehiculo}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") toggleVehiculo(e);
                          }}
                          tabIndex="0"
                        >
                          <FaPlus />
                        </button>
  
                        {isDropdownVehiculoOpen && (
                          <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                            <div className="block w-full px-2 py-2 text-left text-gray-700">
                              <input
                                type="text"
                                name="vehiculoNuevo"
                                id="vehiculoNuevo"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-1"
                                placeholder="Ingrese un vehiculo"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    handleAgregarNuevoVehiculo(
                                      "vehiculo",
                                      e.target.value
                                    );
                                }}
                              />
  
                              <button
                              aria-label="agregar vehiculo"
                                onClick={() =>
                                  handleAgregarNuevoVehiculo(
                                    "vehiculo",
                                    document.getElementById("vehiculoNuevo")
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
  
                  {/* Modelo */}
                  <div>
                    <label
                      htmlFor="modeloAdd"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Modelo
                    </label>
                    <input
                      onChange={handleChangeInput}
                      type="text"
                      name="modelo"
                      id="modeloAdd"
                      value={producto.modelo}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Modelo del producto"
                    />
                  </div>
  
                  {/* Numero de serie */}
                  <div>
                    <label
                      htmlFor="n_serieAdd"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Numero de serie
                    </label>
                    <input
                      onChange={handleChangeInput}
                      type="text"
                      name="n_serie"
                      id="n_serieAdd"
                      value={producto.n_serie}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Numero de serie del producto"
                    />
                  </div>
  
                  {/* Numero de electronica */}
                  <div>
                    <label
                      htmlFor="n_electronicaAdd"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Numero de electronica
                    </label>
                    <input
                      onChange={handleChangeInput}
                      type="text"
                      name="n_electronica"
                      id="n_electronicaAdd"
                      value={producto.n_electronica}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Numero de electronica del producto"
                    />
                  </div>
  
                  {/* Medidas */}
                  <div>
                    <label
                      htmlFor="medidasAdd"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                     Medidas
                    </label>
                    <input
                      onChange={handleChangeInput}
                      type="text"
                      name="medidas"
                      id="medidasAdd"
                      value={producto.medidas}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Medidas del producto"
                    />
                  </div>
  
                  {/* Descripción */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="descripcionAdd"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Descripción
                    </label>
                    <textarea
                      onChange={handleChangeInput}
                      id="descripcionAdd"
                      rows="5"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Descripción del producto..."
                      value={producto.descripcion}
                      name="descripcion"
                    />
                  </div>

                    {/* destacados */}
                <div className='flex gap-2 mb-2'>
                  <input onChange={handleChangeInput} type="checkbox" name="destacados" id="destacadosAdd" checked={producto.destacados}/>
                  <label htmlFor="destacadosAdd" className="block  text-sm font-medium text-gray-900" >Producto Destacado</label>
                </div>
                </div>
  
                {/* Subir Archivo */}
                <UploadImage
                  imagenes={imagenes}
                  updateImages={handleUpdateImages}
                  handleRemoveImage={handleRemoveImage}
                />
  
                {/* Guardar cambios */}
                <div className="flex justify-center mt-6">
                  <button
                  aria-label="guardar cambios"
                    type="submit"
                    className="px-6 py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-lg"
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
  