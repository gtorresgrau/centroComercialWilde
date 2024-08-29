import Admin from '../../components/Admin/Admin';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const AgregarLocalPage = () => {
  return (
      <ProtectedRoute>
        {/* <h1>Hola Soy Admin</h1> */}
        <Admin />
      </ProtectedRoute>
  )
};

export default AgregarLocalPage;
