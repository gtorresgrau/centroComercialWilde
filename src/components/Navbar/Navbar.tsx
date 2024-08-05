import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Contactus from "./Contactus";
import { logOut } from '../../lib/firebase';
import { removeFromLocalStorage, getInLocalStorage } from '../../Hooks/localStorage';
import UserMenu from './UserMenu'
import Swal from 'sweetalert2';



interface NavigationItem {
    name: string;
    href: any;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Home', href: '#home', current: true },
    { name: 'Locales', href: '#locales', current: false },
    { name: 'Comentarios', href: '#comentarios', current: false },
    { name: 'Newsletter', href:'#newsletter', current: false },
    { name: 'Sorteo', href:'#sorteo', current: false },
    { name: 'Ubicacion', href:'#ubicacion', current: false },
    { name: 'Contacto', href:'#home', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const userData = getInLocalStorage('USER');
        setUser(userData);
      }, []);

    
      const handleLogOut = () => {
        try {
          Swal.fire({
            icon: 'info',
            title: '¿Está seguro que quiere salir?',
            showCancelButton: true,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              const salir = logOut();
              removeFromLocalStorage('USER');
              setUser(null);
              Swal.fire(salir.message);
            }
          });
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message); // If error is an instance of Error, we can safely access its message
          } else {
            toast.error('An unexpected error occurred'); // Fallback message for unknown error types
          }
        }
      };
      
    
      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
    

    return (
        <Disclosure as="nav" className="bg-lightpink navbar relative z-50">
            <>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-50">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="flex flex-1 md:items-center sm:items-stretch sm:justify-start">

                        {/* DRAWER FOR MOBILE VIEW */}

                        {/* DRAWER ICON */}

                        <div className='block lg:hidden'>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
                        </div>
                        
                            {/* LINKS */}

                            <div className="hidden sm:ml-14 lg:block">
                                <div className="flex space-x-4 md:align-middle">
                                    {navigation.map((item) => (
                                        item.name!=='Contacto'?
                                        <Link key={item.name} href={item.href} className={classNames(item.current ? ' text-purple' : 'hover:text-purple-600', 'px-3 py-4 lg:text-20px md:text-15px font-large space-links' )} aria-current={item.href ? 'page' : undefined} >{item.name.toUpperCase()}</Link>:
                                        <Contactus key={item.name} />
                                    ))}
                                </div>
                            </div>
                        </div>
                            <div className="hidden md:block">
                                <UserMenu user={user} toggleDropdown={toggleDropdown} isDropdownOpen={isDropdownOpen} handleLogOut={handleLogOut} />
                            </div>

                            {/* LOGO */}

                            <div className="flex flex-shrink-0 items-center">
                                    <div className="md:hidden block">
                                        <UserMenu user={user} toggleDropdown={toggleDropdown} isDropdownOpen={isDropdownOpen} handleLogOut={handleLogOut} />
                                    </div>
                                    <img
                                        className="block h-30px w-30px lg:hidden"
                                        src='assets/logo/administracion.webp'
                                        alt="Centro Comercial Logo"
                                        width={70} 
                                        height={70}
                                    />
                                    <img
                                        className="hidden h-48px w-48px lg:block"
                                        src='assets/logo/administracion.webp'
                                        alt="Centro Comercial Logo"
                                        width={70}
                                        height={70} 
                                    />
                            </div>

                        {/* DRAWER LINKS DATA */}

                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>

                    </div>
                </div>
            </>
        </Disclosure>
    )
}

export default Navbar;