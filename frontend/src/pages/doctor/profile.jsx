import CommonForm from '@/Component/Common/form'
import { doctorRegistrationFormControl } from '@/config'
import { doctorRegistration } from '@/store/doctor-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const initialState = {
    name: '',
    speciality: '',
    availability: '',
    email: '',
    address: '',
    time: '',
    fees: '',
}

function DoctorRegistration() {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault()
        dispatch(doctorRegistration(formData)).then((data) => {
            if (data.payload.success) {
                alert('Your registration is complete')
            }
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-3">
                    Doctor Registration
                </h2>
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

export default DoctorRegistration
