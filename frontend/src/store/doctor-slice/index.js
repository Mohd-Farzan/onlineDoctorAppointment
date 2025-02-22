import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  doctorList: [],
  error: null,
};

export const doctorRegistration = createAsyncThunk(
  "doctor/registration",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/doctor/create-doctor",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed, please try again"
      );
    }
  }
);

export const fatchDoctor = createAsyncThunk(
  "doctor/fatchDoctor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/doctor/show-doctor");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctors"
      );
    }
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {}, // Remove unused reducers
  extraReducers: (builder) => {
    builder
      .addCase(doctorRegistration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(doctorRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorList.push(action.payload.data);
        state.error = null;
      })
      .addCase(doctorRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fatchDoctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fatchDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorList = action.payload.data;
        state.error = null;
      })
      .addCase(fatchDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;