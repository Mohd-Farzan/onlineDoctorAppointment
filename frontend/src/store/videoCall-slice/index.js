// features/video/videoSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createZoomMeeting = createAsyncThunk(
  'video/createZoomMeeting',
  async (topic = "Consultation", { rejectWithValue }) => {
    try {
      const res = await axios.post('https://pulsecare-pc.onrender.com/api/video/create-room', { topic });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const emergencyRequest = createAsyncThunk(
  'video/emergencyRequest',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('https://pulsecare-pc.onrender.com/api/video/request-form',formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    meeting: null,
    request:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createZoomMeeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createZoomMeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.meeting = action.payload;
      })
      .addCase(createZoomMeeting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) .addCase(emergencyRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emergencyRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload.data;
      })
      .addCase(emergencyRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default videoSlice.reducer;
