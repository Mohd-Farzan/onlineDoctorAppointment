const express = require('express');
const http = require('http'); // needed to bind with Socket.IO
const { Server } = require('socket.io');
const db = require('./config/dbConnect');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const Authrouter = require('./Routes/auht/auth-routes');
const doctorRouter = require('./Routes/doctorroutes');
const contactRouter = require('./Routes/contactRoute');
const appointmentRoute = require('./Routes/appointmentroutes');

// Controllers for chat
const chatRoutes = require('./Routes/chatRoutes');
const { setSocketIO } = require('./Controlller/chatController');

const app = express();
const server = http.createServer(app); // create server manually
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// Connect DB
db;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'OPTIONS', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Accept'],
  credentials: true,
}));
app.options('*', cors());
app.use(cookieParser());

// Routes
app.use('/api/auth', Authrouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/contact', contactRouter);
app.use('/api/appointment', appointmentRoute);
app.use('/api/chat', chatRoutes); // 👈 chat API route

// Set up WebSocket
setSocketIO(io); // Pass io to the controller

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
