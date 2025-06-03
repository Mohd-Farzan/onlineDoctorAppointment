import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { acceptAppointment, showAppointment } from "@/store/appointment-slice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AppointmentSchedule() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppointment = async () => {
      try {
        setLoading(true);
        const result = await dispatch(showAppointment());
        if (result.payload?.data) {
          setAppointments(result.payload.data);
        } else {
          setError("Failed to load appointments");
          alert("Failed to load appointments");
        }
      } catch (err) {
        setError(err.message);
        alert("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };
    getAppointment();
  }, [dispatch]);

  const handleAccept = async (_id, email) => {
    try {
      const result = await dispatch(acceptAppointment({ _id, email }));
      if (acceptAppointment.fulfilled.match(result)) {
        alert("Appointment accepted");

        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === _id ? { ...appt, status: "accepted" } : appt
          )
        );
      } else {
        alert("Failed to accept appointment");
        console.error(result.payload || result.error);
      }
    } catch (error) {
      console.error("Error in handleAccept:", error);
      alert(error.message,"An error occurred");
    }
  };
useEffect(()=>{
            dispatch(showAppointment())
          },[dispatch])
  const handleReject = async (_id, email) => {
    // To implement later
  };

  if (loading) {
    return <p className="text-center py-10">Loading appointments...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error}</div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No appointments scheduled</div>
        <p className="text-gray-400">
          When appointments are made, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Appointment Schedule</h1>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          Total: {appointments.length}
        </Badge>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Patient Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reason
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {appointment.patient?.patient || "No Name Provided"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {appointment.patient?.email || "No Email Provided"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {appointment.patient?.days || "Not Specified"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {appointment.patient?.times || "Not Specified"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                  {appointment.patient?.reason || "Not Specified"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold capitalize text-green-400">
                  {appointment.patient?.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  {appointment.patient.status === "pending" ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleAccept(appointment._id, appointment.patient.email)
                        }
                        className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleReject(appointment._id, appointment.patient.email)
                        }
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <span className="text-gray-400">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
