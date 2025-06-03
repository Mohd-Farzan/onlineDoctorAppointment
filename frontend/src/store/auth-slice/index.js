import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    isAuthenticated: !!Cookies.get('token'),
    isLoading: true,
    error: null,
};


// Signup action
export const SignupUser = createAsyncThunk(
    'auth/signup',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://pulsecare-pc.onrender.com/api/auth/signup', formData, {
                withCredentials: true,
            });
            console.log("response",response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Signup failed, please try again');
        }
    }
);

// Check route action
export const checkRoute = createAsyncThunk(
    'auth/checkroute',
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get('token'); // Get token from cookies
            const response = await axios.get('https://pulsecare-pc.onrender.com/api/auth/checkroute', {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
            });
         
            return response.data;
        } catch (error) {
            const message = error.response?.data || 'An error occurred';
            return rejectWithValue(message);
        }
    }
);

// Login action
export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://pulsecare-pc.onrender.com/api/auth/login', formData, {
                withCredentials: true,
            });

            if (response.data.success) {
                Cookies.set('token', response.data.token, { expires: 7, secure: true }); // Store the token
                
                Cookies.set('user', JSON.stringify(response.data.user), { expires: 7, secure: true }); // Store user data
            }
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Invalid credentials');
        }
    }
);

// Logout action
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://pulsecare-pc.onrender.com/api/auth/logout', {}, {
                withCredentials: true,
            });

            // Remove authentication data from cookies
            Cookies.remove('token');
            Cookies.remove('user');

            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Logout failed');
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://pulsecare-pc.onrender.com/api/auth/forgot-password', formData, {
                withCredentials: true, // Ensures cookies are sent
            });

            return response.data; // Return successful response
        } catch (error) {
            console.error("Forgot Password api Error:", error);

            return rejectWithValue(
                error.response?.data?.message || 'Something went wrong. Please try again.'
            );
        }
    }
);


// Verify OTP & Reset Password
export const verifyOtpAndResetPswrd = createAsyncThunk(
    'auth/verifyOtpAndResetPswrd',
    async ({ email, otp, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://pulsecare-pc.onrender.com/api/auth/reset-password', { email, otp, newPassword }, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Invalid OTP');
        }
    }
);

// Update Profile   
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`https://pulsecare-pc.onrender.com/api/auth/profile/${id}`, formData);
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Something went wrong with profile update');
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: "auth",
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
            // Signup User
            .addCase(SignupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(SignupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(SignupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user=action.payload.success?action.payload.user:null;
                state.isAuthenticated=action.payload.success?true:false;  
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            // Check Route
            .addCase(checkRoute.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkRoute.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user=action.payload.success?action.payload.user:null;
                state.isAuthenticated=action.payload.success?true:false;  
            })
            .addCase(checkRoute.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user=action.payload.data
                state.isAuthenticated = action.payload.success;
            })  
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            }).
            addCase(forgotPassword.pending, (state,action)=>{
                state.isLoading=true;
                state.error=null;
            })
            .addCase(forgotPassword.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.user=action.payload
                state.isAuthenticated=false;
            }).addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
