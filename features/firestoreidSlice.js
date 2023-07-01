import { createSlice } from '@reduxjs/toolkit';

const firestoreidSlice = createSlice({
    name: 'user',
    initialState: {documentId: null},
    reducers: {
      setDocumentId: (state, action) => {
        return action.payload;
      },
      clearDocumentId: (state) => {
        state.user = null;
      },
    },
  });
  

export const { setDocumentId, clearDocumentId } = firestoreidSlice.actions;

export default firestoreidSlice.reducer;
