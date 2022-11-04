import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fraseService from "../../services/frase.service";

const initialState = {
    frases: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new frase

// Get ramdom frase

export const getRandomFrase = createAsyncThunk(
    "frases/getRandomFrase",
    async (_, thunkAPI) => {
        try {
            return await fraseService.getRandomPhrase();
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const fraseSlice = createSlice({
    name: "frases",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRandomFrase.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRandomFrase.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.frases = action.payload;
            })
            .addCase(getRandomFrase.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        }
    })

export const { reset } = fraseSlice.actions;
export default fraseSlice.reducer;