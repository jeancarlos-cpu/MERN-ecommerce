import { useState } from "react";
import fetch from "isomorphic-unfetch";
import { Form, Image, Message, Header, Icon } from "semantic-ui-react";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

export default function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    const { value, name, files } = e.target;
    files ? setMediaPreview(window.URL.createObjectURL(files[0])) : null;
    setProduct(product => ({ ...product, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const mediaUrl = await handleImageUpload();
    console.log(mediaUrl);
    const url = `${process.env.BASE_URL}/api/product`;
    const { name, price, description } = product;
    const config = {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        description,
        mediaUrl
      })
    };
    const response = await fetch(url, config);
    console.log(response);

    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
    setMediaPreview("");
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", product.media);
    data.append("upload_preset", "reactReserve");
    data.append("cloud_name", "dtcibpf8y");
    const config = {
      method: "POST",
      body: data
    };
    try {
      const response = await fetch(process.env.CLOUDINARY_URL, config);
      const { url } = await response.json();
      return url;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="add circle" color="teal" />
        Create New Product
      </Header>
      <Form onSubmit={handleSubmit} success={success}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted."
        />
        <Form.Group widths="equal" heights="equal">
          <Form.Input
            name="name"
            value={product.name}
            label="Name"
            placeholder="Name"
            type="text"
            onChange={handleChange}
          />
          <Form.Input
            name="price"
            value={product.price}
            label="Price"
            placeholder="Price"
            type="number"
            min="0.00"
            step="0.1"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Input
          name="media"
          label="Media"
          content="Select image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <Image src={mediaPreview} size="small" centered />
        <Form.TextArea
          name="description"
          value={product.description}
          label="Description"
          placeholder="Description"
          onChange={handleChange}
        />
        <Form.Button
          color="teal"
          icon="pencil"
          type="submit"
          content="Create"
        />
      </Form>
    </>
  );
}
