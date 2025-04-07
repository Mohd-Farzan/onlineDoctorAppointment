import CommonForm from '@/Component/Common/form';
import { Button } from '@/components/ui/button';
import { forgotpswrd } from '@/config'; // Adjust the path as needed
import { forgotPassword } from '@/store/auth-slice';
import { StepBack } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const initialState = {
    email: ''

  };
function ForgotPassword() {
    const [formData, setFormData] = useState(initialState); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onSubmit(event) {
        event.preventDefault()
        // console.log("Submitting form:", formData);
        dispatch(forgotPassword(formData)).then((data) => {
            console.log("Response from forgotPassword:", data); 
            if (data?.payload?.success) { 
                alert("OTP sent successfully!");
                navigate('/reset-password');
            } else {
                alert("Invalid email");
            }
        });
    }

    return (
        <>
            <div className="text-center justify-center text-xl font-bold border rounded shadow-lg w-[450px] h-1/2 p-4 mt-4">Forgot Password
         <Button className=' flex' onClick={()=>window.history.back()}><StepBack/></Button>
            <div className="justify-center items-center mt-4">
                <p className='text-sm font-light'>We’ll send a verification code to this email if it matches an existing account.</p>
                <CommonForm
                    formControls={forgotpswrd}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText="Send OTP"
                    onSubmit={onSubmit}
                />
            </div>
           
            </div>
         
        </>
    );
}

export default ForgotPassword;
