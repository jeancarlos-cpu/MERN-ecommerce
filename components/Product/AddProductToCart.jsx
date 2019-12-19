import { Input } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import cookie from "js-cookie";

export default function AddProductToCart({ user, productId }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => setSuccess(false), 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      const url = `${process.env.BASE_URL}/api/cart`;
      const config = {
        method: "PUT",
        headers: {
          Authorization: cookie.get("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity,
          productId
        })
      };
      const response = await fetch(url, config);
      if (!response.ok) throw new Error();
      setSuccess(true);
    } catch {
      alert("Error 404: Please login again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Input
      type="number"
      value={quantity}
      min="1"
      onChange={event => setQuantity(Number(event.target.value))}
      placeholder="Quantity"
      action={
        user && success
          ? {
              color: "green",
              content: "Item added to cart",
              icon: "check",
              labelPosition: "right",
              disabled: true
            }
          : user
          ? {
              icon: "plus cart",
              color: "teal",
              loading,
              disabled: loading,
              content: "Add to Cart",
              labelPosition: "right",
              onClick: handleAddProduct
            }
          : {
              color: "lightgrey",
              content: "Login to add",
              icon: "lock",
              labelPosition: "right",
              onClick: () => Router.push("/login")
            }
      }
    ></Input>
  );
}
