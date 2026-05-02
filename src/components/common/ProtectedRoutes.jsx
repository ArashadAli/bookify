import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) return <LoadingSpinner fullPage />;
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export default ProtectedRoute;