"use client"
import Link from "next/link";
import Contactus from '../Navbar/Contactus';
import RedesSociales from "../Socials/RedesSociales";

// MIDDLE LINKS DATA
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
]

const instagram = "https://www.instagram.com/wildecentrocomercial";
const facebook = "https://www.facebook.com/centrocomercialwilde";
const celular = 1138498249;
const linea = 0

const footer = () => {
    return (
        <footer className="bg-bgpurple -mt-64 " id="first-section" >
            <div className="mx-auto max-w-2xl pt-64 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
                    {/* COLUMN-1 */}
                    <div className='flex flex-col col-span-6 items-center '>
                        <img className=" h-48px w-48px lg:block rounded-xl" src='assets/logo/administracion2.webp' alt="Centro Comercial Logo" width={100} height={100} />
                        <h3 className='text-center text-white text-lg font-medium leading-6 mb-4 lg:mb-6 mt-6'>Que encuentres todo lo que deseas, <br />es nuestra pasión</h3>
                        <RedesSociales instagram={instagram} facebook={facebook} contact={celular} linea={linea}/>
                    </div>
                    {/* CLOUMN-2/3 */}
                    <div className=" flex flex-col group relative col-span-6 items-center">
                        <p className="text-white text-xl font-semibold mb-9 w-fit">Centro Comercial Wilde</p>
                        <div className="flex flex-col items-center md:items-baseline text-offwhite text-sm font-normal space-links">
                            {navigation.map((item) => (
                                <div key={item.name} className="text-offwhite text-sm font-normal mb-6 space-links">
                                    <Link href={item.href} aria-current={item.current ? 'page' : undefined}>{item.name.toUpperCase()}</Link>
                                </div>
                            ))}
                            <Contactus />
                        </div>
                    </div>
                </div>
            </div>
            {/* All Rights Reserved */}
            <div className='pb-20 px-4 flex-col md:flex-row' style={{ display: 'flex', justifyContent:'center', alignItems: 'center' }}>
                <a href="https://programundo.dev">
                    <h3 className='text-center text-offwhite'>2023 - Creado por</h3>
                    <img src='assets/footer/programundo.webp' alt="Programundo" width={200} height={30}  style={{marginLeft: '10px' }} />
                </a>
            </div>
        </footer>
    )
}

export default footer;
