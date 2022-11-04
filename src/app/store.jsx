import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriaReducer from "../features/categorias/categoriaSlice";
import fraseReducer from "../features/frases/fraseSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categorias: categoriaReducer,
        frases: fraseReducer
    },
})