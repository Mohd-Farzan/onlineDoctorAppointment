import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie'

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

function Chat() {
  const { id } = useParams(); // doctor ID from URL
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const { doctorList } = useSelector((state) => state.doctor);
  const { user } = useSelector((state) => state.auth); // ✅ GET user info from Redux

  const selectedDoctor = doctorList.find((doc) => doc._id === id);

//   useEffect(() => {
//     // Initialize socket connection
//     socket.socketRef.current = io("http://localhost:3000", {
//       withCredentials: true,
//       auth: {
//         token: Cookies.get('token') // Send JWT token
//       }
//     });

//     // Join chat room
//     socket.socketRef.current.emit('join_chat', `chat_${id}`);

//     // Message listener
//     socket.socketRef.current.on('receive_message', (data) => {
//       setChat((prev) => [...prev, data]);
//     });

//     // Cleanup
//     return () => {
//       if (socket.socketRef.current) {
//         socket.socketRef.current.off('receive_message');
//         socket.socketRef.current.disconnect();
//       }
//     };
//   }, [id]);

  function sendMessage(e,message){
    e.preventDefault();
    if (!message.trim()) return;

    const msgPayload = {
      message,
      username: user?.role || "user",
      clientName: user?.name || "Anonymous",
      timestamp: new Date().toISOString(),
    };

     fetch("http://localhost:3000/api/chat/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(msgPayload),
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
      <div className="w-full max-w-3xl space-y-4">
        <div className="bg-blue-600 text-white p-4 rounded-t-lg text-center font-semibold">
          {selectedDoctor ? selectedDoctor.name : "Unknown Doctor"}
        </div>
      
        <div className="bg-gray-100 p-4 rounded-b-lg h-96 overflow-y-auto border border-blue-600">
          {chat.map((msg, i) => (
            <div key={i} className="mb-2 bg-white p-2 rounded shadow-sm">
              <div className="font-semibold text-blue-300">  {user?.userName || 'Guest'}</div>
              <div>{msg.message}</div>
              <div className="text-xs text-gray-500">
                {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : ""}
              </div>
            </div>
          ))}
        </div>

        <form className="flex space-x-2">
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
            onClick={(e)=>sendMessage(e,message)}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;