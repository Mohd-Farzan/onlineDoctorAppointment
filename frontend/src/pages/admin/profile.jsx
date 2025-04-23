import { doctorRegistrationFormControl } from '@/config';
import { doctorRegistration } from '@/store/doctor-slice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const DoctorRegistrationForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        speciality: '',
        availability: [{ date: '', times: '' }], // Initialize with one empty date slot
        contact: '',
        fees: ''
    });
    const dispatch=useDispatch()

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        
        
        if (name.startsWith('availability')) {
            const parts = name.split('.');
            const dateIndex = parseInt(parts[1]);
            const fieldName = parts[2];
            
            const updatedDates = [...formData.availability];
            updatedDates[dateIndex][fieldName] = value;
            
            setFormData({
                ...formData,
                availability: updatedDates
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const addDateField = () => {
        setFormData({
            ...formData,
            availability: [...formData.availability, { date: '', times: '' }]
        });
    };

    const removeDateField = (index) => {
        const updatedDates = formData.availability.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            availability: updatedDates
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            availability: Object.values(formData.availability || {}).map(slot => ({
              date: slot.date,
              times: slot.times
            }))
          };
          console.log(formattedData,"data")
        dispatch(doctorRegistration(formattedData)).then((data)=>{
            if(data?.payload?.success){
                alert("your registration is completed")
            }
            else{
                alert("please enter all fields correctly")
            }
        })
        
        // Submit logic here
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Doctor Registration</h2>
            
            {/* Regular fields */}
            {doctorRegistrationFormControl
                .filter(field => field.componentType !== 'dateLoop')
                .map((field, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                ))}
            
            {/* Available Dates Section */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Dates and Times
                </label>
                
                {formData.availability.map((dateField, index) => (
                    <div key={index} className="mb-3 p-3 border border-gray-200 rounded-md">
                        <div className="grid grid-cols-2 gap-3 mb-2">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                                <input
                                    type="date"
                                    name={`availability.${index}.date`}
                                    value={dateField.date}
                                    onChange={(e) => handleInputChange(e, index)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Times</label>
                                <input
                                    type="text"
                                    name={`availability.${index}.times`}
                                    value={dateField.times}
                                    onChange={(e) => handleInputChange(e, index)}
                                    placeholder="09:00,11:00,14:00"
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    required
                                />
                            </div>
                        </div>
                        
                        {formData.availability.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeDateField(index)}
                                className="text-red-500 text-xs hover:text-red-700"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                
                <button
                    type="button"
                    onClick={addDateField}
                    className="mt-2 text-sm text-blue-500 hover:text-blue-700 flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add another date
                </button>
            </div>
            
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Register
            </button>
        </form>
    );
};

export default DoctorRegistrationForm;