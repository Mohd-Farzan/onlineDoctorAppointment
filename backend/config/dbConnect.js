const mongoose=require('mongoose')
 mongoose.connect('mongodb+srv://ansarifarzan681:OXjpZB5O9z6D8mpL@cluster0.yyxfk.mongodb.net/drOppointment?retryWrites=true&w=majority')
//mongoose.connect('mongodb://localhost:27017/odappointment')
.then(function(){
    console.log('data base connected');
})
.catch(function(err){
    console.log(err);
})
module.exports=mongoose.connection