import { fatchDoctor } from "@/store/doctor-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  patientName: "",
  doctor: "",
  date: "",
  time: "",
  reason: "",
};

export default function AppointmentForm() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const doctorList = useSelector((state) => state.doctor?.doctorList || []);
 useEffect(() => {
    dispatch(fatchDoctor());
  }, [dispatch]);

  console.log("Doctor List:", doctorList);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Booked:");
    alert("Your appointment has been booked successfully!",formData);
    setFormData(initialState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Book an Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
            <select
    name="doctor"
    value={formData.doctor}
    onChange={handleChange}
    required
    className="w-full p-2 border border-blue-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="" disabled >-- Choose Doctor --</option>
    {doctorList.map((doctor, index) => (
      <option key={index} value={doctor.name}>
        {doctor.name}
      </option>
    ))}
  </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Reason for Appointment */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Reason for Appointment</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="3"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Book Appointment 
          </button>
        </form>
      </div>
    </div>
  );
}
