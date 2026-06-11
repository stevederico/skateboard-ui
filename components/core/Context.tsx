import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { SkateboardConstants, User } from './Utilities.js';

/** Outcome passed to parked auth-overlay callbacks when the overlay settles. */
export type AuthOverlayOutcome = 'success' | 'cancel';

/** Callback parked by SHOW_AUTH_OVERLAY, invoked by AuthOverlay on settle. */
export type AuthOverlayCallback = (outcome: AuthOverlayOutcome) => void;

/** Global skateboard-ui state shape held by ContextProvider. */
export interface AppState {
  user: User | null;
  ui: {
    sidebarVisible: boolean;
    tabBarVisible: boolean;
  };
  authOverlay: {
    visible: boolean;
    pendingCallbacks: AuthOverlayCallback[];
  };
  constants: SkateboardConstants;
}

/** Actions accepted by the skateboard-ui reducer. */
export type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' }
  | { type: 'SET_SIDEBAR_VISIBLE'; payload: boolean }
  | { type: 'SET_TABBAR_VISIBLE'; payload: boolean }
  | { type: 'SET_UI_VISIBILITY'; payload: { sidebarVisible?: boolean; tabBarVisible?: boolean } }
  | { type: 'SHOW_AUTH_OVERLAY'; payload?: AuthOverlayCallback }
  | { type: 'HIDE_AUTH_OVERLAY' }
  | { type: 'AUTH_OVERLAY_SUCCESS' };

/** Value provided by ContextProvider: { state, dispatch }. */
export interface ContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const context = createContext<ContextValue | undefined>(undefined);

/**
 * Internal hook: read the skateboard context and fail loudly when the
 * provider is missing, instead of letting callers destructure undefined.
 *
 * @throws {Error} If called outside a ContextProvider
 */
function useSkateboardContext(): ContextValue {
  const ctx = useContext(context);
  if (!ctx) throw new Error('skateboard-ui components must be rendered inside ContextProvider (createSkateboardApp does this automatically)');
  return ctx;
}

// Store dispatch reference for programmatic access outside components
let _dispatch: React.Dispatch<Action> | null = null;

/**
 * Get dispatch function for programmatic state updates outside components.
 *
 * Useful for updating state from non-React code (event handlers, utilities).
 * Returns null if ContextProvider hasn't mounted yet.
 *
 * @returns {Function|null} Dispatch function or null
 *
 * @example
 * import { getDispatch } from '@stevederico/skateboard-ui/Context';
 *
 * const dispatch = getDispatch();
 * if (dispatch) {
 *   dispatch({ type: 'CLEAR_USER' });
 * }
 */
export function getDispatch(): React.Dispatch<Action> | null {
  return _dispatch;
}

// Check if localStorage is available
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn('localStorage not available:', e instanceof Error ? e.message : String(e));
    return false;
  }
}

// Safe localStorage operations for Context
function safeLSSetItem(key: string, value: string): boolean {
  if (!isLocalStorageAvailable()) {
    console.warn(`Could not save to localStorage: ${key}`);
    return false;
  }
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('localStorage setItem error:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

function safeLSGetItem(key: string): string | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('localStorage getItem error:', error instanceof Error ? error.message : String(error));
    return null;
  }
}

function safeLSRemoveItem(key: string): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('localStorage removeItem error:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

/**
 * Global state provider for skateboard-ui.
 *
 * Manages user authentication state and UI visibility (sidebar, tabbar).
 * Persists user data to localStorage using app-specific keys.
 *
 * @param {Object} props
 * @param {Object} props.constants - App configuration
 * @param {string} props.constants.appName - Used for localStorage key namespacing
 * @param {React.ReactNode} props.children - Child components
 *
 * @example
 * import { ContextProvider } from '@stevederico/skateboard-ui/Context';
 *
 * <ContextProvider constants={constants}>
 *   <App />
 * </ContextProvider>
 */
export interface ContextProviderProps {
  children?: React.ReactNode;
  constants: SkateboardConstants;
}

export function ContextProvider({ children, constants }: ContextProviderProps) {
  const getStorageKey = () => {
    const appName = constants.appName || 'skateboard';
    return `${appName.toLowerCase().replace(/\s+/g, '-')}_user`;
  };

  const getInitialUser = (): User | null => {
    try {
      const storageKey = getStorageKey();
      const storedUser = safeLSGetItem(storageKey);
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch (e) {
      console.error('Error parsing user data:', e instanceof Error ? e.message : String(e));
      return null;
    }
  };

  const initialState: AppState = {
    user: getInitialUser(),
    ui: {
      sidebarVisible: true,
      tabBarVisible: true
    },
    authOverlay: {
      visible: false,
      pendingCallbacks: []
    },
    constants
  };

  function reducer(state: AppState, action: Action): AppState {
    const storageKey = getStorageKey();

    switch (action.type) {
      case 'SET_USER': {
        try {
          const success = safeLSSetItem(storageKey, JSON.stringify(action.payload));
          if (!success) {
            console.error('Failed to persist user data to localStorage');
          }
        } catch (error) {
          console.error('Error setting user:', error instanceof Error ? error.message : String(error));
        }
        return { ...state, user: action.payload };
      }
      case 'CLEAR_USER': {
        // Clean up user data (CSRF cookie is cleared by backend)
        safeLSRemoveItem(storageKey);
        return { ...state, user: null };
      }
      case 'SET_SIDEBAR_VISIBLE': {
        return { ...state, ui: { ...state.ui, sidebarVisible: action.payload } };
      }
      case 'SET_TABBAR_VISIBLE': {
        return { ...state, ui: { ...state.ui, tabBarVisible: action.payload } };
      }
      case 'SET_UI_VISIBILITY': {
        return { ...state, ui: { ...state.ui, ...action.payload } };
      }
      case 'SHOW_AUTH_OVERLAY': {
        return { ...state, authOverlay: { visible: true, pendingCallbacks: action.payload ? [...state.authOverlay.pendingCallbacks, action.payload] : state.authOverlay.pendingCallbacks } };
      }
      case 'HIDE_AUTH_OVERLAY': {
        return { ...state, authOverlay: { visible: false, pendingCallbacks: [] } };
      }
      case 'AUTH_OVERLAY_SUCCESS': {
        // Pure state transition only. The parked retries are invoked by
        // AuthOverlay's event handlers, never here — React may double-invoke this
        // reducer (StrictMode) or discard its result (concurrent renders).
        return { ...state, authOverlay: { visible: false, pendingCallbacks: [] } };
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // Store dispatch reference for programmatic access
  useEffect(() => {
    _dispatch = dispatch;
    return () => { _dispatch = null; };
  }, [dispatch]);

  return (
    <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  );
}

/**
 * Hook to access skateboard-ui state.
 *
 * Returns { state, dispatch } where state contains:
 * - user: Current user object or null
 * - ui: { sidebarVisible, tabBarVisible }
 * - constants: App configuration constants
 *
 * @returns {{ state: Object, dispatch: Function }}
 *
 * @example
 * import { getState } from '@stevederico/skateboard-ui/Context';
 *
 * function MyComponent() {
 *   const { state, dispatch } = getState();
 *   console.log(state.user);
 *   dispatch({ type: 'SET_USER', payload: userData });
 * }
 */
export function getState(): ContextValue {
  return useSkateboardContext();
}

/**
 * Hook to access only the current user.
 *
 * More efficient than getState() when you only need user data,
 * as it avoids re-renders from unrelated state changes.
 *
 * @returns {Object|null} Current user object or null if not authenticated
 *
 * @example
 * import { useUser } from '@stevederico/skateboard-ui/Context';
 *
 * function ProfileCard() {
 *   const user = useUser();
 *   if (!user) return null;
 *   return <div>{user.name}</div>;
 * }
 */
export function useUser(): User | null {
  const { state } = useSkateboardContext();
  return state.user;
}

/**
 * Hook to access dispatch function.
 *
 * Use when you only need to dispatch actions without reading state.
 * Avoids re-renders since dispatch is stable.
 *
 * @returns {Function} Dispatch function
 *
 * @example
 * import { useDispatch } from '@stevederico/skateboard-ui/Context';
 *
 * function SignOutButton() {
 *   const dispatch = useDispatch();
 *   return <button onClick={() => dispatch({ type: 'CLEAR_USER' })}>Sign Out</button>;
 * }
 */
export function useDispatch(): React.Dispatch<Action> {
  const { dispatch } = useSkateboardContext();
  return dispatch;
}
