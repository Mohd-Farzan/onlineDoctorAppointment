import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";
import Cookies from 'js-cookie'
import { Cookie } from "lucide-react";

const initialState = {
    // isAuthenticated: Cookies.get('isAuthenticated')==='true'||false,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
    isLoading: true,
    user:Cookies.get('user')? JSON.parse(Cookies.get('user')):null,
    error: null,
};

// Signup action
export const SignupUser = createAsyncThunk(
    'auth/signup',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/signup', formData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Signup failed, please try again');
        }
    }
);

// Check route action
export const checkRoute = createAsyncThunk(
    'auth/checkauth',
    async (_, { rejectWithValue }) => {
        try {
            // const token = Cookies.get('authToken'); // Get token from cookies
            const token = localStorage.getItem('token'); // Fetch the token from localStorage
            const response = await axios.get('http://localhost:3000/api/checkroute', {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
            });
            return response.data;
        } catch (error) {
            const message = error.response && error.response.data ? error.response.data : 'An error occurred';
            return rejectWithValue(message);
        }
    }
);

// Login action
export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            console.log(formData,'forDATA')
            const response = await axios.post('http://localhost:3000/api/login', formData, {
                withCredentials: true,
                
                
            });
            if (response.data.success) {
                // Cookies.set('token', response.data.token,{ expires: 7, secure: true }); // Store the token
                localStorage.setItem('token', response.data.token); // Store the token
            }
            return response.data;
            
         
        } catch (error) {
            console.error(error);
            return rejectWithValue('Invalid credentials');
        }
    }
);
//logOut
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/logout', {}, {
                withCredentials: true,
            });
            localStorage.removeItem('token');
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Logout failed');
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword', // Use consistent naming for the action type
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/forgot-password', formData, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Invalid email');
        }
    }
);
export const verifyOtpAndResetPswrd = createAsyncThunk(
    'auth/verifyOtpAndResetPswrd', // Remove extra spaces to keep naming consistent
    async ({ email, otp, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/reset-password', { email, otp, newPassword }, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue('Invalid OTP');
        }
    }
);
export const updateprofile = createAsyncThunk(
    'user/updateProfile',
    async ({ id,formData }, { rejectWithValue }) => { // Use `id` here
        try {
            console.log(id,formData);
            const response = await axios.put(`http://localhost:3000/api/profile/${id}`, formData);
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
            localStorage.setItem('isAuthenticated', 'true'); // Persist to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
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
                state.isAuthenticated = true;
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
                state.isAuthenticated=action.payload.success?true : false;
            })
            .addCase(checkRoute.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            }).addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }).addCase(updateprofile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateprofile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data;
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

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
