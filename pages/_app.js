import App from "next/app";
import Layout from "../components/_App/Layout";
import { redirectUser } from "../utils/auth";
import fetch from "isomorphic-unfetch";
import { parseCookies, destroyCookie } from "nookies";
import { Router } from "next/router";

export default class myApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        const url = `${process.env.BASE_URL}/api/account`;
        const config = {
          method: "GET",
          headers: {
            Authorization: token
          }
        };
        const response = await fetch(url, config);
        if (!response.ok) {
          throw new Error();
        }
        const user = await response.json();
        // const isRoot = user.role === "root";
        // const isAdmin = user.role === "admin";
        const isNotPermited =
          user.role === "user" && ctx.pathname === "/create";
        if (isNotPermited) redirectUser(ctx, "/");
        pageProps.user = user;
      } catch (error) {
        console.error(error.message);
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
      }
    }
    return { pageProps };
  }

  componentDidMount() {
    addEventListener("storage", this.syncLogout);
  }

  syncLogout = event => {
    if (event.key === "logout") {
      Router.push("/login");
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
