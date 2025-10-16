import React, { createContext, useContext, useReducer } from 'react';

const context = createContext();

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

export function ContextProvider({ children, constants }) {
  const getStorageKey = () => {
    const appName = constants.appName || 'skateboard';
    return `${appName.toLowerCase().replace(/\s+/g, '-')}_user`;
  };

  const getCSRFKey = () => {
    const appName = constants.appName || 'skateboard';
    return `${appName.toLowerCase().replace(/\s+/g, '-')}_csrf`;
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

  const initialState = { user: getInitialUser() };

  function reducer(state, action) {
    const storageKey = getStorageKey();
    const csrfKey = getCSRFKey();

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
        // Clean up both user and CSRF token
        safeLSRemoveItem(storageKey);
        safeLSRemoveItem(csrfKey);
        return { ...state, user: null };
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  );
}

export function getState() {
  return useContext(context);
}
