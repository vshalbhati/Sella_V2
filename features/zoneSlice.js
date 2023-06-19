import { createSlice } from '@reduxjs/toolkit';

const zoneSlice = createSlice({
  name: 'zone',
  initialState: 0,

  reducers: {
    setZone: (state, action) => {
      return action.payload;
    },
  },
});

export const { setZone } = zoneSlice.actions;
export default zoneSlice.reducer;
