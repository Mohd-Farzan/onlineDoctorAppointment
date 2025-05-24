import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fatchDoctor } from "@/store/doctor-slice"; // Ensure the correct path for the slice
import logo from "./../../../public/images/Meeting.jpeg";
const ChatPage = () => {
  const dispatch = useDispatch();
  const { doctorList, isLoading, error } = useSelector((state) => state.doctor);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fatchDoctor());
  }, [dispatch]);

  // Filter doctor list based on search query
  const filteredDoctors = doctorList.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="bg-gray-100 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-blue-500">DocMessage</h1>
      </nav>

      {/* Search Bar */}
      <form
        className="flex items-center gap-2 p-4"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="search"
          placeholder="Search Chat"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <button
          className="px-4 py-2 border border-green-500 text-green-600 rounded hover:bg-green-500 hover:text-white transition"
          type="submit"
        >
          Search
        </button>
      </form>

      {/* Chat Cards */}
      <div className="m-4 space-y-4">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading doctors...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading doctors.</p>
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="shadow-md border-2 border-gray-200 rounded p-4 hover:shadow-lg transition"
            >
              <Link to={`/home/chat/${doctor._id}`} className="no-underline text-inherit">
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <img
                      className="rounded-full w-10 h-10"
                      src={doctor.photo || logo}
                      alt={doctor.name}
                    />
                    <span className="ml-4 font-medium text-black">{doctor.name}</span>
                  </li>
                  <li className="ml-14 text-gray-500">
                    {doctor.latestMessage || "No recent message."}
                  </li>
                </ul>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
