const express=require('express');
const db=require('./config/dbConnect');
const cors = require('cors')
const Authrouter = require('./Routes/auht/auth-routes');
const cookieParser = require('cookie-parser');
const doctorRouter = require('./Routes/doctorroutes')
const contactRouter= require('./Routes/contactRoute')

const appointmentRoute= require('./Routes/appointmentroutes')
const DocRequestRouter = require("./Routes/requestVideo");
const videoRoutes=require('./Routes/meet')
const app=express()
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


app.use('/api/auth',Authrouter);
app.use('/api/doctor',doctorRouter)
app.use('/api/contact',contactRouter)
app.use('/api/appointment',appointmentRoute)
app.use('/api/request', DocRequestRouter)
app.use('/api/video', videoRoutes);

app.listen(PORT,()=> console.log(`app running on port ${PORT}`));