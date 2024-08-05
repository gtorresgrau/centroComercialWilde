'use client'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setInLocalStorage } from './localStorage';

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUser(usuarioFirebase);
      if (usuarioFirebase) {
        setInLocalStorage('USER', usuarioFirebase);
      } else {
        localStorage.removeItem('USER'); // Limpiar el almacenamiento local si el usuario no está autenticado
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useUser;
