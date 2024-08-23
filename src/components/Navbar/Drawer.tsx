import React from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DrawerProps } from "@/src/types/interfaces";


const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
    return (
        <main className={`fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ${isOpen ? "transition-opacity opacity-100 duration-500 translate-x-0" : "transition-all delay-500 opacity-0 -translate-x-full"}`} aria-label="abrir menu">
            <section className={`w-340px max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <article className="relative w-340px max-w-lg pb-10 flex flex-col space-y-6 h-full">
                    <header className="p-4 flex items-center justify-between">
                        <img className="block h-30px w-30px lg:hidden" 
                            src='assets/logo/administracion.webp' 
                            alt="Centro Comercial Logo" 
                            aria-label="logo centro comercial"
                            width={70} 
                            height={70} 
                            onClick={() => setIsOpen(false)} 
                            loading='lazy'
                        />
                        <XMarkIcon className="block h-6 w-6 cursor-pointer" onClick={() => setIsOpen(false)} aria-label="Close Drawer" />
                    </header>
                    <div onClick={() => setIsOpen(false)}>{children}</div>
                </article>
            </section>
            <div className="w-screen h-full cursor-pointer" onClick={() => setIsOpen(false)}  aria-label="Cerrar menú" role="button"></div>
        </main>
    );
}

export default Drawer;
