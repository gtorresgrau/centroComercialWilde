//----------------LocalStorage------------///
'use Client'
// Función para guardar un elemento del localStorage
export const setInLocalStorage = (key,value)=>{
  return localStorage.setItem(key,JSON.stringify(value))
}

// Función para pedir un elemento del localStorage
export const getInLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key));
  }
  return null; // Devuelve null si se llama en el servidor
};

// Función para eliminar un elemento del localStorage
export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

