import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import * as dotenv from "dotenv";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
dotenv.config();
// set up variables
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: "http://localhost:5173/" });
mongoose.set("strictQuery", true);
// const connection = mongoose
//   .connect(process.env.MONGO_DB_CONNECTION, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "test",
//   })
//   .catch((err) => console.log(err));
// const storage = new GridFsStorage({
//   db: connection,
//   // file: (req, file) => {
//   //   return new Promise((resolve, reject) => {
//   //     const filename = Date.now()+file.originalname;
//   //     const fileInfo = {
//   //       filename: filename,
//   //       bucketName: "photos"
//   //     };
//   //     resolve(fileInfo);
//   //   });
//   // },
// });
// const upload = multer({ storage });
// let bucket;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware router
app.use("/",userRouter);
app.use("/",authRouter);

io.on("connection", (socket) => {
  console.log(`⚡ cliente connectado con id: ${socket.id}`);
  io.emit("connection", "connectado");
  socket.on("count", (arg) => {
    console.log(`el contador es de ${arg}`);
    io.emit("count", arg);
  });
});
// mongoose.connection.on("connected", () => {
//   var db = mongoose.connections[0].db;
//   bucket = new mongoose.mongo.GridFSBucket(db, {
//     bucketName: "fs",
//   });
//   console.log(bucket);
// });

// app.post("/test-multer", upload.single("test"), (req, res) => {
//   console.log(req.file);
//   if (req.file) {
//     console.log(req.file);
//     res.json("upload succesfully");
//   } else {
//     res.json("maybe the file wasn't oploaded");
//   }
// });
// app.get("/test-multer/:filename", (req, res) => {
//   const { filename } = req.params;
//   const file = bucket
//     .find({
//       filename,
//     })
//     .toArray((err, files) => {
//       if (!files || files.length === 0) {
//         return res.status(404).json({
//           err: "no files exist",
//         });
//       }
//       bucket.openDownloadStreamByName(filename).pipe(res);
//     });
// });

server.listen(3000, () => {
  console.log("server in port 3000");
});
