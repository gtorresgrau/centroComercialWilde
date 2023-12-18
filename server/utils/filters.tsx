import locales from '@/src/app/Constants/data.json'

console.log('locales en filters:',locales)

export const filterCat =(data:any)=>{
   const filtro = locales.filter((local) => local.categoria === data);
   return filtro
}

export const filterLocal =(data:any)=>{
   const filtro = locales.filter((local) => local.rubro === data.join());
   return filtro
}
