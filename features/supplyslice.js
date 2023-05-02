import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  supply:{
    id:null,
    imgurl:null,
    name:null,
    short_description:null,
    price:null,
  }
}

export const supplySlice = createSlice({
  name: 'supply',
  initialState,
  reducers: {
    setSupply:(state, action) => {
        state.supply = action.payload;
    }
  },
})

export const { setSupply } = supplySlice.actions;
export const selectSupply =(state) => state.supply.supply;
 
export default supplySlice.reducer