import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from '../../assets/img/profile.png'
import { fatchDoctor } from "@/store/doctor-slice";
import { Link } from "react-router-dom";

function DoctorProfiles() {
  const { doctorList, isLoading, error } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fatchDoctor());
  }, [dispatch]);

  if (isLoading) return <p className="text-center py-8">Loading doctors...</p>;
  if (error) return <p className="text-center text-red-500 py-8">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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
                    <span>🏥</span>
                    {doctor.address}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <span>⏰</span>
                    Available: {doctor.availablity}
                  </p>
                  <p className="text-blue-600 font-medium">
                    Consultation Fee: ₹{doctor.fees}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-start justify-start sm:flex-col gap-2 mt-4">
                  <Button variant="outline" className="w-full sm:w-auto">
                    View Profile 
                  </Button>
                  <Link to ='book-appointment'> <Button className="w-full  sm:w-auto bg-blue-600 hover:bg-blue-700">
                    Book Appointment
                  </Button></Link>
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