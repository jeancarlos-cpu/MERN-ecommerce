import Product from "../../models/product";
import connectDb from "../../utils/connectDb";
import shortid from "shortid";

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
      if (!name || !price || !description || !mediaUrl) {
        res.status(422).json({ message: "One or more fields missing" });
        break;
      }
      try {
        await new Product({
          name,
          price,
          description,
          mediaUrl,
          sku: shortid.generate()
        }).save();

        res.status(201).json({ message: "OK" });
      } catch {
        res.status(500).json({ message: "Server error in creating product" });
      }
      break;
    default:
      res.status(405).json({ message: "Method not alloyed" });
      break;
  }
};
