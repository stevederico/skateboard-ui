import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from './shadcn/ui/dialog.jsx';
import { Input } from './shadcn/ui/input.jsx';
import { Button } from './shadcn/ui/button.jsx';
import { Alert, AlertDescription } from './shadcn/ui/alert.jsx';
import DynamicIcon from './DynamicIcon.jsx';
import { getState } from './Context.jsx';
import { getBackendURL } from './Utilities.js';

/**
 * Modal authentication overlay with sign-in and sign-up forms.
 *
 * Rendered at the app root and controlled via context state.
 * Opens when SHOW_AUTH_OVERLAY is dispatched (typically via useAuthGate).
 * On successful auth, runs the pending callback and closes.
 *
 * @returns {JSX.Element} Auth dialog overlay
 *
 * @example
 * import AuthOverlay from '@stevederico/skateboard-ui/AuthOverlay';
 *
 * // Rendered automatically by createSkateboardApp
 * <AuthOverlay />
 */
export default function AuthOverlay() {
  const { state, dispatch } = getState();
  const constants = state.constants;
  const { visible } = state.authOverlay;

  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstInputRef = useRef(null);

  // Reset form when dialog opens
  useEffect(() => {
    if (visible) {
      setMode('signin');
      setEmail('');
      setPassword('');
      setName('');
      setErrorMessage('');
      setIsSubmitting(false);
    }
  }, [visible]);

  // Focus first input when dialog opens or mode changes
  useEffect(() => {
    if (visible && firstInputRef.current) {
      // Small delay to let dialog animation finish
      const t = setTimeout(() => firstInputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [visible, mode]);

  function handleClose() {
    dispatch({ type: 'HIDE_AUTH_OVERLAY' });
  }

  async function handleSignIn(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${getBackendURL()}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_USER', payload: data });
        dispatch({ type: 'AUTH_OVERLAY_SUCCESS' });
      } else {
        setErrorMessage('Invalid Credentials');
      }
    } catch (error) {
      setErrorMessage('Server Error');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    if (isSubmitting) return;
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    if (password.length > 72) {
      setErrorMessage('Password must be 72 characters or less');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${getBackendURL()}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      if (response.ok) {
        const data = await response.json();
        // Save CSRF token
        const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrf_token='));
        const csrfToken = csrfCookie ? csrfCookie.split('=')[1] : data.csrfToken;
        if (csrfToken) {
          const appName = constants.appName || 'skateboard';
          const csrfKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_csrf`;
          localStorage.setItem(csrfKey, csrfToken);
        }
        dispatch({ type: 'SET_USER', payload: data });
        dispatch({ type: 'AUTH_OVERLAY_SUCCESS' });
      } else {
        setErrorMessage('Invalid Credentials');
      }
    } catch (error) {
      setErrorMessage('Server Error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = "py-7 px-4 placeholder:text-gray-400 rounded-lg border-2 bg-secondary dark:bg-secondary dark:border-secondary";
  const inputStyle = { fontSize: '20px' };

  return (
    <Dialog open={visible} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-lg p-6 overflow-auto max-h-[90vh]">
        <div className="flex flex-col gap-6">
          {/* App branding */}
          <div className="flex flex-row items-center justify-center">
            <div className="bg-app dark:bg-app dark:border dark:border-gray-700 rounded-2xl flex aspect-square size-12 items-center justify-center">
              <DynamicIcon name={constants.appIcon} size={24} color="white" strokeWidth={2} />
            </div>
            <div className="font-bold ml-3 text-3xl text-foreground">{constants.appName}</div>
          </div>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription className="text-center">{errorMessage}</AlertDescription>
            </Alert>
          )}

          {mode === 'signin' ? (
            /* Sign In Form */
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <Input
                ref={firstInputRef}
                id="overlay-email"
                type="email"
                placeholder="Email"
                className={inputClass}
                style={inputStyle}
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
              />
              <Input
                id="overlay-password"
                type="password"
                placeholder="Password"
                className={inputClass}
                style={inputStyle}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="gradient"
                size="cta"
                className="w-full"
                disabled={isSubmitting}
              >
                <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                  <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </span>
              </Button>
              <div className="mt-2 text-center text-base">
                <span className="text-muted-foreground italic">Don't have an account?</span>{' '}
                <Button
                  variant="link"
                  className="p-0 text-base h-auto"
                  onClick={() => { setMode('signup'); setErrorMessage(''); }}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <Input
                ref={firstInputRef}
                id="overlay-name"
                placeholder="Name"
                className={inputClass}
                style={inputStyle}
                required
                value={name}
                onChange={(e) => { setName(e.target.value); setErrorMessage(''); }}
              />
              <Input
                id="overlay-signup-email"
                type="email"
                placeholder="Email"
                className={inputClass}
                style={inputStyle}
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
              />
              <div className="flex flex-col gap-1">
                <Input
                  id="overlay-signup-password"
                  type="password"
                  placeholder="Password"
                  className={inputClass}
                  style={inputStyle}
                  required
                  minLength={6}
                  maxLength={72}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
                />
                <p className="text-xs text-muted-foreground ml-1">Minimum 6 characters</p>
              </div>
              <Button
                type="submit"
                variant="gradient"
                size="cta"
                className="w-full"
                disabled={isSubmitting}
              >
                <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                  <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </span>
              </Button>
              <div className="mt-2 text-center text-base">
                <span className="text-muted-foreground italic">Already have an account?</span>{' '}
                <Button
                  variant="link"
                  className="p-0 text-base h-auto"
                  onClick={() => { setMode('signin'); setErrorMessage(''); }}
                >
                  Sign In
                </Button>
              </div>
              <div className="mt-2 text-center text-sm text-muted-foreground">
                By registering you agree to our
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-4 whitespace-nowrap text-foreground">
                  Terms of Service
                </a>,
                <a href="/eula" target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-4 whitespace-nowrap text-foreground">
                  EULA
                </a>,
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-4 whitespace-nowrap text-foreground">
                  Privacy Policy
                </a>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
