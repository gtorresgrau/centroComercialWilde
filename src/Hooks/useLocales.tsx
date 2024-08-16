'use client'
import { useState, useEffect } from 'react';

interface Local {
  local: string;
  n_local: number;
  email: string;
  contacto: string;
  celular: number;
  linea: number | null;
  ubicacion: string;
  categoria: string;
  rubro: string;
  rubroSecundario: string;
  horarios: string;
  logoLocal: string;
  fotoLocal: string;
  instagram: string;
  facebook: string;
  web?:string;
  texto?: string;
}

const useLocales = () => {
  const [locales, setLocales] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLocales = async () => {
    const res = await fetch('/api/locales/locales');
    if (!res.ok) {
      throw new Error('Error al cargar los locales');
    }
    const data = await res.json();
    return data.locales;
  };

  useEffect(() => {
    const loadLocales = async () => {
      try {
        const storedLocales = localStorage.getItem('locales');
        if (storedLocales) {
          setLocales(JSON.parse(storedLocales));
        } else {
          const fetchedLocales = await fetchLocales();
          setLocales(fetchedLocales);
          localStorage.setItem('locales', JSON.stringify(fetchedLocales));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los locales: ', error);
        setLoading(false);
      }
    };

    loadLocales();
  }, []);

  return { locales, loading, setLocales };
};

export default useLocales;
