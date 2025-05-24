import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'

const initialState = {
    isLoading: true,
    appointment:[],
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

export const showAppointment = createAsyncThunk(
  "doctor/getAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(Cookies.get("user"));
      if (!user?.doctorId) throw new Error("No doctor ID found");
      console.log(user.doctorId,"idFromlogin")
      const response = await axios.get(
        `http://localhost:3000/api/appointment/get-appointment/${user.doctorId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch appointments");
    }
  }
);
export const userAppointment = createAsyncThunk(
  "user/userAppointment",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(Cookies.get("user"));
      console.log(user.email,"EMAIL FROM LOGIN")
      const response = await axios.get(
        `http://localhost:3000/api/appointment/fetch-appointment/${user.email}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch appointments");
    }
  }
);

export const cancleAppointment = createAsyncThunk(
  "user/cancleAppointment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/appointment/cancle-appointment/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch appointments");
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
            }).addCase(showAppointment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(showAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.appointment = action.payload.data || [];
                state.error = null;
              })
              .addCase(showAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })
              .addCase(userAppointment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(userAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.appointment = action.payload.data;
                state.error = null;
              })
              .addCase(userAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
              })
              .addCase(cancleAppointment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
              })
              .addCase(cancleAppointment.fulfilled, (state, action) => {
              const index = state.appointment.findIndex(app => app._id === action.payload._id);
                if (index !== -1) {
                  state.appointment[index] = action.payload;
                }
              })

    }
});

export const { setUser } = appointmentSlice.actions;
export default appointmentSlice.reducer;
