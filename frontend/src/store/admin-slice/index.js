import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

const initialState = {
    isLoading: true,
    doctor:null,
    error: null,
};
export const doctorRegistration = createAsyncThunk(
    '/doctor/registration',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/doctor', formData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Signup failed, please try again');
        }
    }
);
const authSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            Cookies.set('isAuthenticated','true')
            Cookies.set('user', JSON.stringify(action.payload), { expires: 7, secure: true });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(doctorRegistration.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(doctorRegistration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctor = action.payload.data;
                state.error = null;
            })
            .addCase(doctorRegistration.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.doctor = null
            })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
