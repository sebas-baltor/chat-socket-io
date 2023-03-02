import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const authController = {};
authController.createAccount = async (req, res) => {
  try {
    let saltRounds = 10;
    let { name, lastname, phone, password, email } = req.body;
    const userDb = await User.findOne({email});
    if(userDb){
      console.log("repetido")
      return res.status(406).json({
        message: "tu correo ya ha sido utilizado",
        redirectTo: "",
      });
    }
    let hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      name,
      lastname,
      phone,
      password: hashPassword,
      imgPath: `user/profile-photo/${req.file.filename}`,
      email,
    });
    const savedUser = await user.save();
    console.log("guardado");
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
  const user = await User.findOne({ email });
  console.log(user)
  if(!user){
    return res.status(404).json({
      message: "no tienes cuenta",
      redirectTo: "",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(404).json({
      message: "email o contraseña incorrectos",
      redirectTo: "no",
    });
  }
  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  delete user.password;
  return res.status(200).json({
    message: "success login",
    redirectTo: "/home",
    data: {
      token,
      user
    },
  });
};

export default authController;
