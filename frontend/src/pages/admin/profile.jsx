import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doctorRegistration, updateDoctorProfile, fatchDoctor } from '@/store/doctor-slice';
import { doctorRegistrationFormControl } from '@/config';
import Cookies from 'js-cookie';

export default function DoctorRegistrationForm() {
  const dispatch = useDispatch();
  const { doctorList, isLoading } = useSelector(state => state.doctor);
  const user = JSON.parse(Cookies.get("user"))

  const [formData, setFormData] = useState({
    doctorId:user.id,
    name: user.userName,
    email: user.email,
    address: '',
    speciality: '',
    availability: [{ days: '', times: '' }],
    contact: '',
    fees: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // 1) Fetch doctors on mount (so we can find “my” profile)
  useEffect(() => { 
    const getDoctor = async () => {
      const user = JSON.parse(Cookies.get("user"));
      const doctor = await dispatch(fatchDoctor());
      if (doctor.payload.data.length !== 0) {
        const me = doctor.payload.data.find(d => d.email === user.email);
        if (me) {
          setFormData({  name: me.name,
              email: me.email,
              address: me.address,
              speciality: me.speciality,
              availability: me.availability.length ? me.availability : [{ days:'', times:'' }],
              contact: me.contact,
              fees: me.fees });
          setIsEditing(true);
        }
      }
      
    }

    getDoctor();
  }, []);
 

  // 2) When doctorList arrives, check if there is a profile matching our email
  //    (assumes you have user’s email in formData.email or from auth)


  // 3) Handle form changes (including availability array)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('availability')) {
      const [_, index, field] = name.split('.');
      const updated = formData.availability.map((slot, idx) => {
        if (idx === Number(index)) {
          return { ...slot, [field]: value };  // Create a new object for this slot
        }
        return slot;
      });
      setFormData(f => ({ ...f, availability: updated }));
    } else {
      setFormData(f => ({ ...f, [name]: value }));
    }
  };
  

  const addDateField = () =>
    setFormData(f => ({
      ...f,
      availability: [...f.availability, { days: '', times: '' }]
    }));
  const removeDateField = idx =>
    setFormData(f => ({
      ...f,
      availability: f.availability.filter((_, i) => i !== idx)
    }));

  // 4) Submit: choose registration vs update
  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...formData,
      availability: formData.availability.map(s => ({
        days: s.days,
        times: s.times
      }))
    };

    const action = isEditing ? updateDoctorProfile : doctorRegistration;
    dispatch(action(payload)).then(res => {
      if (res.payload?.success) {
        alert(isEditing ? 'Profile updated' : 'Registration completed');
      } else {
        alert(res.payload?.message || 'Please fill all fields correctly');
      }
    });
  };

  if (isLoading) return <p className="p-4 text-center">Loading…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isEditing ? 'Edit Your Profile' : 'Doctor Registration'}
      </h2>

      {/* Render normal inputs */}
      {doctorRegistrationFormControl
        .filter(f => f.componentType !== 'dateLoop')
        .map((field, i) => (
          <div key={i} className="mb-4">
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

      {/* Availability */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Days & Times
        </label>
        {formData.availability.map((slot, idx) => (
          <div key={idx} className="mb-3 p-3 border border-gray-200 rounded-md">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Day</label>
                <select
                  name={`availability.${idx}.days`}
                  value={slot.days}
                  onChange={e => handleInputChange(e, idx)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                >
                  <option value="">Select a Day</option>
                  {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Times</label>
                <input
                  type="text"
                  name={`availability.${idx}.times`}
                  value={slot.times}
                  onChange={e => handleInputChange(e, idx)}
                  placeholder="09:00 AM, 11:00 AM"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                />
                <small className="text-gray-400 text-xs">Comma-separate multiple</small>
              </div>
            </div>
            {formData.availability.length > 1 && (
              <button
                type="button"
                onClick={() => removeDateField(idx)}
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
          <span className="mr-1">＋</span> Add another date
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        {isEditing ? 'Update Profile' : 'Register'}
      </button>
    </form>
  );
}
