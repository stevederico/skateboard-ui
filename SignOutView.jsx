import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBackendURL } from '@stevederico/skateboard-ui/Utilities';
import constants from '@/constants.json';

function SignOutView() {
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      try {
        // Call backend signout endpoint
        await fetch(`${getBackendURL()}/signout`, {
          method: 'POST',
          credentials: 'include'
        });
      } catch (error) {
        console.error('Sign out error:', error);
      } finally {
        // Clear CSRF token from localStorage
        const appName = constants.appName || 'piglet';
        const csrfKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_csrf`;
        localStorage.removeItem(csrfKey);

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
