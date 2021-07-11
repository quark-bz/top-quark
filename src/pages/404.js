import React from "react";
import Header from "../components/Header.js";
import Container from "../components/home/HomeContainer";
import Footer from "../components/Footer";
import Head from "next/head";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Quark | Page Not Found</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div id="aboutBackgroundStyling"></div>
      <Container>404 Page Not Found</Container>
      <Footer id="footerAll"></Footer>
    </>
  );
};

export default NotFoundPage;
