import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const authController = {};
authController.createAccount = async (req, res) => {
  try {
    let saltRounds = 10;
    let { name, lastname, phone, password, email } = req.body;
    let hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      name,
      lastname,
      phone,
      password: hashPassword,
      imgPath: `/profile-photo/${req.file.filename}`,
      email,
    });
    const savedUser = await user.save();
    console.log(savedUser);
    res.json({ status: 200, message: "success update", redirectTo: "/login" });
  } catch (err) {
    res.status(500).json({
      message: "somethig went wrong",
      redirectTo: "no",
      err,
    });
  }
};
authController.login = async (req, res) => {
  let { password, email } = req.body;
  const storedUser = await User.findOne({ email }).exec();
//     console.log(storedUser);
//   if (storedUser === null) {
//     return res
//       .status(400)
//       .json({ message: "not user exist", redirectTo: "no" });
//   }

  const match = await bcrypt.compare(password, storedUser.password);
  if (!match) {
    return res.status(400).json({
      message: "email or password wrong",
      redirectTo: "no",
    });
  }
  let token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET_KEY);

  return res.status(200).json({
    message: "success login",
    redirectTo: "/home",
    data: {
      token,
      user: {
        name: storedUser.name,
        lastname: storedUser.lastname,
      },
    },
  });
};

export default authController;
