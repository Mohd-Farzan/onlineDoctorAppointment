let ioInstance;

const setSocketIO = (io) => {
  ioInstance = io;
};

const sendMessage = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  ioInstance.emit('chat message', message);
  return res.status(200).json({ success: true, message: "Message broadcasted" });
};

module.exports = {
  setSocketIO,
  sendMessage
};
