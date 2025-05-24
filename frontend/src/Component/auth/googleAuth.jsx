import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkRoute } from '../../store/auth-slice'; // Assuming this refreshes auth state

function GoogleOAuthCallback() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const googleAuthSuccess = queryParams.get('googleAuthSuccess');
        const error = queryParams.get('error');

        if (googleAuthSuccess) {
            // Google authentication was successful.
            // You might want to dispatch an action to re-fetch user data
            // or simply redirect to the dashboard.
            dispatch(checkRoute()); // Re-check authentication status
            navigate('/doctor/dashboard'); // Redirect to doctor dashboard
        } else if (error) {
            console.error('Google OAuth Error:', error);
            navigate('/error'); // Redirect to a general error page
        } else {
            // Fallback for unexpected scenarios
            navigate('/error');
        }
    }, [navigate, location, dispatch]);

    return (
        <div>
            <h2>Processing Google Authentication...</h2>
            <p>Please wait, you are being redirected.</p>
        </div>
    );
}

export default GoogleOAuthCallback;