"use client"
import { userinfo} from '../../Constants/userinfo';
import Carrusel from '../Carrusel/Carrusel';


const Banner = () => {
   
    return (
        <main className='banner-image'>
            <section className="relative pb-6" style={{height:'100vh'}}>
                <article className="mx-auto max-w-5xl pt-8 sm:pt-12 sm:pb-12">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">{userinfo.banner.title}</h1>
                        <h1 className="text-3xl sm:text-4xl sm:font-bold tracking-tight text-gray-900 sm:text-60px md:4px">{userinfo.banner.subTitle}</h1>
                    </div>
                </article> 
                <Carrusel />
            </section>
        </main>
    )
}

export default Banner;
