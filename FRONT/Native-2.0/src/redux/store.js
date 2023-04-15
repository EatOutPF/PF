// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistStore, persistReducer } from 'redux-persist'

// //import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// // import restosReducer from "./RestosSlice"
// import { createStore } from 'redux'
// import rootReducer from "./reducer"
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)
// export const store = createStore(persistedReducer)
// // export const store = configureStore ({
// //     reducer: rootReducer,
// //     middleware: getDefaultMiddleware({
// //         immutableCheck: false,
// //         serializableCheck: false,
// //       }),
// //     // { restos : restosReducer, }
// // })

// export const persistor = persistStore(store)

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from "./reducer"
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
)

export const persistor = persistStore(store)