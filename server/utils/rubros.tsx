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
  web?: string; 
  texto?: string;
}
//----------------------- Rubros ---------------------

// Intenta obtener los locales almacenados en localStorage y parsearlos
let locales: Local[] = [];

try {
  const storedLocales = localStorage.getItem('locales');
  if (storedLocales) {
    locales = JSON.parse(storedLocales);
  }
} catch (error) {
  console.error("Error parsing locales from localStorage", error);
}

// Asegúrate de que `locales` es un array antes de continuar
if (!Array.isArray(locales)) {
  locales = []; // O maneja esto de la forma que mejor se adapte a tu caso
}

// Extrae y organiza los rubros
const rubros = locales.map((r) => r.rubro); // Trae todos los rubros del json
const uniqueRubros = Array.from(new Set(rubros)); // Filtra todos los rubros y los convierte en array

export const rubrosk = uniqueRubros.map((rubroItem) => { // Los convierte en un par:key
  return { name: 'rubro', value: rubroItem };
}).sort((a, b) => a.value.localeCompare(b.value));

//----------------------- Categorias ---------------------

// Extrae y organiza las categorías
const categories = locales.map((cat) => cat.categoria);
const uniqueCategories = Array.from(new Set(categories));

export const categorias = uniqueCategories.map((catItem) => {
  const rubrosSet = new Set<string>(); 
  locales
    .filter((item) => item.categoria === catItem)
    .forEach((item) => rubrosSet.add(item.rubro));
  return { categoria: catItem, locales: Array.from(rubrosSet) };
}).sort((a, b) => a.categoria.localeCompare(b.categoria));
