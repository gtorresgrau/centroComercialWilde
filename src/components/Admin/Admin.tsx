'use client'
import CreateLocal from '../Forms/createLocal'
import { useState } from "react"

const admin = () => {
  
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {setIsOpen(false)}
  const openModal = () => {setIsOpen(true)}


  return (
    <section id="comentarios" className=' bg-bgpink'>
        <article className='sm:flex justify-around items-center pb-6'>
            <div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">Agregar un Nuevo Local<br /> a nuestro CCW</h2>
            </div>
        </article>
        <CreateLocal />
    </section>
  )
}

export default admin
