import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContextProvider from './context/authContext/authContext';
import PostContextProvider from './context/postContext/postContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
