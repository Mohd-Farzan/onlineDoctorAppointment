import CommonForm from '@/Component/Common/form'
import { contactForm } from '@/config'
import { contact } from '@/store/contact-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

function Contact() {
    const initialState={
        name:'',
        email:'',
        phone:'',
        message:'',
    }
    const [formData,setFormData]=useState(initialState)
    const dispatch=useDispatch()
    function onSubmit(){
        dispatch(contact(formData)).then((data)=>{
            console.log(data,"contactData")
            if(data?.payload?.success){

                alert('Your data is sent ! our team response you soon');
            }
            else{[
                alert('something problem please try again later..')
            ]}
        })
    }
  return (
    <div className=" w-full border-2 rounded-lg p-2" >
        <div className="flex flex-col gap-4 justify-center">
            <CommonForm
            formControls={contactForm}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText="Send"
            />
        </div>
    </div>
  )
}

export default Contact