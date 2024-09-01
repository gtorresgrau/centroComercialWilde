export const fetchLocales = async () => {
     if (localStorage.getItem('locales')) {
       // Si existe, eliminarlo
       localStorage.removeItem('locales');}
  
    const res = await fetch('/api/locales/locales');
    if (!res.ok) {
      throw new Error('Error al cargar los locales');
    }
  
    const data = await res.json();
    //  localStorage.setItem('locales', JSON.stringify(data.locales));
    return data.locales;
  };
  