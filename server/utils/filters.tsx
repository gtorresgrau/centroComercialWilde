export const filterCat = (data: any) => {
   const cachedLocales = localStorage.getItem('locales');
   if (!cachedLocales) return []; // Manejar el caso en que no haya locales en localStorage
 
   const locales = JSON.parse(cachedLocales);
   const filtro = locales.filter((local: any) => local.categoria === data);
   return filtro;
 };
 
 export const filterLocal = (data: any) => {
   const cachedLocales = localStorage.getItem('locales');
   if (!cachedLocales) return []; // Manejar el caso en que no haya locales en localStorage
 
   const locales = JSON.parse(cachedLocales);
   const filtro = locales.filter((local: any) => local.rubro === data.join());
   return filtro;
 };
 