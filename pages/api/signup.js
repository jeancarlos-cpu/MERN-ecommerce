import connectDb from "../../utils/connectDb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!isLength(name, { min: 3, max: 12 })) {
      return res
        .status(422)
        .json({ message: "Name must be at 3-12 characters" });
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .json({ message: "Password must be at least 6 characters" });
    } else if (!isEmail(email)) {
      return res.status(422).json({ message: "Email must be valid" });
    } else if (user) {
      return res.status(422).json("User already exists.");
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Plase try again later" });
  }
};
