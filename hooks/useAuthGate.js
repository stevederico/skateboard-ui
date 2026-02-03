import { useCallback } from 'react';
import { getState } from '../core/Context.jsx';

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
export function useAuthGate() {
  const { state, dispatch } = getState();

  const requireAuth = useCallback((callback) => {
    if (state.user) {
      callback();
    } else {
      dispatch({ type: 'SHOW_AUTH_OVERLAY', payload: callback });
    }
  }, [state.user, dispatch]);

  return requireAuth;
}
