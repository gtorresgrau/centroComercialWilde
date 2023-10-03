"use client"
import Dropdownone from './Dropdownone';
import Dropdowntwo from './Dropdowntwo';


const Banner = () => {
    return (
        <main className='banner-image'>
            <section className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl pt-8 sm:pt-20 sm:pb-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-60px md:4px">CENTRO COMERCIAL WILDE</h1>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-60px md:4px">Tu paseo de compras favorito</h2>
                        <p className="mt-6 text-lg leading-8 text-black">Todo lo que necesitas esta aca!</p>
                    </div>
                </div> 
                {/* DROPDOWN BUTTONS */}
                <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow"> 
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                        <div className="col-span-3">
                            <Dropdownone />
                        </div>
                        <div className="col-span-3">
                            <Dropdowntwo />
                        </div>
                        <div className="col-span-3 sm:col-span-2 mt-2">
                            <button className="bg-purple w-full hover:bg-pruple text-white font-bold py-4 px-3 rounded">BUSCAR</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Banner;
