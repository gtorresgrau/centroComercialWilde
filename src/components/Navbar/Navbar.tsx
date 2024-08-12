import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState } from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Contactus from "./Contactus";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '#home', current: true },
  { name: 'Locales', href: '#locales', current: false },
  { name: 'Comentarios', href: '#comentarios', current: false },
  { name: 'Newsletter', href: '#newsletter', current: false },
  { name: 'Sorteo', href: '#sorteo', current: false },
  { name: 'Ubicacion', href: '#ubicacion', current: false },
  { name: 'Contacto', href: '#contacto', current: false },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Disclosure as="nav" className="bg-lightpink navbar relative z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-50">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex flex-1 md:items-center sm:items-stretch sm:justify-start">
            {/* DRAWER ICON */}
            <div className='block lg:hidden'>
              <button
                aria-label="Abrir menú"
                aria-controls="drawer"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
                className="focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <Bars3Icon className="block h-6 w-6" aria-label='cerrar menu' />
              </button>
            </div>

            {/* LINKS */}
            <div className="hidden sm:ml-14 lg:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  item.name !== 'Contacto' ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-label={item.name}
                      className={`${item.current ? 'text-purple' : 'hover:text-purple-600'} px-3 py-4 lg:text-20px md:text-15px font-large space-links focus:outline-none focus:ring-2 focus:ring-purple-600`}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name.toUpperCase()}
                    </Link>
                  ) : (
                    <Contactus key={item.name} aria-label={item.name} />
                  )
                ))}
              </div>
            </div>
          </div>

          {/* LOGO */}
          <div className="flex flex-shrink-0 items-center">
            <img
              className="block h-30px w-30px lg:hidden"
              src='assets/logo/administracion.webp'
              alt="Centro Comercial Logo"
              width={70}
              height={70}
              aria-label='logo centro comercial'
            />
            <img
              className="hidden h-48px w-48px lg:block"
              src='assets/logo/administracion.webp'
              alt="Centro Comercial Logo"
              width={70}
              height={70}
              aria-label='logo centro comercial'
            />
          </div>

          {/* DRAWER */}
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <Drawerdata />
          </Drawer>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
