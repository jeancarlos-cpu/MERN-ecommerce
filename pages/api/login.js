import connectDb from "../../utils/connectDb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      return res.status(200).json({ token });
    } else {
      return res.status(404).json({ message: "Cretentials do not match." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Please try again later." });
  }
};
