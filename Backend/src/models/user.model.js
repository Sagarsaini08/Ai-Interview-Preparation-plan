const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "Name has already taken"],
        required:true,
    },
    email:{
        type:String,
        unique:[true,"Account already taken"],
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

});

const userModel=mongoose.model("users",UserSchema);
module.exports=userModel;