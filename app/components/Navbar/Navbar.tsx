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
    { name: 'Testimonial', href: '#testimonial-section', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Disclosure as="nav" className="bg-lightpink navbar">
            <>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="flex flex-1 md:items-center sm:items-stretch sm:justify-start">

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

                            {/* LINKS */}

                            <div className="hidden sm:ml-14 md:block">
                                <div className="flex space-x-4 md:align-middle">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? ' text-purple' : 'hover:text-purple',
                                                'px-3 py-4 text-15px font-medium space-links'
                                            )}
                                            aria-current={item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Contactus />
                                </div>
                            </div>
                        </div>
                        {/* DRAWER FOR MOBILE VIEW */}

                        {/* DRAWER ICON */}

                        <div className='block md:hidden'>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsOpen(true)} />
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
