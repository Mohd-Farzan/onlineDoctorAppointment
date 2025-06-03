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
export const updateprofile = createAsyncThunk(
    'user/updateProfile',
    async (id,formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://pulsecare-pc.onrender.com/api/user/profile/${id}`,formData);
                
                return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('something wrong with profile');
        }
    }
);


// user slice
const userSlice = createSlice({
    name: "userSlice",
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
            .addCase(updateprofile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateprofile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(updateprofile.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            });
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
