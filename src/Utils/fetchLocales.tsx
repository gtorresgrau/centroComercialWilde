export const fetchLocales = async () => {
    const cachedLocales = localStorage.getItem('locales');
  
    if (cachedLocales) {
      return JSON.parse(cachedLocales);
    }
  
    const res = await fetch('/api/locales/locales');
    if (!res.ok) {
      throw new Error('Error al cargar los locales');
    }
  
    const data = await res.json();
    localStorage.setItem('locales', JSON.stringify(data.locales));
  
    return data.locales;
  };
  