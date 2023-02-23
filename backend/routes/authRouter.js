import { Router } from "express";
import {upload} from "../multer-gfs/index.js";
import authController from "../controllers/authController.js";
const authRouter = Router();

authRouter.post(
  "/create-account",
  upload.single("profilePhoto"),
  authController.createAccount
);
authRouter.post("/login", authController.login);

export default authRouter;