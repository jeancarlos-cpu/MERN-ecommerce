import { useState } from "react";
import CartItemsList from "../components/Cart/CartItemsList";
import CartSummary from "../components/Cart/CartSummary";
import { Segment, Divider } from "semantic-ui-react";
import { parseCookies } from "nookies";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";

export default function Cart({ user, products }) {
  const [cartProducts, setCartProducts] = useState(products);
  const handleRemove = async productId => {
    console.log(productId);
    const token = Cookie.get("token");
    const url = `${process.env.BASE_URL}/api/cart?productId=${productId}`;
    const config = {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    };
    const response = await fetch(url, config);
    const p = await response.json();
    setCartProducts(p.products);
  };
  return (
    <Segment>
      <CartItemsList
        user={user}
        products={cartProducts}
        handleRemove={handleRemove}
      />
      <Divider />
      <CartSummary products={cartProducts} />
    </Segment>
  );
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { products: [] };
  }
  const url = `${process.env.BASE_URL}/api/cart`;
  const config = { headers: { Authorization: token } };
  const response = await fetch(url, config);
  const products = await response.json();
  return { products };
};
