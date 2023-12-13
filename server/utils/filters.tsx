import locales from '@/src/app/Constants/data.json'

console.log('locales en filters:',locales)

export const filterCat =(data:any)=>{
   const filtro = locales.filter((local) => local.categoria === data);
   return filtro
}
console.log('filterCat en filters:',filterCat)
