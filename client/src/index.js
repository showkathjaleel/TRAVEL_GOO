import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './Context/AuthUser';
//import NotificationProvider from './Context/NotificationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from 'redux-persist';
import { store, persistor } from './Store'; 

import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ToastContainer />  
   <App /> 
   </PersistGate>
   </Provider>
   </AuthProvider>
);
