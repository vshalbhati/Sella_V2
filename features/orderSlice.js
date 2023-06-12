import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromOrder: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newOrder = [...state.items];
      if(index >= 0){
        newOrder.splice(index,1);
      } else{
        console.warn(
          `cant remove product (id: ${action.payload.id}) as it is not in order!`
        );
      }
      state.items = newOrder;
    },
  },
})

export const { addToOrder, removeFromOrder } = orderSlice.actions;
export const selectOrderItems =(state) => state.order.items;

export const selectOrderItemsWithId = (state, id) => {
    return state.order.items.filter(item => item.id === id);
  };

export const selectOrderTotal = (state) => state.order.items.reduce((total, item) => total += item.price, 0)  
    
  export default orderSlice.reducer