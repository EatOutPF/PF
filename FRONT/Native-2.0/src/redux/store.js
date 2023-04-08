import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import restosReducer from "./RestosSlice"
import rootReducer from "./reducer"

export const store = configureStore ({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    // { restos : restosReducer, }
})