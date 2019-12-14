import Product from "../../models/product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const { _id } = req.query;
  switch (req.method) {
    case "GET":
      const product = await Product.findOne({ _id });
      res.status(200).json(product);
      break;
    case "DELETE":
      await Product.findOneAndDelete({ _id });
      res.status(200).json({});
      break;
    case "POST":
      const { name, price, description, mediaUrl } = req.body;
      console.log(name, price, description, mediaUrl);
      if (!name || !price || !description || !mediaUrl) {
        res.status(422).json("One or more fields missing");
        break;
      }
      await new Product({
        name,
        price,
        description,
        mediaUrl
      }).save();
      res.status(201).json("OK");
      break;
    default:
      res.status(405).json("Method not allowed");
      break;
  }
};
