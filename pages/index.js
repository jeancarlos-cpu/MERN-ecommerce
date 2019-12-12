import React from "react";
import fetch from "isomorphic-unfetch";

export default function Home({ products }) {
  return <>home</>;
}

Home.getInitialProps = async () => {
  const url = "http://localhost:3000/api/products";
  const data = await fetch(url);
  // console.log(data);
  const response = await data.json();
  return { products: response };
};
