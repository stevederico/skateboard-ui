import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, apiRequest, getAppKey, getConstants } from './Utilities';

const ProtectedRoute = () => {
    const constants = getConstants();
    const skipProtection = constants.noProtectedRoutes === true;
    const [status, setStatus] = useState(skipProtection ? 'valid' : 'checking');

    useEffect(() => {
        if (skipProtection) return;

        if (!isAuthenticated()) {
            setStatus('invalid');
            return;
        }

        // Skip backend validation for noLogin apps
        if (constants.noLogin === true) {
            setStatus('valid');
            return;
        }

        // Validate session with backend
        apiRequest('/me')
            .then(() => setStatus('valid'))
            .catch(() => {
                // Clear stale localStorage data
                const csrfKey = getAppKey('csrf');
                const userKey = getAppKey('user');
                localStorage.removeItem(csrfKey);
                localStorage.removeItem(userKey);
                setStatus('invalid');
            });
    }, []);

    if (status === 'checking') {
        return null;
    }

    return status === 'valid' ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
