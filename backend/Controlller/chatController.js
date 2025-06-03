let ioInstance = null;

// Function to set the Socket.IO instance from main server
const setSocketIO = (io) => {
  ioInstance = io;
};

// Function to send a message via Socket.IO
const sendMessage = (req, res) => {
  const { message, username, clientName } = req.body;

  // Basic validation
  if (!message ) {
    return res.status(400).json({ error: "Message, username, and clientName are required" });
  }

  const fullMessage = {
    message,
    username,
    clientName,
    timestamp: new Date().toISOString(), // Optional: include timestamp
  };
console.log(fullMessage)
  // Emit to all connected clients
  try{
    if (ioInstance) {
      ioInstance.emit("chat message", fullMessage);
      return res.status(200).json({ success: true, message: "Message broadcasted" });
      
    } else {
      return res.status(500).json({ error: "Socket.io not initialized" });
    }
  }
  catch(err){
    console.error(err);
  }
};

module.exports = {
  setSocketIO,
  sendMessage,
};
