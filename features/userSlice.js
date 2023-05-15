import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {user: null}, // Use an object with a `user` property
    reducers: {
      setUser: (state, action) => {
        return action.payload;
      },
      clearUser: (state) => {
        state.user = null;
      },
    },
  });
  

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
