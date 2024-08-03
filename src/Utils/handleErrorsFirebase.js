import Swal from "sweetalert2";
import { toast } from 'react-toastify';


  //Manejo de Errores de Firebase
  export const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        toast.error("Correo Inválido");
        break;
      case "auth/missing-email":
        toast.error("Debe ingresar un Email");
        break;
      case "auth/missing-password":
        toast.error("Debe Ingresar una contraseña");
        break;
      case "auth/invalid-credential":
        toast.error("Credenciales inválidas");
        break;
      case "auth/too-many-requests":
        Swal.fire(
          "Demasiados intentos",
          "Hemos detectado demasiados intentos de inicio de sesión fallidos. Por razones de seguridad, hemos bloqueado temporalmente el acceso. Por favor, inténtalo de nuevo más tarde.",
          "error");
        break;
      case "auth/weak-password":
        toast.error("La contraseña debe tener como mínimo 6 caracteres.");
        break;
      case "auth/email-already-in-use":
        toast.error("El usuario que quiere crear ya existe.");
        break;
      default:
        toast.error("Algo salió mal, vuelva a intentarlo!");
        break;
    }
  };