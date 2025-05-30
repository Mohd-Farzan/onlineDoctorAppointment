import CommonForm from '@/Component/Common/form'
import { loginFormControls} from '@/config'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';

const initialState = {
    email: '',
    password: '',
  };
function AuthLogin() {
    const user=useSelector((state)=>state.auth)
    const[formData,setFormData]=useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    function onSubmit(event){
        event.preventDefault()
        console.log(formData, 'FormData before dispatch');
        dispatch(loginUser(formData)).then((data) => {
          
            if (data?.payload?.success) {
             console.log(user.role)
              alert("successfully logged in")
              if(user?.role ==='doctor'){
                setTimeout(()=>navigate('../../doctor/dashboard'),1000);
              }
              if(user?.role==='admin'){
                setTimeout(()=>navigate('../../admin/dashboard'),1000);
              }
              else if(user?.role==='user'){
                setTimeout(()=>navigate('../../home/welcome'),1000);
              }
            } else {
              alert("failed to login")
              setTimeout(()=>navigate('/login'),800)
            }
          });
    }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground text-black">Login</h1>
    </div>
    <CommonForm
      formControls={loginFormControls}
      buttonText={'Login'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
    />
    <span>
     <Link className='font-medium text-primary hover:underline' to="/forgot-password">forgot password</Link> 
    </span>
    <p>
      Don't have an Account?
      <Link className="font-medium text-primary hover:underline" to="/signup">
        Signup
      </Link>
    </p>
  </div>
  )
}

export default AuthLogin