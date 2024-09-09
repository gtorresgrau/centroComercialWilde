'use client'
import React, { useEffect, useState, Suspense } from "react";
import AddProduct from "./AddProduct/AddProduct";
import UpdateProduct from "./UpdateProduct/UpdateProduct";
import Pagination from '@mui/material/Pagination';
import SearchBase from '../Admin/SearchBase'
import Nav from "./Nav/Nav";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import axios from "axios";
import TablaNewsletter from './TablaNewsletter/TablaNewsletter'
import TablaSorteosCHW from './TablaSorteos/TablaSorteosCHW'
import TablaSorteosNoCHW from "./TablaSorteos/TablaSorteosNoCHW";

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClose, setIsModalClose] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [section, setSection] = useState('Productos');
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocales, setFilteredLocales] = useState([]);
  const [page, setPage] = useState(1);
  const localPage = 9; // Número de locales por página

  const pages = Math.ceil(filteredLocales.length / localPage); // Total de páginas basado en los locales filtrados

  const handleChange = (event, value) => {
    setPage(value); // Cambia de página
  };

  const fetchProducts = async () => {
    const productos = await axios.get("/api/locales/localesAdmin");
    setProducts(productos.data.locales);
    setFilteredLocales(productos.data.locales); // Inicializar con todos los productos
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar productos según la búsqueda
  useEffect(() => {
    const filtered = products
      .filter((product) =>
        product.local.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.local.localeCompare(b.local)); 
    setFilteredLocales(filtered); 
  }, [searchQuery, products]);

  const openModal = (type, product = null) => {
    setSelectedProduct(type === 'update' ? product.n_local : null);
    setIsModalOpen(true);
    setIsModalClose(false);
    setModalType(type);
    if (type === 'update') {
      window.location.hash = 'update';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalClose(true);
    window.history.pushState(null, null, ' ');
  };

  useEffect(() => {
    if (isModalClose) {
      fetchProducts();
    }

    const handlePopState = () => {
      if (window.location.hash !== '#update' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isModalClose, isModalOpen]);

  const handleEliminarArchivos = async (producto) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado, no podrás recuperar este producto ni sus imágenes asociadas.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminando producto...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const res = await axios.delete(`/api/locales/localDelete?id=${producto._id}`);

        if (res.data.message) {
          fetchProducts();
          Swal.fire({
            icon: 'success',
            title: 'El producto ha sido eliminado correctamente.',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire('Error', 'Ha ocurrido un error al intentar eliminar el producto.', 'error');
        }
      }
    } catch (error) {
      Swal.fire('Error', 'Ha ocurrido un error al intentar eliminar el producto o sus imágenes.', 'error');
    }
  };

  const handleSelectSection = (section) => {
    setSection(section);
  };

  // Determina los locales que se muestran en la página actual
  const paginatedLocales = filteredLocales.slice((page - 1) * localPage, page * localPage);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col min-h-screen mb-40 ">
        <Nav handleSelectSection={handleSelectSection}  className='bg-secondary'/>
        {section === 'Productos' && (
          <div>
            <section id="tablaProductosAdmin" className="bg-primary min-h-screen p-2 sm:p-3 md:p-5">
              <div className="mx-auto max-w-screen-xl px-0 lg:px-12">
                <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 text-center md:text-left ">
                    <div className="w-full rounded-md">
                      <SearchBase
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        locales={products}
                        setFilteredLocales={setFilteredLocales}
                      />
                    </div>
                    <div className="md:flex md:justify-end gap-3 grid grid-cols-5 w-full">
                      <div className="col-span-6 md:col-span-3">
                        <button type="button" aria-label="agregar producto" className="flex items-center text-white border bg-primary hover:bg-[#612c67] active:bg-[#9c47a5] font-medium w-full justify-center rounded-lg h-10 text-xs xs:text-sm px-5 py-2 text-center " onClick={() => openModal('add')}>+  Agregar local</button>
                        {isModalOpen && modalType === 'add' && (
                          <AddProduct toggleModal={closeModal} isOpenModal={isModalOpen} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                   <Pagination count={pages} page={page} onChange={handleChange} color="secondary" siblingCount={0} className="m-4 align-middle self-center"/>
                    <table className="w-full text-sm text-center text-gray-500" id="productosAdmin">
                      <thead className="text-xs text-gray-900 uppercase bg-gray-400">
                        <tr>
                          <th scope="col" className="px-1 py-2 md:px-4 md:py-3 text-center text-xs md:font-medium md:text-base">Local</th>
                          <th scope="col" className="px-1 py-2 md:px-4 md:py-3 text-center text-xs md:font-medium md:text-base hidden md:table-cell">Categoría</th>
                          <th scope="col" className="px-1 py-2 md:px-4 md:py-3 text-center text-xs md:font-medium md:text-base">Acción</th>
                        </tr>
                      </thead>
                      {paginatedLocales.length ? (
                        <tbody>
                          {paginatedLocales.map((product, index) => (
                            <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}>
                              <th  scope="row" className="px-2 py-6 md:px-4 md:py-4 text-start text-xs md:font-medium md:text-base text-gray-900 whitespace-nowrap" title={product.local} >{product.local.length > 10 ? `${product.local.slice(0, 30)}...` : product.local}</th>
                              <td scope="row" className="px-1 py-6 md:px-4 md:py-4 text-xs md:font-medium md:text-base hidden md:table-cell">{product.categoria}</td>
                              <td scope="row" className="px-1 py-6 md:px-4 md:py-4 text-xs md:font-medium md:text-base">
                                <div className="flex justify-evenly items-center mx-1">
                                  <button
                                    aria-label="editar producto"
                                    id="updateProductButton"
                                    data-modal-target="updateProductModal"
                                    data-modal-toggle="updateProductModal"
                                    className="px-3 py-2 text-xs items-center focus:outline-none text-white bg-green hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg me-2 "
                                    type="button"
                                    onClick={() => openModal('update', product)}>Editar</button>
                                  <button aria-label="Eliminar Producto" onClick={() => handleEliminarArchivos(product)} type="button" className="px-3 py-2 text-xs focus:outline-none text-white bg-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg ">
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr className="text-center">
                            <td colSpan="5" className="py-10">
                              <span className="text-gray-500 font-semibold">No existen locales con esa información.</span>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </section>
            {isModalOpen && modalType === 'update' && selectedProduct && (
              <UpdateProduct
                toggleModal={closeModal}
                isOpenModal={isModalOpen}
                n_local={selectedProduct}
              />
            )}
          </div>
        )}

        <article className="flex-1 bg-primary-background p-3 sm:p-5">
          {section === 'Newsletter' && (
            <div className="mx-auto max-w-screen-xl lg:px-12">
              <TablaNewsletter />
            </div>
          )}
          {section === 'SorteoCHW' && (
            <div className="mx-auto max-w-screen-xl lg:px-12">
              <TablaSorteosCHW />
            </div>
          )}
          {section === 'SorteoNoCHW' && (
            <div className="mx-auto max-w-screen-xl lg:px-12">
              <TablaSorteosNoCHW />
            </div>
          )}
          {section === 'DescargarCSV' && (
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
              {/* <DownloadCSVButton /> */}
            </div>
          )}
        </article>
      </div>
    </Suspense>
  );
}
