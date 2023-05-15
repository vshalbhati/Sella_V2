import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import supplyReducer from "./features/supplyslice";
import userReducer from "./features/userSlice";
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';


export const store = configureStore({
    reducer:{
        basket: basketReducer,
        supply: supplyReducer,  
        user: userReducer,
    },
},applyMiddleware(thunkMiddleware));