import CommonForm from '@/Component/Common/form'
import { doctorRegistrationFormControl } from '@/config'
import { doctorRegistration } from '@/store/admin-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
const initialState={
    name:'',
    email:'',
    address:'',
    speciality:'',
    availablity:'',
    fees:'',
    time:'',
}
function DoctorProfile() {
    const[formData,setFormData]=useState(initialState)
    const dispatch=useDispatch()
    function onSubmit(event){
        event.preventDefault()
        dispatch(doctorRegistration(formData)).then((data)=>{
            if(data.payload.success){
                alert('your registration is complete')
            }
        });
    }
  return (
    <div className="flex w-screen justify-center">
        <div className="form border rounded p-2 bg-green-300">
            <CommonForm
            formControls={doctorRegistrationFormControl}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            />
        </div>
    </div>
  )
}

export default DoctorProfile