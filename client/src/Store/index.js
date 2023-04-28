import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
    /* only for react-persist  user info store in browser local storage ,can get rid by clear the cache*/
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
import userSlice from './features/userSlice';
import persistStore from 'redux-persist/es/persistStore';
  const persistConfig = { key: "root", storage, version: 1 };
  const rootReducer = combineReducers({user:userSlice})
  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store=configureStore({
    reducer:persistedReducer ,
    middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }),

})

export const persistor= persistStore(store) ;