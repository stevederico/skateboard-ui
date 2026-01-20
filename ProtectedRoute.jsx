import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, apiRequest, getAppKey, getConstants } from './Utilities';

const ProtectedRoute = () => {
    const [status, setStatus] = useState('checking'); // 'checking' | 'valid' | 'invalid'

    useEffect(() => {
        if (!isAuthenticated()) {
            setStatus('invalid');
            return;
        }

        // Skip backend validation for noLogin apps
        if (getConstants().noLogin === true) {
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
        return null; // Or a loading spinner
    }

    return status === 'valid' ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
