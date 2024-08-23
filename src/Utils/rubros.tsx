// utils/rubros.ts
import { Local } from '@/src/types/interfaces';

export const fetchRubros = (locales: Local[]) => {
  const rubrosSet = new Set(locales.map((local) => local.rubro));
  const rubrosArray = Array.from(rubrosSet).sort((a, b) => a.localeCompare(b));
  return rubrosArray;
};

export const fetchCategorias = (locales: Local[]) => {
  const categoriasMap = new Map<string, Set<string>>();

  locales.forEach((local) => {
    if (!categoriasMap.has(local.categoria)) {
      categoriasMap.set(local.categoria, new Set());
    }
    categoriasMap.get(local.categoria)?.add(local.rubro);
  });

  const categoriasArray = Array.from(categoriasMap.entries()).map(([categoria, rubrosSet]) => ({
    categoria,
    locales: Array.from(rubrosSet).sort((a, b) => a.localeCompare(b)),
  }));

  categoriasArray.sort((a, b) => a.categoria.localeCompare(b.categoria));

  return categoriasArray;
};
