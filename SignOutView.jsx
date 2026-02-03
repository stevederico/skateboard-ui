import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBackendURL, getCSRFToken } from './Utilities';
import { Spinner } from './shadcn/ui/spinner.jsx';

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
        navigate('/signin', { replace: true });
      }
    };

    signOut();
  }, [navigate]);

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
