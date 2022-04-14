import { configureStore } from "@reduxjs/toolkit";

//import reducers
import calcReducer from "./slices/calcSlice"
export default configureStore({
    reducer: {
        calcReducer
    }
})