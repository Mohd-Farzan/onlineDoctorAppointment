import { useState } from "react"
import { SearchIcon, UserIcon } from "lucide-react"
import {Link} from 'react-router-dom'

export default function Dashboard() {

  return (
    <>

        {/* <main className="flex-1 overflow-x-hidden overflow-y-auto"> */}
          <div className="  flex-1">
            {/* <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3> */}

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard    title="Total Patients" value="2000+" subtitle="Till Today" bgColor="bg-blue-500" />
              <StatCard   title="Today's Patients" value="068" subtitle="3/22/2025" bgColor="bg-yellow-500" />
              <StatCard   title="Today's Appointments" value="085" subtitle="3/22/2025" bgColor="bg-green-500" />
            </div>

            <div className="mt-8  gap-6 scroll-m-5  ">
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-gray-700 text-lg font-semibold pb-4">Today's Patients</h2>
                <TodayPatientsTable />
              </div>
              <div className="bg-white mt-5 shadow rounded-lg p-4">
                <h2 className="text-gray-700 text-lg font-semibold pb-4">Next Patients</h2>
                <NextPatientsTable />
              </div>
            </div>

            <div className="mt-8 bg-white shadow rounded-lg p-4">
              <h2 className="text-gray-700 text-lg font-semibold pb-4">Doctor Names</h2>
              <DoctorNamesTable />
            </div>
          </div>
        {/* </main> */}
    </>
  )
}

function StatCard({ title, value, subtitle, bgColor }) {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 text-white`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-sm mt-2">{subtitle}</p>
    </div>
  )
}

function TodayPatientsTable() {
  const patients = [
    { name: "M.J Jackson", time: "12:00" },
    { name: "Ms Johnson", time: "12:30" },
    { name: "Mariyam", time: "1:00" },
    // Add more patients as needed
  ]

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Patient
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Time
          </th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr key={index}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10">
                  {/* <img className="w-full h-full rounded-full" src={logo}  alt="Patient" /> */}
                </div>
              </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{patient.name}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{patient.time}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function NextPatientsTable() {  
  const patients = [
    { id: 1, name: "John Doe", doctorName: "Dr. Smith", appointmentNo: 1, disease: "Flu", status: "Waiting" },
    {
      id: 2,
      name: "Jane Smith",
      doctorName: "Dr. Johnson",
      appointmentNo: 2,
      disease: "Check-up",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Jane Smith",
      doctorName: "Dr. Johnson",
      appointmentNo: 2,
      disease: "Check-up",
      status: "In Progress",
    },
    // Add more patients as needed
  ]

  return (
    <div className="overflow-x-auto">
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          {["ID", "Name", "Doctor Name", "Appointment No", "Disease", "Status"].map((header) => (
            <th
              key={header}
              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id} className="hover:bg-gray-50">
            {[
              patient.id,
              patient.name,
              patient.doctorName,
              patient.appointmentNo,
              patient.disease,
              patient.status,
            ].map((value, index) => (
              <td
                key={index}
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
              >
                <p className="text-gray-900 whitespace-nowrap">{value}</p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  )
}

function DoctorNamesTable() {
  const doctors = [
    {
      name: "Dr. John Smith",
      position: "Cardiologist",
      office: "New York",
      age: 45,
      startDate: "2015/01/01",
      salary: "$200,000",
    },
    {
      name: "Dr. Sarah Johnson",
      position: "Pediatrician",
      office: "Los Angeles",
      age: 38,
      startDate: "2018/06/15",
      salary: "$180,000",
    },
    // Add more doctors as needed
  ];

  const headers = ["Name", "Position", "Office", "Age", "Start Date", "Salary"];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {Object.values(doctor).map((value, idx) => (
                <td
                  key={idx}
                  className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                    idx === 3 || idx === 5 ? "text-center" : "text-left"
                  }`}
                >
                  <p className="text-gray-900 whitespace-nowrap">{value}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
