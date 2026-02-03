import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, apiRequest, getAppKey, getConstants } from './Utilities';
import { Spinner } from './shadcn/ui/spinner.jsx';

/**
 * Route guard that validates authentication before rendering child routes.
 *
 * Checks client-side auth via isAuthenticated(), then validates the
 * session with the backend via /me. Redirects to /signin if invalid.
 * Bypassed when constants.authOverlay is true (for lazy auth).
 * Bypassed when constants.noLogin is true (no auth required).
 *
 * @returns {JSX.Element} Outlet if authenticated, Navigate to /signin otherwise
 *
 * @example
 * import ProtectedRoute from '@stevederico/skateboard-ui/ProtectedRoute';
 *
 * <Route path="/app" element={<ProtectedRoute />}>
 *   <Route path="home" element={<HomeView />} />
 * </Route>
 */
const ProtectedRoute = () => {
    const constants = getConstants();
    const skipProtection = constants.authOverlay === true;
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
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Spinner className="size-6" />
            </div>
        );
    }

    return status === 'valid' ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
