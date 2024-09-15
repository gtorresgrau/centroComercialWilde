'use client'
import React, { useState } from 'react';
import { logOut } from '../../../lib/firebase';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
//import DownloadCSVButton from '@/components/DownloadCSVButton/DownloadCSVButton';
import { removeFromLocalStorage } from '../../../Hooks/localStorage';



export default function Nav( {handleSelectSection} ) {

    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    try{
       Swal.fire({
        icon:'info',
        title:'¿Esta seguro quiere salir?',
        showCancelButton:true,
        customClass: {
          confirmButton: 'bg-primary text-white hover:bg-blue-700',
        },
        showConfirmButton:true
      }).then(async (result) =>{
        if(result.isConfirmed){
          const salir = logOut();
          removeFromLocalStorage('USER');
          // setUser(null);
          await Swal.fire(salir.message);
          router.push('/')
        }})
    }catch(error){
      toast.error(error)
    }
  };



  return (
    <div className="border-gray-200 bg-[url('/bg/bg-banner.webp')]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between flex-row-reverse mx-auto px-4">
        <a href="#" className="flex items-center space-x-3">
          <img src="assets/logo/administracion.webp" className="h-20" alt="Logo CCW" loading='lazy'/>
        </a>
        <button
        aria-label="menu navbar"
          onClick={toggleMenu}
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      {/* Drawer */}

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } bg-primary w-64`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-200 uppercase "
        >
          Menu
        </h5>
        <button
        
        aria-label="menu navbar"
          type="button"
          onClick={toggleMenu}
          aria-controls="drawer-navigation"
          className="bg-gray-300 text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center "
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
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* Productos  */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-hover  group"
                onClick={() => {
                  handleSelectSection("Productos");
                  toggleMenu();
                }}
              >
                <svg
                  className="w-5 h-5 text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
                  />
                </svg>
                <span className="ml-3 text-gray-200 ">Productos</span>
              </a>
            </li>
            {/* Productos Destacados  */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-hover  group"
                onClick={() => {
                  handleSelectSection("Newsletter");
                  toggleMenu();
                }}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.736 1.043a1.5 1.5 0 0 0-1.472 1.272L6.07 5.5H2.25a1.5 1.5 0 0 0-1.035 2.598l3.072 3.07-1.286 5.144a1.5 1.5 0 0 0 2.318 1.616L10 15.734l4.681 2.194a1.5 1.5 0 0 0 2.318-1.616l-1.286-5.144 3.072-3.07A1.5 1.5 0 0 0 17.75 5.5h-3.82l-1.195-3.185a1.5 1.5 0 0 0-1.472-1.272A9.471 9.471 0 0 0 10 1a9.471 9.471 0 0 0-1.264.043ZM7.5 9.5h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2Z" />
                </svg>
                <span className="ml-3 text-gray-200 ">
                  Newsletter
                </span>
              </a>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-hover group" onClick={() => {handleSelectSection("SorteoCHW"); toggleMenu()}}>
                <svg className="flex-shrink-0 w-5 h-5 text-gray-400 " aria-label='Sorteo' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.736 1.043a1.5 1.5 0 0 0-1.472 1.272L6.07 5.5H2.25a1.5 1.5 0 0 0-1.035 2.598l3.072 3.07-1.286 5.144a1.5 1.5 0 0 0 2.318 1.616L10 15.734l4.681 2.194a1.5 1.5 0 0 0 2.318-1.616l-1.286-5.144 3.072-3.07A1.5 1.5 0 0 0 17.75 5.5h-3.82l-1.195-3.185a1.5 1.5 0 0 0-1.472-1.272A9.471 9.471 0 0 0 10 1a9.471 9.471 0 0 0-1.264.043ZM7.5 9.5h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2Z" />
                </svg>
                <span className="ml-3 text-gray-200 ">Sorteo CHW</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-hover group" onClick={() => {handleSelectSection("SorteoNoCHW"); toggleMenu()}}>
                <svg className="flex-shrink-0 w-5 h-5 text-gray-400 " aria-label='Sorteo' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.736 1.043a1.5 1.5 0 0 0-1.472 1.272L6.07 5.5H2.25a1.5 1.5 0 0 0-1.035 2.598l3.072 3.07-1.286 5.144a1.5 1.5 0 0 0 2.318 1.616L10 15.734l4.681 2.194a1.5 1.5 0 0 0 2.318-1.616l-1.286-5.144 3.072-3.07A1.5 1.5 0 0 0 17.75 5.5h-3.82l-1.195-3.185a1.5 1.5 0 0 0-1.472-1.272A9.471 9.471 0 0 0 10 1a9.471 9.471 0 0 0-1.264.043ZM7.5 9.5h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2Z" />
                </svg>
                <span className="ml-3 text-gray-200 ">Sorteo NO - CHW</span>
              </Link>
            </li>

            {/* Descargar CSV */}
            <li>
              {/* <DownloadCSVButton toggleMenu={toggleMenu} /> */}
            </li>

            {/* Regresar a la WEB */}
            <li>
              <Link
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-hover cursor-pointer group"
                href={"/"}
                onClick={toggleMenu}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                <span className="ml-3 text-gray-200 ">Regresar a la Web</span>
              </Link>
            </li>
            {/* Logout */}
            <li>
              <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-primary-hover cursor-pointer group" onClick={handleLogOut}>
                <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
                </svg>
                <span className="ml-3 text-gray-200 ">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
