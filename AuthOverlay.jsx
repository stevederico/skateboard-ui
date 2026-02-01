import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from './shadcn/ui/dialog.jsx';
import { Input } from './shadcn/ui/input.jsx';
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

  const buttonGradient = `linear-gradient(to bottom right,
    var(--color-app),
    oklch(from var(--color-app) calc(l - 0.05) c h),
    oklch(from var(--color-app) calc(l - 0.08) c h),
    oklch(from var(--color-app) calc(l - 0.12) c h))`;

  const buttonGradientHover = `linear-gradient(to bottom right,
    oklch(from var(--color-app) calc(l - 0.05) c h),
    oklch(from var(--color-app) calc(l - 0.08) c h),
    oklch(from var(--color-app) calc(l - 0.12) c h),
    oklch(from var(--color-app) calc(l - 0.16) c h))`;

  const buttonShadow = '0 25px 50px -12px color-mix(in srgb, var(--color-app) 40%, transparent 60%)';

  return (
    <Dialog open={visible} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-lg p-6 overflow-auto max-h-[90vh]">
        <div className="flex flex-col gap-6">
          {/* App branding */}
          <div className="flex flex-row items-center justify-center">
            <div className="bg-app dark:bg-app dark:border dark:border-gray-700 rounded-2xl flex aspect-square size-12 items-center justify-center">
              <DynamicIcon name={constants.appIcon} size={24} color="white" strokeWidth={2} />
            </div>
            <div className="font-bold ml-3 text-3xl text-gray-900 dark:text-white">{constants.appName}</div>
          </div>

          {errorMessage && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm text-center">
              {errorMessage}
            </div>
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
              <button
                type="submit"
                className="relative group w-full text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl backdrop-blur-sm overflow-hidden cursor-pointer"
                disabled={isSubmitting}
                style={{ backgroundImage: buttonGradient, boxShadow: buttonShadow }}
                onMouseEnter={(e) => { if (!isSubmitting) { e.currentTarget.style.backgroundImage = buttonGradientHover; } }}
                onMouseLeave={(e) => { if (!isSubmitting) { e.currentTarget.style.backgroundImage = buttonGradient; } }}
              >
                <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                  <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 skew-x-12"></div>
              </button>
              <div className="mt-2 text-center text-base">
                <span className="text-gray-600 dark:text-gray-400 italic">Don't have an account?</span>{' '}
                <span
                  onClick={() => { setMode('signup'); setErrorMessage(''); }}
                  className="cursor-pointer hover:underline text-gray-900 dark:text-white"
                >
                  Sign Up
                </span>
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
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">Minimum 6 characters</p>
              </div>
              <button
                type="submit"
                className="relative group w-full text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl backdrop-blur-sm overflow-hidden cursor-pointer"
                disabled={isSubmitting}
                style={{ backgroundImage: buttonGradient, boxShadow: buttonShadow }}
                onMouseEnter={(e) => { if (!isSubmitting) { e.currentTarget.style.backgroundImage = buttonGradientHover; } }}
                onMouseLeave={(e) => { if (!isSubmitting) { e.currentTarget.style.backgroundImage = buttonGradient; } }}
              >
                <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                  <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
                  {isSubmitting ? 'Signing up...' : 'Sign Up'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 skew-x-12"></div>
              </button>
              <div className="mt-2 text-center text-base">
                <span className="text-gray-600 dark:text-gray-400 italic">Already have an account?</span>{' '}
                <span
                  onClick={() => { setMode('signin'); setErrorMessage(''); }}
                  className="cursor-pointer hover:underline text-gray-900 dark:text-white"
                >
                  Sign In
                </span>
              </div>
              <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                By registering you agree to our
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-4 whitespace-nowrap text-gray-900 dark:text-white">
                  Terms of Service
                </a>,
                <a href="/eula" target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-4 whitespace-nowrap text-gray-900 dark:text-white">
                  EULA
                </a>,
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="ml-1 underline underline-offset-4 whitespace-nowrap text-gray-900 dark:text-white">
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
