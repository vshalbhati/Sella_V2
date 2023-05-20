import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'location',
    initialState: {location: []},
    reducers: {
      setLoocation: (state, action) => {
        return action.payload;
      },
      clearLocation: (state) => {
        state.location = [];
      },
    },
  });
  

export const { setLoocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
