import { useAuthApi } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useAuthApi();
  
  if(!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' />
  }

  return children;
}

export default ProtectedRoute;