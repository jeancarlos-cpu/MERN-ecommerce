import App from "next/app";
import Layout from "../components/_App/Layout";

export default class myApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Layout>
        <Component />
      </Layout>
    );
  }
}
