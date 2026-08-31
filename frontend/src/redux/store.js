import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import authReducer from './auth/slice';
import filtersReducer from './filters/slice';
import modalsReducer from './modals/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
  modals: modalsReducer,
});

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
