import { Header, Segment, Button, Icon, Item } from "semantic-ui-react";
import Router from "next/router";

export default function CartItemsList({ user, products, handleRemove }) {
  return products.length === 0 ? (
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
  ) : (
    <Item.Group
      items={products.map(p => ({
        childKey: p.product._id,
        header: (
          <Item.Header
            as="a"
            onClick={() => Router.push(`/product?_id=${p.product._id}`)}
          >
            {p.product.name}
          </Item.Header>
        ),
        image: p.product.mediaUrl,
        meta: `${p.quantity} x $${p.product.price}`,
        fluid: "true",
        extra: (
          <Button
            basic
            color="red"
            icon="remove"
            floated="right"
            onClick={() => {
              handleRemove(p.product._id);
            }}
          />
        )
      }))}
      divided
    />
  );
}
