const express=require('express');
const db=require('./config/dbConnect');
const cors = require('cors')
const Authrouter = require('./Routes/auht/auth-routes');
const cookieParser = require('cookie-parser');
const doctorRouter = require('./Routes/doctorroutes')
const contactRouter= require('./Routes/contactRoute')
// const { createServer } = require('node:http');
// const { Server } = require('socket.io');
const appointmentRoute= require('./Routes/appointmentroutes')
const chatRoutes=require('./Routes/chatRoutes')
const DocRequestRouter = require("./Routes/requestVideo");
const videoRoutes=require('./Routes/meet')
const app=express()

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// });
db;
const PORT=process.env.PORT || 3000
require('dotenv').config();
app.use(express.json());


app.use(cors({
    origin: 'https://pc-pulsecare.netlify.app', 
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'OPTIONS','PUT'], 
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Accept'
    ],
    credentials: true,
}));
app.options('*', cors());

app.use(cookieParser());
// Add Socket.IO connection handler
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('join_chat', (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room ${roomId}`);
//   });

//   socket.on('send_message', (data) => {
//     io.to(data.roomId).emit('receive_message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

app.use('/api/auth',Authrouter);
app.use('/api/doctor',doctorRouter)
app.use('/api/contact',contactRouter)
app.use('/api/appointment',appointmentRoute)
app.use("/api", DocRequestRouter)
// app.use('/api/chat', chatRoutes); 
app.use('/api/video', videoRoutes);
app.listen(PORT,()=> console.log(`app running on port ${PORT}`));