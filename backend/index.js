import express from "express";
import {Server} from "socket.io";
import HttpServer from "http";

const app = express();
const server = HttpServer.createServer(app);
// const server = server.createServer(app);
const io = new Server(server);
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
})
server.listen(3000,()=>{
    console.log("server in port 3000")
})

io.on("connection",(socket)=>{
    console.log("new client connected")
    socket.emit("connection",null);
})

