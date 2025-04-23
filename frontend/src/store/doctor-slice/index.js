import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,  // Changed initial state to false
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

// Fixed typo in 'fatchDoctor' (was 'fatchDoctor')
export const fatchDoctor = createAsyncThunk(
  "doctor/fatchDoctor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/doctor/show-doctor",
        { withCredentials: true }  // Added credentials if needed
      );
      
      // Transform data to ensure proper structure
      return {
        ...response.data,
        data: response.data.data.map(doctor => ({
          ...doctor,
          availability: doctor.availability || []  // Ensure availability exists
        }))
      };
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
  reducers: {
    // Optional: Add a reset reducer if needed
    resetDoctorState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(doctorRegistration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(doctorRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        // Ensure we're not overwriting existing doctors
        state.doctorList = [...state.doctorList, action.payload.data];
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
        // Ensure data structure matches expectations
        state.doctorList = action.payload.data || [];
        state.error = null;
      })
      .addCase(fatchDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDoctorState } = doctorSlice.actions;
export default doctorSlice.reducer;