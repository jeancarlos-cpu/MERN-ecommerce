import { Input } from "semantic-ui-react";
import { useState } from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import cookie from "js-cookie";

export default function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddProduct = async () => {
    const url = `${process.env.BASE_URL}/api/cart`;
    const config = {
      method: "PUT",
      headers: {
        Authorization: cookie.get("token")
      },
      body: {
        quantity,
        productId
      }
    };
    await fetch(url, config);
  };

  return (
    <Input
      type="number"
      value={quantity}
      min="1"
      onChange={event => setQuantity(Number(event.target.value))}
      placeholder="Quantity"
      action={
        user
          ? {
              icon: "plus cart",
              color: "teal",
              content: "Add to Cart",
              labelPosition: "right",
              onClick: () => handleAddProduct
            }
          : {
              color: "lightgrey",
              content: "Sign up",
              icon: "signup",
              labelPosition: "right",
              onClick: () => Router.push("/login")
            }
      }
    ></Input>
  );
}
