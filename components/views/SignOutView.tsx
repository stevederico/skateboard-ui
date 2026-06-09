import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getBackendURL, getCSRFToken } from '../core/Utilities.js';
import { useDispatch } from '../core/Context.js';
import { Spinner } from '../../shadcn/ui/spinner.js';

/**
 * Sign-out handler page.
 *
 * Calls POST /signout on mount to clear the server session and local user
 * state, then redirects to the landing page ("/").
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
  const dispatch = useDispatch();

  useEffect(() => {
    const signOut = async () => {
      try {
        const csrfToken = getCSRFToken();
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
        dispatch({ type: 'CLEAR_USER' });
        navigate('/', { replace: true });
      }
    };

    signOut();
  }, [navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-6" />
        <p className="text-sm text-muted-foreground">Signing out...</p>
      </div>
    </div>
  );
}

export default SignOutView;
