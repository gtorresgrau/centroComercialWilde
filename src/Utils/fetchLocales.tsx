export const fetchLocales = async () => {
    const res = await fetch('/api/locales/locales');
    if (!res.ok) {
      throw new Error('Error al cargar los locales');
    }
    const data = await res.json();
    return data.locales;
  };
  