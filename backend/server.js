const express=require('express');
const db=require('./config/dbConnect');
const cors = require('cors')
const Authrouter = require('./Routes/auht/auth-routes');
const cookieParser = require('cookie-parser');
const doctorRouter = require('./Routes/doctorroutes')
const app=express()
db;
const PORT=process.env.PORT || 3000

//Correct CORS middleware configuration
app.use(cors({
    origin: 'http://localhost:5173', // Ensure this matches your frontend's origin
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'OPTIONS','PUT'], // Correct spelling and add 'OPTIONS'
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Accept' // Correct spelling here
    ],
    credentials: true, // Allow credentials
}));
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',Authrouter);
app.use('/api/doctor',doctorRouter)




app.listen(PORT,()=> console.log(`app running on port ${PORT}`));