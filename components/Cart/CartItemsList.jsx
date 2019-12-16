import { Header, Segment, Button, Icon } from "semantic-ui-react";

export default function CartItemsList() {
  const user = false;
  return (
    <Segment secondary textAlign="center">
      <Header icon>
        <Icon name="shopping basket" color="teal" />
        Your cart is empty
      </Header>
      <div>
        {user ? (
          <Button basic>View Products</Button>
        ) : (
          <Button basic>Login</Button>
        )}
      </div>
    </Segment>
  );
}
