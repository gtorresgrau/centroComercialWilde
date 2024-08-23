import { Local } from "@/src/types/interfaces";

export const filterCat = (data: string, locales: Local[]) => {
   const filtro = locales.filter((local) => local.categoria === data);
   return filtro;
 };
 
 export const filterLocal = (data: string[], locales: Local[]) => {
   const filtro = locales.filter((local) => local.rubro === data.join());
   return filtro;
 };
 