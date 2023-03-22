import { configureStore } from "@reduxjs/toolkit";
// import restosReducer from "./RestosSlice"
import rootReducer from "./reducer"

export const store = configureStore ({
    reducer: rootReducer,
    // { restos : restosReducer, }
})