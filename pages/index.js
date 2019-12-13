import React from "react";
import fetch from "isomorphic-unfetch";

export default function Home({ products }) {
  console.log(products);
  return <>home</>;
}

Home.getInitialProps = async () => {
  const url = "http://localhost:3000/api/products";
  const data = await fetch(url);
  const response = await data.json();
  return { products: response };
};
