import React, { createContext, useContext, useReducer } from 'react';

const context = createContext();

export function ContextProvider({ children, constants }) {
  const getStorageKey = () => {
    const appName = constants.appName || 'skateboard';
    return `${appName.toLowerCase().replace(/\s+/g, '-')}_user`;
  };

  const getInitialUser = () => {
    try {
      const storageKey = getStorageKey();
      const storedUser = localStorage.getItem(storageKey);
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch (e) {
      return null;
    }
  };

  const initialState = { user: getInitialUser() };

  function reducer(state, action) {
    try {
      const storageKey = getStorageKey();
      const appName = constants.appName || 'skateboard';
      const csrfKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_csrf`;

      switch (action.type) {
        case 'SET_USER':
          localStorage.setItem(storageKey, JSON.stringify(action.payload));
          return { ...state, user: action.payload };
        case 'CLEAR_USER':
          localStorage.removeItem(storageKey);
          localStorage.removeItem(csrfKey);
          return { ...state, user: null };
        default:
          return state;
      }
    } catch (e) {
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
