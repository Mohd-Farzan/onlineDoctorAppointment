import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";
import Cookies from 'js-cookie'

const initialState = {
    isAuthenticated:  false,
    isLoading: true,
    user:null,
    error: null,
};

// Signup action
export const fatchDoctor = createAsyncThunk(
    'doctor/fatchdoctor',
    async ({ rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/show-doctor/');
                
            console.log('data',response.data)    
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('something wrong with profile');
        }
    }
);


// user slice
const doctorSlice = createSlice({
    name: "doctorSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        }
        
    },
    extraReducers: (builder) => {
        builder
            // Signup User
            .addCase(fatchDoctor.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fatchDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(fatchDoctor.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            });
    }
});

export const { setUser } = doctorSlice.actions;
export default doctorSlice.reducer;
