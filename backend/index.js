import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import * as dotenv from "dotenv";
import Message from "./models/Message.js";
dotenv.config();
// set up variables
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: "http://localhost:5173/" });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware router
app.use("/user", userRouter);
app.use("/", authRouter);
// socket io
io.on("connection", (socket) => {
  // console.log(`⚡ cliente connectado con id: ${socket.id}`);
  io.emit("connection", "connectado");
  socket.on("message", async(s) => {
    // console.log(`el mensaje fue para: ${s.friendId} y decia ${s.message}`);
    let {friendId,myId,message} = s;
    let today = Date.now();
    const mssg = new Message({from:myId,to:friendId,message,date:today})
    await mssg.save();
    socket.broadcast.emit(s.friendId,s)
  });
});
// runing the server
server.listen(3000, () => {
  console.log("server in port 3000");
});
