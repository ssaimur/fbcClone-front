import React, { useReducer, useState } from 'react';
import reducer from './dialogReducer.js';

const DialogContext = React.createContext();

const initialState = {
  deleteDialog: null,
  logoutDialog: null,
  showDialog: false,
};

const DialogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DialogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useGlobalDialogContext = () => {
  return React.useContext(DialogContext);
};

export default DialogContextProvider;
