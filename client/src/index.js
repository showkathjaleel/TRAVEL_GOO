import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './Context/AuthUser';
import NotificationProvider from './Context/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <NotificationProvider>
   <App /> 
   </NotificationProvider> 
   </AuthProvider>
);
