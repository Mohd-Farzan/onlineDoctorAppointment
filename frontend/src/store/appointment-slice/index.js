import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";
import Cookies from 'js-cookie'

const initialState = {
    isLoading: true,
    appointment:null,
    error: null,
};


export const appointmentData = createAsyncThunk(
    'appointment/createAppointment',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/appointment/create-appointment',formData);
                                               
                
                return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('something wrong with profile');
        }
    }
);


// user slice
const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(appointmentData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(appointmentData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.appointment = action.payload.data;
                state.error = null;
            })
            .addCase(appointmentData.rejected, (state, action) => {
                state.isLoading = false;
                state.appointment = null;
                state.error = action.payload;
            });
    }
});

export const { setUser } = appointmentSlice.actions;
export default appointmentSlice.reducer;
