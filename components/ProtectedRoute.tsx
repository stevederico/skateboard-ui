import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { isAuthenticated, apiRequest, getAppKey, getConstants, isAuthOverlayEnabled } from './core/Utilities.js';
import { PageSkeleton } from '../ui/skeleton.js';

/**
 * Route guard that validates authentication before rendering child routes.
 *
 * Checks client-side auth via isAuthenticated(), then validates the
 * session with the backend via /me. Redirects to /signin if invalid.
 * Bypassed for lazy auth (the default) unless constants.authOverlay is false.
 * Bypassed when constants.noLogin is true (no auth required).
 *
 * While checking, renders PageSkeleton inside the layout main content
 * (ProtectedRoute is already nested under Layout / SidebarInset).
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
    const skipProtection = isAuthOverlayEnabled();
    const [status, setStatus] = useState<'checking' | 'valid' | 'invalid'>(skipProtection ? 'valid' : 'checking');

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
        return <PageSkeleton />;
    }

    return status === 'valid' ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
