import React, { useContext, useReducer } from 'react';
import reducer from './authReducer';

const AuthContext = React.createContext();

// sets the current social medial user
const initialState = {
  user: null,
  isFetching: false,
  error: null,
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
