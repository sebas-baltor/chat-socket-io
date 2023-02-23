import { Router } from "express";
import userController from "../controllers/userController.js";
import middleware from "../middleware/index.js";
const userRouter = Router();

// Get
userRouter.get("/:id", middleware.verifyToken, userController.getById);
userRouter.get("/profile-photo/:filename", userController.profilePhoto); // no middleware required
userRouter.get("/friends/:id",middleware.verifyToken,userController.getFriends)
// Patch
userRouter.patch(
  "/friend-request/:id/:friendId",
  middleware.verifyToken,
  userController.friendRequest
);
userRouter.patch(
  "/friend-remove/:id/:friendId",
  middleware.verifyToken,
  userController.removeFriendship
);
export default userRouter;
