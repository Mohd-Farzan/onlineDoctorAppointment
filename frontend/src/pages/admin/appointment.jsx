import { useEffect, useState } from "react";
 function AcceptedAppointments() {
  const [search, setSearch] = useState("");
  

  const appointments = [
    { id: 1, doctor: "Dr. Smith", patient: "John Doe", date: "2025-02-24", time: "10:00 AM", status: "Accepted" },
    { id: 2, doctor: "Dr. Johnson", patient: "Jane Smith", date: "2025-02-25", time: "11:30 AM", status: "Accepted" },
    { id: 3, doctor: "Dr. Emily", patient: "Michael Brown", date: "2025-02-26", time: "02:00 PM", status: "Accepted" },
    { id: 4, doctor: "Dr. Emily Aman", patient: "Michael aman", date: "2025-02-27", time: "03:00 PM", status: "Rejected" },

  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.doctor.toLowerCase().includes(search.toLowerCase()) ||
      appointment.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Accepted Appointments</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search doctor or patient..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Doctor</th>
              <th className="py-3 px-6 text-left">Patient</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Time</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{appointment.doctor}</td>
                  <td className="py-4 px-6">{appointment.patient}</td>
                  <td className="py-4 px-6">{appointment.date}</td>
                  <td className="py-4 px-6">{appointment.time}</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-200 text-green-700 text-sm px-3 py-1 rounded-full">
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AcceptedAppointments