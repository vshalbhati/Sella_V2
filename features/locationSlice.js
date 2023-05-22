import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'location',
    initialState: {location: []},
    reducers: {
      setLoocation: (state, action) => {
        const newLocation = action.payload;
        const isLocationExists = state.location.includes(newLocation);
      
        if (!isLocationExists) {
          // state.location = [...state.location, newLocation];
          state.location = newLocation;
        }      
      },
      clearLocation: (state) => {
        state.location = [];
      },
    },
  });
  
export const { setLoocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
