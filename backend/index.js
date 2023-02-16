import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
const app = express();
const server = createServer(app);
const io = new Server(server,{cors:"http://localhost:5173/"});
app.use(cors());

io.on("connection", (socket) => {
  console.log(`⚡ cliente connectado con id: ${socket.id}`);
  io.emit("connection", "connectado");
  socket.on("count", (arg) => {
    console.log(`el contador es de ${arg}`);
    io.emit("count", arg);
  });
});
server.listen(3000, () => {
  console.log("server in port 3000");
});
