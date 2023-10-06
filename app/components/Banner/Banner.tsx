"use client"
import Dropdownone from './Dropdownone';
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
                {/* DROPDOWN BUTTONS */}
                <article className="mx-auto max-w-4xl mt-8 pt-4 pb-4 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow"> 
                    <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                        <div className="col-span-4"><Dropdownone /></div>
                        {/* <div className="col-span-3"><Dropdowntwo /></div> */}
                        <div className="col-span-3 sm:col-span-2 mt-2">
                            <button className="bg-purple w-full hover:bg-pruple text-white font-bold py-4 px-3 rounded">{userinfo.banner.button}</button>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default Banner;
