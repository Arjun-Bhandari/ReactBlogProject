import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authslice";
import postSlice from "./postSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        posts:postSlice,
    }
});


export default store;
