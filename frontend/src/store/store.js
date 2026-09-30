import { configureStore } from '@reduxjs/toolkit';
import { advancedApi } from '../api/advancedApi';

export const store = configureStore({
  reducer: {
    [advancedApi.reducerPath]: advancedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(advancedApi.middleware),
});
