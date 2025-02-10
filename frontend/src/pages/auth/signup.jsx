import CommonForm from '../../Component/Common/form'
import { registerFormControls } from '@/config';
import { SignupUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const initialState = {
  userName: '',
  email: '',
  password: '',
  role:'user',
};

function AuthSignup() {
  const [FormData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(SignupUser(FormData)).then((data) => {
      if (data?.payload?.success) {
        alert("successfully signup")
        setTimeout(() => navigate('/login'), 1000);
      } else {
        alert("failed to signup")
        setTimeout(()=>navigate('/signup'),800)
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-black">Sign Up</h1>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={FormData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p>
        Already have an account?
        <Link className="font-medium text-primary hover:underline" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default AuthSignup;
