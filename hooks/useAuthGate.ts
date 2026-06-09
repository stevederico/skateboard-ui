import { useCallback } from 'react';
import { getState } from '../components/core/Context.js';

/**
 * Hook that gates actions behind authentication.
 *
 * If the user is authenticated, the callback runs immediately.
 * If not, the auth overlay is shown and the callback runs after successful auth.
 *
 * @returns {Function} requireAuth - Call with a callback to gate behind auth
 *
 * @example
 * import { useAuthGate } from '@stevederico/skateboard-ui/useAuthGate';
 *
 * function MyComponent() {
 *   const requireAuth = useAuthGate();
 *
 *   function handleSave() {
 *     requireAuth(() => {
 *       saveThing();
 *     });
 *   }
 * }
 */
export function useAuthGate(): (callback: () => void) => void {
  const { state, dispatch } = getState();

  const requireAuth = useCallback((callback: () => void) => {
    if (state.user) {
      callback();
    } else {
      // Run the gated action only after successful auth — not when the user
      // dismisses the overlay (outcome 'cancel').
      dispatch({
        type: 'SHOW_AUTH_OVERLAY',
        payload: (outcome) => { if (outcome !== 'cancel') callback(); },
      });
    }
  }, [state.user, dispatch]);

  return requireAuth;
}
