import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './Utilities';

const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
