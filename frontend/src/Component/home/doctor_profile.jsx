import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from '../../assets/img/profile.png';
import { fatchDoctor } from "@/store/doctor-slice";
import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BookingDialog from "./bookingDialog";
import AppointmentForm from "@/pages/home/appointmentForm";
import DoctorAppointmentForm from "./appointment_booking_by_doctor_selection";

function DoctorProfiles() {
  const { doctorList, isLoading, error } = useSelector((state) => state.doctor);
  const user = useSelector((state) => state.auth);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedDoctor,setSelectedDoctor]=useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fatchDoctor());
  }, [dispatch]);
  function handleDoctorDetailsInFormData(doctor){
    console.log(doctor._id,"doctorId")
  }
  if (isLoading) return <p className="text-center py-8">Loading doctors...</p>;
  if (error) return <p className="text-center text-red-500 py-8">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 ">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Doctors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctorList.map((doctor) => {
            const data = doctor._doc ?? doctor;
            const slot = Array.isArray(data.availability) && data.availability.length > 0
              ? data.availability[0]
              : null;

            const dayName = slot?.days || "No Upcoming Slots";
            const firstTime = slot?.times?.[0] ?? 'N/A';

            return (
              <div key={doctor.id} className="flex flex-col md:flex-row gap-6 p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                {/* Doctor Image */}
                <div className="shrink-0">
                  <img
                    src={profile}
                    alt="Doctor profile"
                    className="w-32 h-32 rounded-lg object-cover border-4 border-blue-50"
                  />
                </div>

                {/* Doctor Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mt-1">
                      {doctor.speciality}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className=" flex items-center gap-2">
                      <span>🏥 Address</span>
                      {doctor.address}
                    </p>
                    <p className=" flex items-center gap-2">
                      <span>⏰ Available: <span className="text-green-500 font-semibold">{dayName} </span> at <span className="text-green-500 font-semibold">{firstTime}</span> </span>
                    </p>
                    <p className=" font-medium">
                      Consultation Fee: ₹{doctor.fees}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col items-start justify-start sm:flex-col gap-2 mt-4 ">
                    <Button
                      variant="outline"
                      className="w-80% h-auto py-2 border-gray-300 text-[#22a5d8]"
                      onClick={() => setSelectedDoctor(doctor)}

                    >
                      <Phone className="w-4 h-4 mr-2" /> Contact Clinic
                    </Button>
                   
                    <Button 
                      className="w-full bg-[#22a5d8] hover:bg-[#1d94c4] text-white py-2"
                      onClick={() => { 
                     
                        <DoctorAppointmentForm setSelectedDoctor={data}  setShowBookingModal={true} /> }}
                    >

                                <Link className="font-bold text-lg mt-2" to="/home/book-appointment">
  Book Appointment</Link>

                    </Button>

                    {selectedDoctor && (
  <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl text-[#22a5d8] flex items-center">
          <Phone className="w-5 h-5 mr-2" /> Contact Clinic
        </DialogTitle>
        <DialogDescription>{selectedDoctor.hospital || selectedDoctor.address}</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-[#22a5d8] mt-0.5" />
          <div>
            <p className="font-medium">Phone Numbers</p>
            <p className="text-lg">{selectedDoctor.contact || "+91 6387980421"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-[#22a5d8] mt-0.5" />
          <div>
            <p className="font-medium">Email</p>
            <p>{selectedDoctor.email || "pulsecare51@gmail.com"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#22a5d8] mt-0.5" />
          <div>
            <p className="font-medium">Address</p>
            <p>{selectedDoctor.address || "Not Available"}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#22a5d8] hover:bg-[#1d94c4]" onClick={() => setSelectedDoctor(null)}>
          Close
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)}

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DoctorProfiles;