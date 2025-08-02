// AuthLogin.jsx
import CommonForm from '@/Component/Common/form';
import { loginFormControls } from '@/config';
import { loginUser } from '@/store/auth-slice';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

function AuthLogin() {
  const user = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Animation trigger
    document.querySelectorAll('.animate-on-mount').forEach(el => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const result = await dispatch(loginUser(formData));
      
      if (result?.payload?.success) {
        // Success animation
        document.querySelector('.success-animation').classList.add('animate-success');
        
        setTimeout(() => {
          if (user?.role === 'doctor') {
            navigate('../../doctor/dashboard');
          } else if (user?.role === 'admin') {
            navigate('../../admin/dashboard');
          } else if (user?.role === 'user') {
            navigate('../../home/welcome');
          }
        }, 2500);
      } else {
        setError('Invalid credentials. Please try again.');
        document.querySelector('.form-container').classList.add('animate-shake');
        setTimeout(() => {
          document.querySelector('.form-container').classList.remove('animate-shake');
        }, 500);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form-container">
      <div className="animate-on-mount transform translate-y-6 transition-all duration-700">
        {/* Success animation overlay */}
        <div className="success-animation absolute inset-0 bg-green-500/80 flex items-center justify-center rounded-xl z-10 opacity-0 pointer-events-none">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="80" height="80">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" stroke="#fff" strokeWidth="3"/>
            <path className="checkmark__check" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-indigo-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-bounce-slow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        <CommonForm
          formControls={loginFormControls}
          buttonText={isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              Authenticating...
            </div>
          ) : 'Login'}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          disabled={isLoading}
        />
        
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          
          <div className="mt-4 sm:mt-0 text-sm text-gray-600">
            Don't have an account?
            <Link 
              to="/signup" 
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default AuthLogin;