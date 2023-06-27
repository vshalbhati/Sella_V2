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
import phoneUserSlice from "./features/phoneUserSlice";
import distanceSlice from "./features/distanceSlice";


export const store = configureStore({
    reducer:{
        basket: basketReducer,
        supply: supplyReducer,  
        user: userReducer,
        location: locationReducer,
        order: orderSlice,
        darkmode: darkmodeSlice,
        zone: zoneReducer,
        phoneUser: phoneUserSlice,
        distance: distanceSlice,
    },
},applyMiddleware(thunkMiddleware));