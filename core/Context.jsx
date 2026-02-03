import React, { createContext, useContext, useReducer, useEffect } from 'react';

const context = createContext();

// Store dispatch reference for programmatic access outside components
let _dispatch = null;

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
export function getDispatch() {
  return _dispatch;
}

// Check if localStorage is available
function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn('localStorage not available:', e.message);
    return false;
  }
}

// Safe localStorage operations for Context
function safeLSSetItem(key, value) {
  if (!isLocalStorageAvailable()) {
    console.warn(`Could not save to localStorage: ${key}`);
    return false;
  }
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('localStorage setItem error:', error.message);
    return false;
  }
}

function safeLSGetItem(key) {
  if (!isLocalStorageAvailable()) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('localStorage getItem error:', error.message);
    return null;
  }
}

function safeLSRemoveItem(key) {
  if (!isLocalStorageAvailable()) return false;
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('localStorage removeItem error:', error.message);
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
export function ContextProvider({ children, constants }) {
  const getStorageKey = () => {
    const appName = constants.appName || 'skateboard';
    return `${appName.toLowerCase().replace(/\s+/g, '-')}_user`;
  };

  const getInitialUser = () => {
    try {
      const storageKey = getStorageKey();
      const storedUser = safeLSGetItem(storageKey);
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch (e) {
      console.error('Error parsing user data:', e.message);
      return null;
    }
  };

  const initialState = {
    user: getInitialUser(),
    ui: {
      sidebarVisible: true,
      tabBarVisible: true
    },
    authOverlay: {
      visible: false,
      pendingCallback: null
    },
    constants
  };

  function reducer(state, action) {
    const storageKey = getStorageKey();

    switch (action.type) {
      case 'SET_USER': {
        try {
          const success = safeLSSetItem(storageKey, JSON.stringify(action.payload));
          if (!success) {
            console.error('Failed to persist user data to localStorage');
          }
        } catch (error) {
          console.error('Error setting user:', error.message);
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
        return { ...state, authOverlay: { visible: true, pendingCallback: action.payload || null } };
      }
      case 'HIDE_AUTH_OVERLAY': {
        return { ...state, authOverlay: { visible: false, pendingCallback: null } };
      }
      case 'AUTH_OVERLAY_SUCCESS': {
        if (state.authOverlay.pendingCallback) {
          try { state.authOverlay.pendingCallback(); } catch (e) { console.error('Auth callback error:', e); }
        }
        return { ...state, authOverlay: { visible: false, pendingCallback: null } };
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
export function getState() {
  return useContext(context);
}
