const mongoose = require('mongoose')
const userSchema=new mongoose.Schema({
    userName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
}, {timestamps:true}
);
const signupModel=mongoose.model('users',userSchema)
module.exports=signupModel