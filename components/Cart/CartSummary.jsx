import { Button, Segment, Divider } from "semantic-ui-react";

export default function CartSummary({ products }) {
  const total =
    Math.floor(
      products.reduce((acc, p) => acc + p.product.price * p.quantity, 0) * 100
    ) / 100;

  return (
    <Segment clearing size="large">
      <strong>Subtotal: </strong> ${total}
      <Button
        icon="cart"
        color="teal"
        floated="right"
        labelPosition="right"
        content="Checkout"
        disabled={!products.length}
      />
    </Segment>
  );
}
