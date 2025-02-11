
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios";
import { useEffect, useState } from "react";
import profile from '../../assets/img/profile.png'
import { Separator } from "@/components/ui/separator";
function DoctorProfile() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setDoctors(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <p className="text-center">Loading doctors...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  return (
    <>
    <div className="bg-white rounded-lg shadow-sm p-6">
       {doctors.map((doctor) => (
      <div key={doctor.id} className="flex gap-6 mb-4 justify-start border-b-2 p-2">
        <img
          src={profile}
          alt="Doctor profile"
          width={120}
          height={100}
          className="rounded-full"
        />
        <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
          <p>Specialization: General Physician</p> {/* Placeholder */}
          <p>Experience: {Math.floor(Math.random() * 20) + 1} years</p> {/* Fake Experience */}
          <p>Location: {doctor.address.city}, {doctor.address.street}</p>
          <p>Contact: {doctor.phone}</p>
          <div className="flex justify-end gap-4 mt-auto">
          <Button>View Profile</Button>
          <Button>Book Appointment</Button>
        </div>
        {/* {index !== doctors.length - 1 && <hr className="my-4 border-t border-gray-300" />} */}
        </div>
      </div>
      ))}
             
      {/* <p className="text-gray-600 mb-4">Mr. Prashant Shukla is a Nutrition advisor and Consultant Dietitian.</p>
      <Button variant="link" className="text-primary p-0">
        Share your story
      </Button>
      <Tabs defaultValue="info" className="mt-6">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="consult">Consult Q&A</TabsTrigger>
          <TabsTrigger value="healthfeed">Healthfeed</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="mt-6">
          <h2 className="font-semibold mb-4">Kalyanpur, Kanpur</h2>
          <div className="border rounded-lg p-4">
            <h3 className="text-primary font-medium mb-2">Blooming Life Style</h3>
            <p className="text-gray-600 text-sm mb-4">
              102/3 Radhapuram Gooba Garden IIT kalyanpur Kanpur, Landmark: IIT KALYANPUR, Kanpur
            </p>
            <div className="flex justify-between items-center bg-blue-800">
              <div>
                <p className="text-sm text-gray-600 mb-1">Mon - Sat</p>
                <p className="text-sm text-gray-600">10:00 AM - 02:00 PM</p>
                <p className="text-sm text-gray-600">05:00 PM - 09:00 PM</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹500</p>
                <Button variant="link" className="text-primary p-0">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs> */}
    </div>
    </>
  )
}
export default DoctorProfile
