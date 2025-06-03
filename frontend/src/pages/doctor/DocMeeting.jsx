import { createZoomMeeting } from '@/store/videoCall-slice';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ZoomButton = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { meeting, loading, error } = useSelector((state) => state.video);
  const doctorList = useSelector((state) => state.doctor.doctorList); // Get doctor list from redux

  // Get the speciality of the first doctor in the list (if any)
  const speciality = doctorList && doctorList.length > 0 ? doctorList[0].speciality : null;

  console.log("Speciality:", speciality);
  console.log("Doctor List:", doctorList);

  const handleClick = () => {
    dispatch(createZoomMeeting("Doctor Consultation"));
  };

const getRequest = async () => {
  try {
    if (!speciality) return;

    const res = await axios.get(`http://localhost:3000/api/getVideoRequests/${speciality}`);
    if (res.data.success) {
      setData(res.data.requests);
      console.log("Fetched requests:", res.data.requests);
    } else {
      setData([]);
      console.error("No requests found or error:", res.data.message);
    }
  } catch (err) {
    console.error("Error fetching video requests:", err);
  }
};
useEffect(() => {
  if (doctorList && doctorList.length > 0) {
    console.log("Speciality:", doctorList[0].speciality);
  }
}, [doctorList]);
 // re-run when speciality changes

  return (
    <div className="p-4 space-y-6">
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
      >
        {loading ? 'Creating Meeting...' : 'Create Zoom Meeting'}
      </button>

      {meeting && (
        <div className="mt-3">
          <p>
            <strong>Join URL:</strong>{' '}
            <a href={meeting.join_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {meeting.join_url}
            </a>
          </p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="text-left px-4 py-3 border-b">Email</th>
              <th className="text-left px-4 py-3 border-b">Phone Number</th>
              <th className="text-left px-4 py-3 border-b">Problem</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center px-4 py-4 text-gray-500">
                  No requests found.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{item.email}</td>
                  <td className="px-4 py-3 border-b">{item.phone}</td>
                  <td className="px-4 py-3 border-b">{item.problem}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ZoomButton;
