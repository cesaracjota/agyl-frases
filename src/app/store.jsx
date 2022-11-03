import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriaReducer from "../features/categorias/categoriaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categorias: categoriaReducer,
    },
})