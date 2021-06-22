import React from "react";
import Header from "./Header.js";
import Container from "./HomeContainer";
import Footer from './Footer'
export const NotFoundPage = () => {
  return (
    <>
      <Header subj='none' />
      <div id="aboutBackgroundStyling"></div>
      <Container>404 Page Not Found</Container>
      <Footer id='footerAll'></Footer>
    </>
  );
};
