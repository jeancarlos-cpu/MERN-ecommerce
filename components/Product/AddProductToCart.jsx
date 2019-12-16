import { Input } from "semantic-ui-react";

export default function AddProductToCart() {
  return (
    <Input
      type="number"
      min="1"
      placeholder="Quantity"
      action={{
        icon: "plus cart",
        color: "teal",
        content: "Add to Cart",
        labelPosition: "right"
      }}
    ></Input>
  );
}
