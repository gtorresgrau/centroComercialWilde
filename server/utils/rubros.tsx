import local from '../../src/app/Constants/data.json'


const rubros = local.map((r) => r.rubro); //traigo todos los rubros del json
const uniqueRubros = Array.from(new Set(rubros)); // filtro todos los rubros y lo convierto en array

export const rubrosk = uniqueRubros.map((rubroItem) => { //los convierto en un par:key
  return { name: 'rubro', value: rubroItem };
});

rubrosk.sort((a, b) => a.value.localeCompare(b.value));



export const rubrosGral = [
  {rubro:'Administracion',locales:['Administracion']},
  {rubro:'Electronica',locales:['Computacion','Venta Celulares']},
  {rubro:'Comida',locales:['Almacen','Carniceria','Fiambreria','Verduleria']},
  {rubro:'Comidas preparadas',locales:['Pasteleria','Pizzeria','Heladeria']},
  {rubro:'Hogar y Oficina',locales:['Bazar','Descartables','Articulos de Limpieza','Ropa Blanca','Tienda Holistica','Libreria',]},
  {rubro:'Servicio',locales:['Consultorios','Estudio Contable', 'Inmobiliaria','Optica','Ortopedia','Seguros']},
  {rubro:'Entretenimiento',locales:['Loteria','Jugueteria']},
  {rubro:'Cuidado Personal',locales:['Peluqieria','Perfumería y Art. de Limpieza.']},
  {rubro:'Indumentaria',locales:['Merceria','Ropa Americana','Ropa Bebe','Ropa Dama','Ropa Hombre','Ropa Infantil']},
  {rubro:'Pet Shop',locales:['Pet Shop']}
]