import { Router } from "express";
import * as storagePhotos from "../multer-gfs/index.js";
import authController from "../controllers/authController.js";
const authRouter = Router();

authRouter.post(
  "/create-account",
  storagePhotos.default.upload.single("profile-photo"),
  authController.createAccount
);
authRouter.post("/login", authController.login);

export default authRouter;