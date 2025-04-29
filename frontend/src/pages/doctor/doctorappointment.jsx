import React from "react";
import { Button } from "@/components/ui/button";

const appointments = [
  {
    id: 1,
    name: "John Doe",
    time: "April 29, 2025 - 10:00 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    time: "April 29, 2025 - 11:30 AM",
  },
  {
    id: 3,
    name: "Alice Johnson",
    time: "April 29, 2025 - 01:00 PM",
  },
];

export default function AppointmentSchedule() {
  const handleAccept = (id) => {
    console.log("Accepted appointment with ID:", id);
    alert("accept")
  };

  const handleReject = (id) => {
    console.log("Rejected appointment with ID:", id);
  };

  return (
    <>
        <h1>Appoitment Schedule</h1>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="rounded-2xl shadow-md p-4 bg-white">
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{appointment.name}</h2>
              <p className="text-gray-500">{appointment.time}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleAccept(appointment.id)}
              >
                Accept
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => handleReject(appointment.id)}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
