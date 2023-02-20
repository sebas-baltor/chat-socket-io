import User from "../models/User.js";
import { Router } from "express";
const userRouter = Router();
userRouter.post("/create", async (req,res) => {
  const newUser = new User({
    name: "Steven",
    lastName: "Jhones",
    phone: "5567923289",
    imgPath: "/someinternerUrl",
    friends:["63efec009d5d525700148405","63efec2fb98a5ac0b8ad9b98"]
  });
  const savedUser = await newUser.save();
  console.log(`User created ${savedUser}`);
  res.json("successfull creation").status(200)
});
// userRouter.get("/create")

export default userRouter;
