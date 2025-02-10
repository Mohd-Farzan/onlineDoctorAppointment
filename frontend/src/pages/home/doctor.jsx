import { useEffect, useState } from "react";
import axios from "axios";

const Doctor = () => {
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
    <div className="max-w-4xl mx-auto mt-10 bg-red-500 p-4">
      <h2 className="text-2xl font-bold text-center mb-5">Doctor Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="p-4 border rounded-lg shadow-md flex flex-col items-center text-white">
          <h3 className="text-xl font-semibold">{doctor.name}</h3>
          <p>Specialization: General Physician</p> {/* Placeholder */}
          <p>Experience: {Math.floor(Math.random() * 20) + 1} years</p> {/* Fake Experience */}
          <p>Location: {doctor.address.city}, {doctor.address.street}</p>
          <p>Contact: {doctor.phone}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Doctor;
