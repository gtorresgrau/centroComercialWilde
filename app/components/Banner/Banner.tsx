"use client"
import { userinfo} from '../../Constants/userinfo';
//import Dropdowntwo from './Dropdowntwo';


const Banner = () => {
   
    
    return (
        <main className='banner-image'>
            <section className="relative px-6 lg:px-8">
                <article className="mx-auto max-w-5xl pt-8 sm:pt-12 sm:pb-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-60px md:4px">{userinfo.banner.title}</h1>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-60px md:4px">{userinfo.banner.subTitle}</h2>
                        <p className="mt-6 text-lg leading-8 text-black">{userinfo.banner.slogan}!</p>
                    </div>
                </article> 
              
            </section>
        </main>
    )
}

export default Banner;
