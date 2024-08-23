'use client'
import { Local } from '@/src/types/interfaces';

const cachedLocales = localStorage.getItem('locales');  
const local: Local[] = cachedLocales ? JSON.parse(cachedLocales) : [];


//----------------------- Rubros ---------------------

const rubros = local.map((r) => r.rubro); //traigo todos los rubros del json
const uniqueRubros = Array.from(new Set(rubros)); // filtro todos los rubros y lo convierto en array

export const rubrosk = uniqueRubros.map((rubroItem) => { //los convierto en un par:key
  return { name: 'rubro', value: rubroItem };
}).sort((a, b) => a.value.localeCompare(b.value));

//----------------------- Categorias ---------------------

const categories = local.map((cat) => cat.categoria)
const uniqueCategories = Array.from(new Set(categories))

export const categorias = uniqueCategories.map((catItem) => {
  const rubrosSet = new Set<string>(); 
  local
    .filter((item) => item.categoria === catItem)
    .forEach((item) => rubrosSet.add(item.rubro));
  return { categoria: catItem, locales: Array.from(rubrosSet) };
}).sort((a, b) => a.categoria.localeCompare(b.categoria));

