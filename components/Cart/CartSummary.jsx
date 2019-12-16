import { Button, Segment, Divider } from "semantic-ui-react";

export default function CartSummary() {
  return (
    <Segment clearing size="large">
      <strong>Subtotal: </strong> $0.00
      <Button
        icon="cart"
        color="teal"
        floated="right"
        labelPosition="right"
        content="Checkout"
      />
    </Segment>
  );
}
