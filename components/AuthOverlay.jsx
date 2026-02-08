import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../shadcn/ui/dialog.jsx';
import DynamicIcon from '../core/DynamicIcon.jsx';
import { getState } from '../core/Context.jsx';
import SignInView from '../views/SignInView.jsx';
import SignUpView from '../views/SignUpView.jsx';

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

  // Reset mode when dialog opens
  useEffect(() => {
    if (visible) {
      setMode('signin');
    }
  }, [visible]);

  function handleClose() {
    dispatch({ type: 'HIDE_AUTH_OVERLAY' });
  }

  function handleSuccess() {
    dispatch({ type: 'AUTH_OVERLAY_SUCCESS' });
  }

  return (
    <Dialog open={visible} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent>
        <DialogHeader className="items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-app rounded-2xl flex aspect-square size-10 items-center justify-center">
              <DynamicIcon name={constants.appIcon} size={20} color="white" strokeWidth={2} />
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
