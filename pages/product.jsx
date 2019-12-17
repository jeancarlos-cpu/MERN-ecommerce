import fetch from "isomorphic-unfetch";
import ProductSummary from "../components/Product/ProductSummary";
import ProductAttributes from "../components/Product/ProductAttributes";

export default function Product({ product, user }) {
  return (
    <>
      <ProductSummary {...product} user={user} />
      <ProductAttributes {...product} />
    </>
  );
}

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = `${process.env.BASE_URL}/api/product?_id=${_id}`;
  const response = await fetch(url);
  const data = await response.json();
  return { product: data };
};
