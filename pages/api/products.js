// import products from "../../public/static/products.json";
import Product from "../../models/product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    console.log(e);
  }
};
