import Product from "../../models/product";

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
      const { name, price, description, mediaUrl } = JSON.parse(req.body);
      if (!name || !price || !description || !mediaUrl) {
        return res.status(422).send("one or more fields missing");
      }
      await new Product({
        name,
        price,
        description,
        mediaUrl
      }).save();
      res.status(201).send("OK");
      break;
    default:
      res.status(405).send("Method not allowed");
      break;
  }
};
