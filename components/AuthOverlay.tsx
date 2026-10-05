import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog.js';
import ConstantsIcon from './core/constantsIcon.js';
import { getState } from './core/Context.js';
import SignInView from './views/SignInView.js';
import SignUpView from './views/SignUpView.js';
import type { AuthOverlayOutcome } from './core/Context.js';

const HAD_ACCOUNT_KEY = 'skateboard_had_account';

function hadAccount(): boolean {
  try { return localStorage.getItem(HAD_ACCOUNT_KEY) === '1'; } catch { return false; }
}

/**
 * Modal authentication overlay with sign-in and sign-up forms.
 *
 * Rendered at the app root and controlled via context state.
 * Opens when SHOW_AUTH_OVERLAY is dispatched (typically via useAuthGate).
 * On successful auth, runs the pending callback and closes. Opens on Sign Up,
 * or on Sign In when this device has been signed in before.
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

  const [mode, setMode] = useState<'signin' | 'signup'>('signup');

  // Remember that this device has had an account
  useEffect(() => {
    if (state.user) {
      try { localStorage.setItem(HAD_ACCOUNT_KEY, '1'); } catch { /* storage blocked */ }
    }
  }, [state.user]);

  // Most visitors are new: open on Sign Up, or Sign In if this device has signed in before
  useEffect(() => {
    if (visible) {
      setMode(hadAccount() ? 'signin' : 'signup');
    }
  }, [visible]);

  // Invoke parked 401 retries (apiRequest, Utilities.js) here in event handlers —
  // not in the reducer, which must stay pure. Each callback settles the awaiting
  // apiRequest promise: 'success' retries the request, 'cancel' rejects it so a
  // dismissed overlay never leaves a caller hanging.
  function runPendingCallbacks(outcome: AuthOverlayOutcome) {
    for (const cb of state.authOverlay.pendingCallbacks) {
      try { cb(outcome); } catch (e) { console.error('Auth callback error:', e); }
    }
  }

  function handleClose() {
    runPendingCallbacks('cancel');
    dispatch({ type: 'HIDE_AUTH_OVERLAY' });
  }

  function handleSuccess() {
    runPendingCallbacks('success');
    dispatch({ type: 'AUTH_OVERLAY_SUCCESS' });
  }

  return (
    <Dialog open={visible} onOpenChange={(open: boolean) => { if (!open) handleClose(); }}>
      <DialogContent>
        <DialogHeader className="items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-app rounded-2xl flex aspect-square size-10 items-center justify-center">
              <ConstantsIcon name={constants.appIcon} size={20} color="white" strokeWidth={2} />
            </div>
            <span className="text-2xl font-bold">{constants.appName}</span>
          </div>
          <DialogTitle className="sr-only">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</DialogTitle>
        </DialogHeader>

        {mode === 'signin' ? (
          <SignInView
            embedded
            onSuccess={handleSuccess}
            onSwitchMode={() => setMode('signup')}
          />
        ) : (
          <SignUpView
            embedded
            onSuccess={handleSuccess}
            onSwitchMode={() => setMode('signin')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
