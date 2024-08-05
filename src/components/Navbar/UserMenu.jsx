import React from 'react'
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const UserMenu = ({user,toggleDropdown,isDropdownOpen,handleLogOut}) => {
    
    const router = useRouter();
    const handleAdminRedirect = () => {
        router.push('/admin');
        toggleDropdown()
    };

  return (
    <>
            {user ? (
              <div className="relative z-50">
                <button className="inline-flex items-center w-8 h-8 justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl" onClick={toggleDropdown} title={user.displayName} aria-label="menu usuario">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="rounded-full w-8 h-8" title={user.displayName} loading='lazy'/>
                  ) : (
                    <FaUser />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                    <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={handleAdminRedirect} aria-label="administrador">
                      Administrador
                    </button>
                    <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={handleLogOut} aria-label="cerrar sesion">
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : null}
    </>
  )
}

export default UserMenu