import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setDisabled(Object.values(product).some(field => field === ""));
  }, [product]);

  const handleChange = e => {
    const { value, name, files } = e.target;
    files ? setMediaPreview(window.URL.createObjectURL(files[0])) : null;
    setProduct(product => ({ ...product, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async e => {
    try {
      setLoading(true);
      setError("");
      e.preventDefault();
      const mediaUrl = await handleImageUpload();
      const url = `${process.env.BASE_URL}/api/product`;
      const { name, price, description } = product;
      const config = {
        method: "POST",
        body: JSON.stringify({
          name,
          price,
          description,
          mediaUrl
        }),
        headers: { "Content-Type": "application/json" }
      };
      const response = await fetch(url, config);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(`Error ${response.status}: ${data.message}`);
      }
      setProduct(INITIAL_PRODUCT);
      setMediaPreview("");
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="add circle" color="teal" />
        Create New Product
      </Header>
      <Form
        onSubmit={handleSubmit}
        success={success}
        loading={loading}
        error={Boolean(error)}
      >
        <Message error icon="x" header="Oops!" content={error} />
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
          disabled={disabled || loading}
          color="teal"
          icon="pencil"
          type="submit"
          content="Create"
        />
      </Form>
    </>
  );
}
