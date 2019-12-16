import CartItemsList from "../components/Cart/CartItemsList";
import CartSummary from "../components/Cart/CartSummary";
import { Segment, Divider } from "semantic-ui-react";

export default function Cart() {
  return (
    <Segment>
      <CartItemsList />
      <Divider />
      <CartSummary />
    </Segment>
  );
}
