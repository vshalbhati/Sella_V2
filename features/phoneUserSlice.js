import { createSlice } from '@reduxjs/toolkit';

const phoneUserSlice = createSlice({
    name: 'phoneUser',
    initialState: { name: '', phoneNumber: '', email: '' },
    reducers: {
        setPhoneUser: (state, action) => {
        state.user = action.payload;
      },
      clearPhoneUser: (state) => {
        state.user = [];
      },
    },
  });
  

export const { setPhoneUser, clearPhoneUser } = phoneUserSlice.actions;

export default phoneUserSlice.reducer;
