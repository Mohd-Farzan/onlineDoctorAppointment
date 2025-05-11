import React, { useState } from "react";
import axios from "axios";
import logo from "./../../../public/images/Meeting.jpeg";

const ZoomMeetingCreator = () => {
  const [topic, setTopic] = useState("");
  const [meeting, setMeeting] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/create-meeting", { topic });
      setMeeting(res.data);
      setError("");
    } catch (err) {
      setMeeting(null);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top - Layout with form + image */}
      <div className="flex flex-col md:flex-row w-full flex-grow">
        {/* Left - Form */}
        <div className="flex flex-col justify-center px-8 py-12 md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Doc Meeting Creator</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="topic" className="block font-medium text-gray-700">Meeting Topic:</label>
              <input
                id="topic"
                type="text"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter topic"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Create Meeting
            </button>
          </form>
        </div>

        {/* Right - Image */}
        <div className="md:w-1/2  hidden md:block">
          <img
            src={logo}
            alt="Meeting"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom - Meeting Info */}
      <div className="p-6">
        {meeting && (
          <div className="bg-white p-6 rounded shadow mt-6">
            <h3 className="text-xl font-semibold mb-2">Meeting Created!</h3>
            <p><strong>Meeting Topic:</strong> {meeting.topic}</p>
            <p><strong>Meeting ID:</strong> {meeting.id}</p>
            <p>
              <strong>Join URL:</strong>{" "}
              <a href={meeting.join_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {meeting.join_url}
              </a>
            </p>
            <p>
              <strong>Start URL:</strong>{" "}
              <a href={meeting.start_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {meeting.start_url}
              </a>
            </p>
          </div>
        )}

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ZoomMeetingCreator;
