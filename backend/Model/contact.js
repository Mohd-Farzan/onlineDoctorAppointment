const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    phone:{
        type:Number
    },
    message:{
        type:String
    }
}, {timestamps:true}
);
const contact=mongoose.model('contact',userSchema);
module.exports=contact