import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContextProvider from './context/authContext/authContext';
import PostContextProvider from './context/postContext/postContext';
import DialogContextProvider from './context/dialogContext/dialogContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <DialogContextProvider>
          <App />
        </DialogContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
