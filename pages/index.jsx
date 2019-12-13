import React from "react";
import fetch from "isomorphic-unfetch";
import ProductList from "../components/Index/ProductList";

export default function Home({ products }) {
  return <ProductList products={products} />;
}

Home.getInitialProps = async () => {
  console.log(process.env.BASE_URL);
  const url = `${process.env.BASE_URL}/api/products`;
  const data = await fetch(url);
  const response = await data.json();
  return { products: response };
};
