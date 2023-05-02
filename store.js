import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import supplyReducer from "./features/supplyslice";


export const store = configureStore({
    reducer:{
        basket: basketReducer,
        supply: supplyReducer,  
    },
});