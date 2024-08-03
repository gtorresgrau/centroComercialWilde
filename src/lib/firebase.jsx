import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../pages/api/firebase'; 

//------------------ Auth--------------------///

// Función para iniciar sesión con usuario y contraseña
export const signIn = async(data)=>{
    const {email, contraseña} = data
    return await signInWithEmailAndPassword(auth, email, contraseña);
}

// Función para cerrar sesión
export const logOut = () =>{
    signOut(auth);
    return {message:'Cerro la sesion exitosamente'};
}

// // Función para crear usuario
// export const createUser = async(data) =>{
//     const {email, contraseña} = data
//     return await createUserWithEmailAndPassword(auth, email, contraseña);
// }

// // Función para actualizar el perfil del usuario
// export const updateUser = async (user) =>{
//     if(auth.currentUser) return updateProfile(auth.currentUser, user)
// }


// // Función para iniciar sesión con Google
// export const singnInWithGoogle = async () => {
//     const googleProvider = new GoogleAuthProvider();
//     return await signInWithPopup(auth, googleProvider)
// }