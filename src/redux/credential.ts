import { createSlice } from '@reduxjs/toolkit';

export interface credentialState {
  credential: string
}

const initialState: credentialState = {
  credential: ""
}

export const credentialSlice = createSlice({
  name: 'credential',
  initialState: initialState,
  reducers: {
    set: (state, action) => {
      state.credential = action.payload;
    },
    reset: (state) => {
      state.credential = "";
    },
  },
});

export const { set, reset } = credentialSlice.actions;

export default credentialSlice.reducer;