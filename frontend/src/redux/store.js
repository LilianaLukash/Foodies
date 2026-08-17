import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import authReducer, { logout } from './auth/slice';
import filtersReducer from './filters/slice';
import modalsReducer from './modals/slice';

const appReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
  modals: modalsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logout.fulfilled.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
      },
    }),
});

export const persistor = persistStore(store);
