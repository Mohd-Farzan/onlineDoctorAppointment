import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fatchDoctor } from "@/store/doctor-slice"; // Make sure the spelling of "fetch" is correct

let socket;

function Chat() {
  const { id } = useParams(); // Get doctorId from URL
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const dispatch = useDispatch();

  const { doctorList } = useSelector((state) => state.doctor);
  const selectedDoctor = doctorList.find((doc) => doc._id === id);

  useEffect(() => {
    dispatch(fatchDoctor()); // Load doctor list on component mount
  }, [dispatch]);

  useEffect(() => {
    if (!socket) {
      socket = io("http://localhost:3000", {
        withCredentials: true,
      });
    }

    socket.on("chat message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await fetch("http://localhost:3000/api/chat/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ message, doctorId: id }),
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
      <div className="w-full max-w-3xl space-y-4">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg text-center font-semibold">
          {selectedDoctor ? selectedDoctor.name : "Loading..."}
        </div>
        <div className="bg-gray-100 p-4 rounded-b-lg h-96 overflow-y-auto border border-blue-600">
        
        {chat.map((msg, i) => (
  <div key={i} className="mb-2 bg-white p-2 rounded shadow-sm">
    <div className="font-semibold">{msg.clientName}</div>
    <div>{msg.message}</div>
    <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
  </div>
))}

          
        </div>
        <form onSubmit={sendMessage} className="flex space-x-2">
          <input
            type="text"
            className="flex-1 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white font-medium rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;