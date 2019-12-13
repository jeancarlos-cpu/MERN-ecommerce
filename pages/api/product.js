import Product from "../../models/product";

export default async (req, res) => {
  const { _id } = req.query;
  try {
    const product = await Product.findOne({ _id });
    res.status(200).json(product);
  } catch (e) {
    res.status(404).send("Product not found");
  }
};
