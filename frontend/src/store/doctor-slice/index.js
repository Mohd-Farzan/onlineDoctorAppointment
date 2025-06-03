import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  doctorList: [],
  error: null,
};

// Register Doctor
export const doctorRegistration = createAsyncThunk(
  "doctor/registration",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://pulsecare-pc.onrender.com/api/doctor/create-doctor",
        formData,
        { withCredentials: true }
      );
      if(response.data.success){
        Cookies.set('doctor', JSON.stringify(response.data.user), { expires: 7, secure: true }); 
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed, please try again"
      );
    }
  }
);

// Fetch Doctor
export const fatchDoctor = createAsyncThunk(
  "doctor/fatchDoctor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://pulsecare-pc.onrender.com/api/doctor/show-doctor",
        { withCredentials: true }
      );
      return {

        ...response.data,
        data: response.data.data.map((doctor) => ({
          ...doctor,
          availability: doctor.availability || []
        }))
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctors"
      );
    }
  }
);

// Update Doctor Profile
export const updateDoctorProfile = createAsyncThunk(
  "doctor/updateDoctorProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://pulsecare-pc.onrender.com/api/doctor/update-doctor",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    resetDoctorState: () => initialState,
    setUser(state,action){
      Cookies.set('doctor', JSON.stringify(action.payload), { expires: 7, secure: true });
    }
  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(doctorRegistration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(doctorRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorList = [...state.doctorList, action.payload.data];
        state.error = null;
      })
      .addCase(doctorRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fatchDoctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fatchDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctorList = action.payload.data || [];
        state.error = null;
      })
      .addCase(fatchDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateDoctorProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedDoctor = action.payload.data;

        // Update the doctorList
        state.doctorList = state.doctorList.map((doctor) =>
          doctor._id === updatedDoctor._id ? updatedDoctor : doctor
        );

        state.error = null;
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = doctorSlice.actions;
export const { resetDoctorState } = doctorSlice.actions;
export default doctorSlice.reducer;
