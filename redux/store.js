import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cardReducer";
import { otherReducer } from "./reducers/otherReducer";
import { productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";


export const store =configureStore({

    reducer:{
user:userReducer,
other: otherReducer,
product: productReducer,
cart: cartReducer,
    } 
});

export const server ="https://fine-pink-meerkat-hat.cyclic.app/api/v1";