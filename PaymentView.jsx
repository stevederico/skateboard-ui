import React, { useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getState } from './Context.jsx';
import { getCurrentUser } from './Utilities.js'

// Whitelist of allowed redirect paths to prevent open redirect vulnerabilities
const ALLOWED_REDIRECT_PREFIXES = ['/app/', '/'];
const DEFAULT_REDIRECT = '/app/home';

function isAllowedRedirect(path) {
  // Must start with allowed prefix and not contain protocol
  if (path.includes('://') || path.includes('//')) return false;
  return ALLOWED_REDIRECT_PREFIXES.some(prefix => path.startsWith(prefix));
}

/**
 * Post-payment redirect handler.
 *
 * Processes Stripe checkout success/cancel/portal return query params,
 * refreshes user data on successful payment, then redirects back to
 * the page the user was on before checkout.
 *
 * @returns {JSX.Element} Redirect loading screen
 *
 * @example
 * // Used internally by createSkateboardApp at /app/payment
 * <Route path="payment" element={<PaymentView />} />
 */
export default function PaymentView() {
  const { state, dispatch } = getState();
  const constants = state.constants;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchUser = useCallback(async () => {
    try {
      const data = await getCurrentUser();
      if (data) {
        dispatch({ type: 'SET_USER', payload: data });
      }
    } catch (error) {
      console.error('Failed to fetch user after payment:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    // Get app-specific localStorage keys
    const appName = constants.appName || 'skateboard';
    const getAppKey = (suffix) => `${appName.toLowerCase().replace(/\s+/g, '-')}_${suffix}`;

    // Get query parameters
    const success = searchParams.get('success') === 'true';
    const canceled = searchParams.get('canceled') === 'true';
    const portal = searchParams.get('portal') === 'return';

    // Default redirect path
    let redirectPath = DEFAULT_REDIRECT;

    // Handle different cases
    switch (true) {
      case success:
        redirectPath = localStorage.getItem(getAppKey('beforeCheckoutURL')) || redirectPath;
        fetchUser();
        break;
      case canceled:
        redirectPath = localStorage.getItem(getAppKey('beforeCheckoutURL')) || redirectPath;
        break;
      case portal:
        redirectPath = localStorage.getItem(getAppKey('beforeManageURL')) || redirectPath;
        break;
      default:
        redirectPath = localStorage.getItem(getAppKey('beforeCheckoutURL')) || redirectPath;
        break;
    }

    // Normalize redirectPath: Strip any full URL to just the pathname
    if (redirectPath.startsWith('http://') || redirectPath.startsWith('https://')) {
      try {
        const url = new URL(redirectPath);
        redirectPath = url.pathname;
      } catch (e) {
        redirectPath = DEFAULT_REDIRECT;
      }
    }

    // Ensure it starts with a '/'
    if (!redirectPath.startsWith('/')) {
      redirectPath = `/${redirectPath}`;
    }

    // Validate redirect path to prevent open redirect
    if (!isAllowedRedirect(redirectPath)) {
      redirectPath = DEFAULT_REDIRECT;
    }

    // Clear the stored URLs
    localStorage.removeItem(getAppKey('beforeCheckoutURL'));
    localStorage.removeItem(getAppKey('beforeManageURL'));

    // Redirect after a delay
    const timeoutId = setTimeout(() => {
      navigate(redirectPath, { replace: true });
    }, 1500);

    // Cleanup timeout
    return () => clearTimeout(timeoutId);
  }, [navigate, searchParams, fetchUser]);





  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium"> Redirecting...</p>
    </div>
  );
}