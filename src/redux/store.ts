import { configureStore } from '@reduxjs/toolkit';

import credentialReducer, { credentialState } from './credential'

export interface IStore {
  credential: credentialState
}

export const store = configureStore({
  reducer: {
    credential: credentialReducer
  },
});
