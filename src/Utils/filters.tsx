import { Local } from "../types/interfaces";


export const filterCat = (data: string, locales: Local[]) => {
  try {
    const filtro = locales.filter((local) => local.categoria === data);
    console.log('filtro:',filtro)
    return filtro;
  } catch (error) {
    console.error('message Categoria',error)
  }
};
 
export const filterLocal = (data: string[], locales: Local[]) => {
  try {
    const filtro = locales.filter((local) => local.rubro === data.join());
    console.log('filtro:',filtro)
    return filtro;
  } catch (error) {
    console.error('message Local',error)
    
  }
};
 