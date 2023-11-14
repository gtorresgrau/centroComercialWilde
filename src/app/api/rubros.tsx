require('dotenv').config();
import {connectDB} from '../../../lib/db';

connectDB();

console.log('connectDB:',connectDB)

import local from '../Constants/data.json'


const rubros = local.map((r) => r.rubro); //traigo todos los rubros del json
const uniqueRubros = Array.from(new Set(rubros)); // filtro todos los rubros y lo convierto en array

export const rubrosk = uniqueRubros.map((rubroItem) => { //los convierto en un par:key
  return { name: 'rubro', value: rubroItem };
});

rubrosk.sort((a, b) => a.value.localeCompare(b.value));

// const rubros = MONGODB.map((r) => r.rubro); //traigo todos los rubros del json
// const uniqueRubros = Array.from(new Set(rubros)); // filtro todos los rubros y lo convierto en array

// export const rubrosk = uniqueRubros.map((rubroItem) => { //los convierto en un par:key
//   return { name: 'rubro', value: rubroItem };
// });

// rubrosk.sort((a, b) => a.MONGODB.localeCompare(b.value));