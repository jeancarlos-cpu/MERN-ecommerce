import jwt from "jsonwebtoken";
import Cart from "../../models/cart";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "not authorized" });
  }
  const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);

  switch (req.method) {
    case "GET":
      try {
        const { products } = await Cart.findOne({ user: userId }).populate({
          path: "products.product",
          model: "Product"
        });

        res.status(200).json(products);
      } catch {
        res.status(403).json({ message: "Please login again" });
      }
      break;
    case "PUT":
      try {
        const { quantity, productId } = req.body;
      } catch {
        res.status(403).json({ message: "Please login again" });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed." });
      break;
  }
};
