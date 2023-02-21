import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import * as dotenv from "dotenv";
dotenv.config()
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

const storage = new GridFsStorage({
  db: connection,
});

const upload = multer({ storage });
let bucket;

mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "fs",
  });
  console.log(bucket);
});

export default { upload, bucket };
