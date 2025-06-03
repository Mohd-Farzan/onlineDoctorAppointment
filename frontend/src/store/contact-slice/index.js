import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";
import Cookies from 'js-cookie'

const initialState = {
    isLoading: true,
    contact:null,
    error: null,
};

// Signup action
export const contact = createAsyncThunk(
    'contact/createContact',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://pulsecare-pc.onrender.com/api/contact/create-contact',formData);
                
                return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('something wrong with profile');
        }
    }
);


// user slice
const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            // Signup User
            .addCase(contact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(contact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contact = action.payload.data;
                state.error = null;
            })
            .addCase(contact.rejected, (state, action) => {
                state.isLoading = false;
                state.contact = null;
                state.error = action.payload;
            });
    }
});

export const { setUser } = contactSlice.actions;
export default contactSlice.reducer;
