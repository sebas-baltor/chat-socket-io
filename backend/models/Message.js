import mongoose from "mongoose";
const MessageSchema = mongoose.Schema({
    from: {
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    date:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const Message = mongoose.model("Message",MessageSchema);
export default Message;