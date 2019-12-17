import { Header, Segment, Button, Icon } from "semantic-ui-react";
import Router from "next/router";

export default function CartItemsList({ user }) {
  return (
    <Segment secondary textAlign="center">
      <Header icon>
        <Icon name="shopping basket" color="teal" />
        Your cart is empty
      </Header>
      <div>
        {user ? (
          <Button basic onClick={() => Router.push("/")}>
            View Products
          </Button>
        ) : (
          <Button basic onClick={() => Router.push("/login")}>
            Login
          </Button>
        )}
      </div>
    </Segment>
  );
}
