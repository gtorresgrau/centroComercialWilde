//import Admin from '../../components/Admin/Admin';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const AdminPage = () => {
  return (
      <ProtectedRoute>
        <h1>Hola Soy agregar</h1>
        {/* <Admin /> */}
      </ProtectedRoute>
  )
};

export default AdminPage;
