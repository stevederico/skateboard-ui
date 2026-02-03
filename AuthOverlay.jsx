import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './shadcn/ui/dialog.jsx';
import { Input } from './shadcn/ui/input.jsx';
import { Label } from './shadcn/ui/label.jsx';
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

  return (
    <Dialog open={visible} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent>
        {/* Branding */}
        <DialogHeader className="items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-app rounded-2xl flex aspect-square size-10 items-center justify-center">
              <DynamicIcon name={constants.appIcon} size={20} color="white" strokeWidth={2} />
            </div>
            <span className="text-2xl font-bold">{constants.appName}</span>
          </div>
          <DialogTitle>{mode === 'signin' ? 'Welcome back' : 'Create an account'}</DialogTitle>
          <DialogDescription>
            {mode === 'signin' ? 'Sign in to your account' : 'Enter your details to get started'}
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription className="text-center">{errorMessage}</AlertDescription>
          </Alert>
        )}

        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="overlay-email">Email</Label>
              <Input
                ref={firstInputRef}
                id="overlay-email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="overlay-password">Password</Label>
              <Input
                id="overlay-password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </span>
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account?</span>{' '}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => { setMode('signup'); setErrorMessage(''); }}
              >
                Sign Up
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="overlay-name">Name</Label>
              <Input
                ref={firstInputRef}
                id="overlay-name"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => { setName(e.target.value); setErrorMessage(''); }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="overlay-signup-email">Email</Label>
              <Input
                id="overlay-signup-email"
                type="email"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="overlay-signup-password">Password</Label>
              <Input
                id="overlay-signup-password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                maxLength={72}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
              />
              <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
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
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>{' '}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => { setMode('signin'); setErrorMessage(''); }}
              >
                Sign In
              </Button>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              By registering you agree to our{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">Terms of Service</a>,{" "}
              <a href="/eula" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">EULA</a>,{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</a>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
