const mongoose=require('mongoose')
const requestData=new mongoose.Schema({
    email:{
        type:String
    },
    problem:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
})
module.exports = mongoose.model("requestDataModel",requestData);
