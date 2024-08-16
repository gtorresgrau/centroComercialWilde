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

export const filterCat = (data: string, locales: Local[]) => {
   const filtro = locales.filter((local) => local.categoria === data);
   return filtro;
 };
 
 export const filterLocal = (data: string[], locales: Local[]) => {
   const filtro = locales.filter((local) => local.rubro === data.join());
   return filtro;
 };
 