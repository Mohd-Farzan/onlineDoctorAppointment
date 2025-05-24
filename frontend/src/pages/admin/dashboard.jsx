import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorRegistration, fatchDoctor } from "@/store/doctor-slice"; // Ensure correct function name
import { SearchIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const { doctorList, loading, error } = useSelector((state) => state.doctor); // Extract loading and error states
  const patients = [
    { name: "M.J Jackson", time: "12:00" },
    { name: "Ms Johnson", time: "12:30" },
    { name: "Mariyam", time: "1:00" },
  ];

  useEffect(() => {
    dispatch(fatchDoctor()); // Ensure this action fetches the doctor list
  }, [dispatch]);

  console.log("Doctor List:", doctorList); // Debug: Check the structure of doctorList

  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex-1">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Patients */}
        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold">Total Patients</h3>
          <p className="text-4xl font-bold mt-2">{patients.length}</p>
          <span className="text-sm opacity-80">Till Today</span>
        </div>

        {/* Today's Patients */}
        <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold">Today's Patients</h3>
          <p className="text-4xl font-bold mt-2">{patients.length}</p>
          <span className="text-sm opacity-80">3 March 2025</span>
        </div>

        {/* Today's Appointments */}
        <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold">Today's Appointments</h3>
          <p className="text-4xl font-bold mt-2">{doctorList?.length ?? 0}</p> {/* Safely access length */}
          <span className="text-sm opacity-80">3 March 2025</span>
        </div>
      </div>

      <div className="mt-8 gap-6 scroll-m-5">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-700 text-lg font-semibold pb-4">Today's Patients</h2>
          <TodayPatientsTable />
        </div>
      </div>
      <div className="bg-white mt-4 shadow rounded-lg p-4">
        <h2 className="text-gray-700 text-lg font-semibold pb-4">Next's Patients</h2>
        <NextPatientsTable />
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-4">
        <h2 className="text-gray-700 text-lg font-semibold pb-4">Doctor Names</h2>
        <DoctorNamesTable doctorList={Array.isArray(doctorList) ? doctorList : []} /> {/* Ensure doctorList is always an array */}
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, bgColor }) {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 text-white`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-sm mt-2">{subtitle}</p>
    </div>
  );
}

function TodayPatientsTable() {
  const patients = [
    { name: "M.J Jackson", time: "12:00" },
    { name: "Ms Johnson", time: "12:30" },
    { name: "Mariyam", time: "1:00" },
  ];
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{patient.name}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{patient.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NextPatientsTable() {
  const patients = [
    { name: " Jackson", time: "12:00" },
    { name: "Ms Johnson", time: "12:30" },
    { name: "Mariyam", time: "1:00" },
    { name: "Mariyam", time: "1:00" },
  ];
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{patient.name}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{patient.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DoctorNamesTable({ doctorList }) {
  // Ensure doctorList is an array before using .map
  if (!Array.isArray(doctorList)) {
    return <p className="text-gray-700">No doctors available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            {['Name', 'Specialty', 'Availability', 'Start Date', 'Salary'].map((header, index) => (
              <th key={index} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctorList.map((doctor, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{doctor.name}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{doctor.speciality}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{doctor.availablity}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{doctor.time}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{doctor.fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;