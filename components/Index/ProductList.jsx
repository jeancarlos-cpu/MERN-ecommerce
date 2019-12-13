import { Card } from "semantic-ui-react";

export default function ProductList({ products }) {
  return (
    <Card.Group
      items={products.map(product => ({
        header: product.name,
        image: product.mediaUrl,
        meta: `$${product.price}`,
        color: "teal",
        fluid: true,
        childKey: product._id,
        href: `/product?_id=${product._id}`
      }))}
      itemsPerRow="3"
      stackable
    />
  );
}
