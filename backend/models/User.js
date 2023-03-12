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
    friends:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
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
    },request:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ]

})

const User = mongoose.model("User",UserSchema);
export default User;