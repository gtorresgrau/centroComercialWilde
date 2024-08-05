'use client'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useUser from '../../Hooks/useUser';
import { getInLocalStorage } from '../../Hooks/localStorage';
import NotFoundPage from '../../app/not-found';
import Loading from '../Loading/Loading';


const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)  
  const user = useUser();
  const userAdmin = getInLocalStorage('USER')
  const router = useRouter();
  const pathName = usePathname();
  
  const protectedRoutes = ['/admin'];
  const authRoutes = ['/Login'];
  
  const isInProtectedRoute = protectedRoutes.includes(pathName);
  const isInAuthRoute = authRoutes.includes(pathName);
  const isUnknownRoute = !isInProtectedRoute && !isInAuthRoute && pathName !== '/';

  useEffect(() => {
 if (isInAuthRoute && userAdmin) {
      // Redirigir a /Admin si el usuario está logueado e intenta acceder a una ruta de autenticación
      setIsLoading(false)
      router.push('/admin');
      
    } 
    setIsLoading(false)
  }, [user, isInProtectedRoute, isInAuthRoute, isUnknownRoute, router]);

  if (isUnknownRoute || (isInProtectedRoute && !userAdmin)) {
    return isLoading? <Loading ancho='120px' alto='120px' /> :<NotFoundPage />
  }

  return isLoading? <Loading ancho='120px' alto='120px' />:children;
};

export default ProtectedRoute;
