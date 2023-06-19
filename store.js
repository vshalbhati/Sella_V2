import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import supplyReducer from "./features/supplyslice";
import userReducer from "./features/userSlice";
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import locationReducer from "./features/locationSlice";
import orderSlice from "./features/orderSlice";
import darkmodeSlice from "./features/darkmodeSlice";
import zoneReducer from "./features/zoneSlice";


export const store = configureStore({
    reducer:{
        basket: basketReducer,
        supply: supplyReducer,  
        user: userReducer,
        location: locationReducer,
        order: orderSlice,
        darkmode: darkmodeSlice,
        zone: zoneReducer,
    },
},applyMiddleware(thunkMiddleware));