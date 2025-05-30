import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAppointment } from "@/store/appointment-slice";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
        alert.error("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };
    getAppointment();
  }, [dispatch]);

  const handleAccept = async (id) => {
    try {
      console.log(id,"B")
    } catch (error) {
      
    }
  }
  const handleReject = async (id) => {
    try {
      console.log(id,"A")
    } catch (error) {
      alert.error("error",error)
    }
  }
  const id = appointments._id

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Appointment Schedule</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-3 py-1">
            Total: {appointments.length}
          </Badge>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">{error}</div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No appointments scheduled</div>
          <p className="text-gray-400">When appointments are made, they'll appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  {appointment.patient?.patient || 'No Name Provided'}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {appointment.patient?.email || 'No email provided'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">
                      {appointment.patient?.days || 'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-700">
                      {appointment.patient?.times || 'Not specified'}
                    </span>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Reason:</span> {appointment.patient?.reason || 'Not specified'}
                      <span>id</span>
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleReject(apptId._id)}
                  className="hover:bg-red-50 hover:text-red-600"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleAccept(appointment._id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Accept
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Simple SVG icons (can be replaced with your own icons or library)
function CalendarDays(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function Clock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}