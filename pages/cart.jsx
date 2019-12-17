import CartItemsList from "../components/Cart/CartItemsList";
import CartSummary from "../components/Cart/CartSummary";
import { Segment, Divider } from "semantic-ui-react";
import { parseCookies } from "nookies";

export default function Cart({ user }) {
  return (
    <Segment>
      <CartItemsList user={user} />
      <Divider />
      <CartSummary />
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
  return products;
};
