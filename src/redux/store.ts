import { configureStore } from '@reduxjs/toolkit';

import credentialReducer from './credential'

export const store = configureStore({
  reducer: {
    credential: credentialReducer
  },
});
