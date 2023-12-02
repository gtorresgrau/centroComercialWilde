'use client'
<<<<<<< HEAD
import CreateLocal from '../Forms/createLocal'
import { useState } from "react"
=======
>>>>>>> a9d4d80c73282e0f2b165cfbbb04f476a623e114

const admin = () => {
  
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {setIsOpen(false)}
  const openModal = () => {setIsOpen(true)}


  return (
<<<<<<< HEAD
    <section id="comentarios" className=' bg-bgpink'>
        <article className='sm:flex justify-around items-center pb-6'>
            <div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Agregar un Nuevo Local<br /> a nuestro CCW</h2>
            </div>
        </article>
        <CreateLocal />
    </section>
=======
    <>
        <h1>administradores</h1>
        <h2>Suma un nuevo local</h2>

    </>
>>>>>>> a9d4d80c73282e0f2b165cfbbb04f476a623e114
  )
}

export default admin
