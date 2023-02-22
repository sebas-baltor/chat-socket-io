import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    lastname:{
        type:String,
        required:true
    },
    friends:{
        type:Array,
        required:false
    },
    imgPath:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const User = mongoose.model("User",UserSchema);
export default User;