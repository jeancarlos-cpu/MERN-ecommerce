import User from "../../models/user";
import connectDb from "../../utils/connectDb";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
