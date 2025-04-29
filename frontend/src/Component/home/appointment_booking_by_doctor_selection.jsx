import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentData } from "@/store/appointment-slice";
import { fatchDoctor } from "@/store/doctor-slice";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function DoctorAppointmentForm({ doctorId }) {
  const dispatch = useDispatch();
  const { doctorList } = useSelector((state) => state.doctor);
  const [formData, setFormData] = useState({
    patient: "",
    doctorId: doctorId || "",
    days: "",
    times: "",
    reason: "",
  });

  // ensure doctors loaded
  useEffect(() => {
    dispatch(fatchDoctor());
  }, [dispatch]);

  // when doctorId prop changes, update formData
  useEffect(() => {
    if (doctorId) setFormData((f) => ({ ...f, doctorId }));
  }, [doctorId]);

  const selectedDoctor = doctorList.find((d) => d._id === formData.doctorId) || {};

  // build availableDates
  const availableDates = selectedDoctor.availability
    ? Array.from(
        new Set(
          selectedDoctor.availability.map((s) => s.days)
        )
      )
    : [];

  const availableTimes = selectedDoctor.availability
    ? selectedDoctor.availability
        .filter(
          (s) => s.days=== formData.days
        )
        .flatMap((s) => s.times)
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      appointmentData({
        patient: formData.patient,
        doctor: formData.doctorId,
        days: formData.days,
        times: formData.times,
        reason: formData.reason,
      })
    ).then((res) => {
      if (res.payload?.success) {
        alert("Appointment booked! Please check your email.");
        setFormData({ patient: "", doctorId: formData.doctorId, days: "", times: "", reason: "" });
      } else {
        alert("Failed to book appointment.");
      }
    });
  };

  return (
    <Dialog open={showBookingModal()} onOpenChange={() => setShowBookingModal(false)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#22a5d8]">
              Book Appointment: {selectedDoctor?.name}
            </DialogTitle>
            <DialogDescription>Please select a date, time and enter your details</DialogDescription>
          </DialogHeader>
          {/* {selectedDoctor && <DoctorAppointmentForm doctorId={selectedDoctor._id} />} */}
          <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Patient Name</label>
        <input
          type="text"
          name="patient"
          value={formData.patient}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <select
          name="days"
          value={formData.days}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded p-2"
        >
          <option value="" disabled>Select Day</option>
          {availableDates.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Time</label>
        <select
          name="times"
          value={formData.times}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded p-2"
        >
          <option value="" disabled>Select Time</option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows="3"
          required
          className="mt-1 w-full border rounded p-2"
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Confirm Booking
      </Button>
    </form>
        </DialogContent>
      </Dialog>
    
  );
}
