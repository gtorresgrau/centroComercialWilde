import { Disclosure } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Contactus from "./Contactus";
import logo from '../../../public/assets/logo/administración.png'
import Image from 'next/image';


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
    { name: 'Ubicacion', href:'#ubicacion', current: false },
    { name: 'Contacto', href:'#home', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Disclosure as="nav" className="bg-lightpink navbar relative z-50">
            <>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-50">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="flex flex-1 md:items-center sm:items-stretch sm:justify-start">

                        {/* DRAWER FOR MOBILE VIEW */}

                        {/* DRAWER ICON */}

                        <div className='block md:hidden'>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
                        </div>
                        
                            {/* LINKS */}

                            <div className="hidden sm:ml-14 md:block">
                                <div className="flex space-x-4 md:align-middle">
                                    {navigation.map((item) => (
                                        item.name!=='Contacto'?
                                        <Link key={item.name} href={item.href} className={classNames(item.current ? ' text-purple' : 'hover:text-purple-600', 'px-3 py-4 lg:text-20px md:text-15px font-large space-links' )} aria-current={item.href ? 'page' : undefined} >{item.name.toUpperCase()}</Link>:
                                        <Contactus key={item.name} />
                                    ))}
                                </div>
                            </div>
                        </div>

                            {/* LOGO */}

                            <div className="flex flex-shrink-0 items-center">
                                    <Image
                                        className="block h-30px w-30px lg:hidden"
                                        src={logo}
                                        alt="Centro Comercial Logo"
                                        width={70} 
                                        height={70}
                                    />
                                    <Image
                                        className="hidden h-48px w-48px lg:block"
                                        src={logo}
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