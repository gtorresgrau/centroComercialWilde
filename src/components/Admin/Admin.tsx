'use client'
import Locales from "@/src/components/Locales/Locales"
import CreateLocal from '../Forms/createLocal'

const admin = () => {
  return (
    <>
        <h1>administradores</h1>
        <h2>Suma un nuevo local</h2>
        <CreateLocal />

    </>
  )
}

export default admin
