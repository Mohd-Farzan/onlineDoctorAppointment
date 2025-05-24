import { appointmentData } from "@/store/appointment-slice";
import { fatchDoctor } from "@/store/doctor-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";


const initialState = {
  patient: "",
  doctorId: "",
  email:"",
  days: "",
  times: "",
  reason: "",
};

export default function AppointmentForm() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  // Pull in your doctor docs
  const rawDoctorList = useSelector((state) => state.doctor?.doctorList || []);
  const doctorList = rawDoctorList.map((doc) =>
    doc._doc
      ? { ...doc._doc, id: doc._doc._id }
      : doc
  );

  useEffect(() => {
    dispatch(fatchDoctor());
  }, [dispatch]);

  // Reset days/time when doctor or days changes
  useEffect(() => {
    if (formData.doctorId) setFormData((p) => ({ ...p, days: "", times: "" }));
  }, [formData.doctorId]);
  useEffect(() => {
    if (formData.days) setFormData((p) => ({ ...p, times: "" }));
  }, [formData.days]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(appointmentData({
      doctorId: formData.doctorId,
      patient: formData.patient,
      email: formData.email,
      reason: formData.reason,
      days: formData.days,
      times: formData.times})).then((res) => {
      if (res?.payload?.success) {
        alert("Your Appointment Is Booked now check Your Email");
        navigate("/home/welcome")
        setFormData(initialState);
      } else {
        alert("Something went wrong…");
      }
    });
  };
  console.log(doctorList,"appointment Data")

  const selectedDoctor = doctorList.find(d => d._id === formData.doctorId);
  const availableDays = selectedDoctor?.availability
  ? Array.from(new Set(
      selectedDoctor.availability.map(slot => slot.days)
    )).sort()
  : [];


// Get available times for selected day
const availableTimes = selectedDoctor?.availability
  ?.filter(slot => slot.days === formData.days)
  .flatMap(slot => slot.times || [])
  .sort()
  || [];


    console.log(formData,"formDATA")
    console.log(formData.doctorId,"DOCTOR")

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Book an Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
           <label className="block text-sm font-medium text-gray-700">
             Your Email
          </label>
           <input
             type="email"
             name="email"
             value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Doctor
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-blue-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>-- Choose Doctor --</option>
              {doctorList.map(doctor => (
                <option key={doctor.id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        

          {/* days Selection */}
          {formData.doctorId && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Available days
              </label>
              <select
                name="days"
                value={formData.days}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select days</option>
                {availableDays.map(days => (
                  <option key={days} value={days}>
                    {days}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Time Selection */}
          {formData.days && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Available Times
              </label>
              <select
                name="times"
                value={formData.times}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Time</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason for Appointment
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="3"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
