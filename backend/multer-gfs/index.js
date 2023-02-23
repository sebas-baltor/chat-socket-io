import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import * as dotenv from "dotenv";
dotenv.config()
// mongoose configuration
mongoose.set("strictQuery",false);
const connection = mongoose
  .connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test",
  })
  .catch((err) => {
    console.log(err);
  });
// multer storage
const storage = new GridFsStorage({
  db: connection,
});
// helper to upload images
const upload = multer({ storage });
// variable to retriving a the images 
let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "fs",
  });
  console.log(bucket);
});
// exporting to use like a middleware
export { upload, bucket };
