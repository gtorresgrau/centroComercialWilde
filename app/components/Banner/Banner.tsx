"use client"
import { userinfo} from '../../Constants/userinfo';
import Carrusel from '../Carrusel/Carrusel';


const Banner = () => {
   
    return (
        <main className='banner-image'>
            <section className="items-center relative pb-6 lg:h-screen">
                <article className="mx-auto max-w-5xl pt-8 sm:pt-12 sm:pb-12">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-6">{userinfo.banner.title}</h1>
                        <h2 className="text-3xl sm:text-4xl sm:font-bold tracking-tight text-gray-900 sm:text-60px md:4px my-6">{userinfo.banner.subTitle}</h2>
                    </div>
                </article> 
                <Carrusel />
            </section>
        </main>
    )
}

export default Banner;
