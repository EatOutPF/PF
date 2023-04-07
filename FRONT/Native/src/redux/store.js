import { configureStore } from "@reduxjs/toolkit";
// import restosReducer from "./RestosSlice"
import rootReducer from "./reducer"

export const store = configureStore({
    reducer: rootReducer,
    // --------------------------------------------------------- esto es para los warnings
    // deberia ir el middleware correcto, pero por ahora se ignoran los warnings.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
    // { restos : restosReducer, }
})