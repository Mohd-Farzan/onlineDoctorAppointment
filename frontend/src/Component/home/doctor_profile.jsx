import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from '../../assets/img/profile.png'
import { fatchDoctor } from "@/store/doctor-slice";
import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BookingDialog from "./bookingDialog";

function DoctorProfiles() {
  const { doctorList, isLoading, error } = useSelector((state) => state.doctor);
  const user = useSelector((state)=>state.auth);
const [showContactModal, setShowContactModal] = useState(false)
const [showBookingConfirmation, setShowBookingConfirmation] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fatchDoctor());
  }, [dispatch]);
  function setShowBookingConfirmations(open){
    useState(true)
  }
  if (isLoading) return <p className="text-center py-8">Loading doctors...</p>;
  if (error) return <p className="text-center text-red-500 py-8">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 ">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Doctors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctorList.map((doctor) => (
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
                  <p className="text-gray-600 flex items-center gap-2">
                    <span>🏥 Address </span>
                    {doctor.address}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    
                     <span>⏰ Available:{doctor.availablity}
                     </span>
                  </p>
                  <p className=" font-medium">
                    Consultation Fee: ₹{doctor.fees}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-start justify-start sm:flex-col gap-2 mt-4">
                 <Button
            variant="outline"
            className="w-full h-auto py-2 border-gray-300 text-[#22a5d8]"
            onClick={() => setShowContactModal(true)}
          >
            <Phone className="w-4 h-4 mr-2" /> Contact Clinic
          </Button>
                  <Link to ='/home/book-appointment'> <Button className="bg-[#22a5d8] hover:bg-[#1d94c4] text-white w-full h-auto py-2 flex flex-col gap-2 mt-4 sm:flex-col">
                    Book Appointment
                  </Button></Link>
 {/* <Button
className="bg-[#22a5d8] hover:bg-[#1d94c4] text-white w-full h-auto py-2 flex flex-col"
onClick={() => <BookingDialog open={showBookingConfirmation} setOpen={setShowBookingConfirmations}/>}
> */}
{/* <span>Book Clinic Visit</span>
<span className="text-xs font-normal">No Booking Fee</span>
</Button>  */}

<Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#22a5d8] flex items-center">
              <Phone className="w-5 h-5 mr-2" /> Contact Clinic
            </DialogTitle>
            <DialogDescription>Amrapali Hospital - Dubagga, Lucknow</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#22a5d8] mt-0.5" />
              <div>
                <p className="font-medium">Phone Numbers</p>
                <p className="text-lg">+91 9876543210</p>
                <p className="text-lg">+91 9876543211</p>
                <p className="text-xs text-gray-500 mt-1">Available 9:00 AM - 9:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#22a5d8] mt-0.5" />
              <div>
                <p className="font-medium">Address</p>
                <p>Amrapali Hospital, Dubagga</p>
                <p>Lucknow, Uttar Pradesh 226001</p>
                <Button variant="link" className="text-[#22a5d8] h-auto p-0 mt-1">
                  Get Directions
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#22a5d8] mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p>contact@amrapalihospital.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#22a5d8] mt-0.5" />
              <div>
                <p className="font-medium">Clinic Hours</p>
                <p>Monday - Saturday: 9:00 AM - 9:00 PM</p>
                <p>Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#22a5d8] hover:bg-[#1d94c4]" onClick={() => setShowContactModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog> 
        
        {/* booking dialog */}

      {/* <Dialog open={showBookingConfirmation} onOpenChange={setShowBookingConfirmation} handleBookClinicVisit={handleBookClinicVisit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#22a5d8]">Book Clinic Visit</DialogTitle>
            <DialogDescription>Please select a time slot to book your appointment</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{doctor.id}</p>
                  <p className="text-sm text-gray-600">Gynecologist/Obstetrician</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹900</p>
                  <p className="text-xs text-green-600">No Booking Fee</p>
                </div>
              </div>

              <div className="border-t border-b border-gray-100 py-3 my-2">
                <p className="font-medium">Select Date & Time</p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="border border-[#22a5d8] bg-blue-50 rounded p-2 text-center">
                    <p className="text-sm font-medium">Today</p>
                    <p className="text-xs text-green-600">6 Slots</p>
                  </div>
                  <div className="border border-gray-200 rounded p-2 text-center">
                    <p className="text-sm font-medium">Tomorrow</p>
                    <p className="text-xs text-green-600">4 Slots</p>
                  </div>
                  <div className="border border-gray-200 rounded p-2 text-center">
                    <p className="text-sm font-medium">Tue, 11 Mar</p>
                    <p className="text-xs text-green-600">4 Slots</p>
                  </div>
                </div>

                <p className="font-medium mt-4 mb-2">Available Slots</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border border-[#22a5d8] bg-blue-50 text-[#22a5d8] rounded p-2 text-center text-sm">
                    06:00 PM
                  </div>
                  <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">06:30 PM</div>
                  <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">07:00 PM</div>
                  <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">07:30 PM</div>
                  <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">08:00 PM</div>
                  <div className="border border-[#22a5d8] text-[#22a5d8] rounded p-2 text-center text-sm">08:30 PM</div>
                </div>
              </div>

              <div>
                <p className="font-medium">Patient Details</p>
                <p className="text-sm text-gray-600">Please fill in your details to complete the booking</p>
                <Button className="bg-[#22a5d8] hover:bg-[#1d94c4] w-full mt-3">Continue</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
                </div>
              </div>
           </div>
        ))} 
      </div>

     </div>
     </div>
);
 }

 export default DoctorProfiles

