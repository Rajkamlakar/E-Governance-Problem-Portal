import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ProtectedRoute = ({ children, officerOnly = false }) => {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (officerOnly && user.role !== 'officer') {
    return <Navigate to="/citizen" replace />;
  }

  return children;
};

export default ProtectedRoute;