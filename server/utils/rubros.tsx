import local from '../../src/app/Constants/data.json'


const rubros = local.map((r) => r.rubro); //traigo todos los rubros del json
const uniqueRubros = Array.from(new Set(rubros)); // filtro todos los rubros y lo convierto en array

export const rubrosk = uniqueRubros.map((rubroItem) => { //los convierto en un par:key
  return { name: 'rubro', value: rubroItem };
});

rubrosk.sort((a, b) => a.value.localeCompare(b.value));



export const categorias = [
  {categoria:'Administracion',locales:['Administracion']},
  {categoria:'Electronica',locales:['Computacion','Venta Celulares']},
  {categoria:'Comida',locales:['Almacen','Carniceria','Fiambreria','Verduleria']},
  {categoria:'Comidas preparadas',locales:['Pasteleria','Pizzeria','Heladeria']},
  {categoria:'Hogar y Oficina',locales:['Bazar','Descartables','Articulos de Limpieza','Ropa Blanca','Tienda Holistica','Libreria',]},
  {categoria:'Servicio',locales:['Consultorios','Estudio Contable', 'Inmobiliaria','Optica','Ortopedia','Seguros']},
  {categoria:'Entretenimiento',locales:['Loteria','Jugueteria']},
  {categoria:'Cuidado Personal',locales:['Peluqieria','Perfumería y Art. de Limpieza.']},
  {categoria:'Indumentaria',locales:['Merceria','Ropa Americana','Ropa Bebe','Ropa Dama','Ropa Hombre','Ropa Infantil']},
  {categoria:'Pet Shop',locales:['Pet Shop']}
]