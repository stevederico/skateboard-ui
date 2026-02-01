import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBackendURL, getCSRFToken } from './Utilities';

/**
 * Sign-out handler page.
 *
 * Calls POST /signout on mount to clear the server session,
 * then redirects to /signin.
 *
 * @returns {JSX.Element} Sign-out loading screen
 *
 * @example
 * import SignOutView from '@stevederico/skateboard-ui/SignOutView';
 *
 * <Route path="/signout" element={<SignOutView />} />
 */
function SignOutView() {
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      try {
        const csrfToken = getCSRFToken();
        // Call backend signout endpoint
        await fetch(`${getBackendURL()}/signout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(csrfToken && { 'X-CSRF-Token': csrfToken })
          }
        });
      } catch (error) {
        console.error('Sign out error:', error);
      } finally {
        // CSRF cookie is cleared by backend, no localStorage cleanup needed
        // Redirect to sign in
        navigate('/signin', { replace: true });
      }
    };

    signOut();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-xl">Signing out...</div>
      </div>
    </div>
  );
}

export default SignOutView;
