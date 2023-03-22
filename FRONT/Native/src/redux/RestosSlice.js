// ---------- ESTO ES DE PRUEBA USANDO REDUX TOOLKIT ----------
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restorants : []
}

export const restoSlice = createSlice({
    name: "restos",
    initialState,
    reducer: {
        setRestosReducer : (state, action) => {
            state.restorants = action.payload;
            console.log(state.restorants)
        },
        addRestosReducer : (state, action) => {
            state.restorants.push(action.payload)
        },
        hideComplitedReducer : (state) => {
            state.restorants = state.restorants.filter( a => a.active)
        },
        updateRestoReducer : (state, action) =>{
            state.restorants = state.restorants.map ( a => {
                if(a.id === action.payload.id){
                    restorants.active = !restorants.active;
                }
                return restorants;
            })
        },
        deleteRestoReducer: (state, action) => {
            const id = action.payload;
            const restos = state.restorants.filter( a => a.id !== id)
            state.restorants = restos;
        },
    }
});
export const {
    setRestosReducer,
    addRestosReducer,
    updateRestoReducer,
    hideComplitedReducer,
    deleteRestoReducer,
} = restoSlice.actions;

export default restoSlice.reducer;