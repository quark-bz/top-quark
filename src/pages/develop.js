import React, { useState } from "react";
import Container from "../components/home/HomeContainer";
import Header from "../components/Header.js";
import "../../src/assets/avocadoPastel.jpg";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { db } from "../firebase";
import Footer from "../components/Footer";
// import "../css/App.css";
import Head from "next/head";
/*
collection data
form = {
    Name:...,
    Email:...,
    ToolName:...,
    ToolSubject:...,
    URLLink:...,
}

*/

const DeveloperPage = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    db.collection("developerRequests")
      .add({
        name: data.name,
        email: data.email,
        toolName: data.toolName,
        toolSubject: data.toolSubject,
        url: data.url,
      })
      .then(() => {
        console.log("dev request sent!");
        setSent(true);
      })
      .catch((error) => {
        console.error("error sending dev request: ", error);
      });
  };

  return (
    <>
      <Head>
        <title>Quark | Develop</title>
        <meta
          name="description"
          content="Reach out to us! Let's develop Quark together!"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div id="aboutBackgroundStyling"></div>
      <Container id="feedbackPageContainer">
        <div id="developerHead">
          <h1
            style={{
              fontFamily: "Poppins",
              color: "#6464ff",
              fontSize: "30pt",
            }}
          >
            Have a Tool you wanna share?
          </h1>
        </div>
        <div id="developerP">
          <p
            style={{ fontFamily: "Nunito", color: "#5a5aff", fontSize: "15pt" }}
          >
            Develop it 🛠 with us! Reach out here.
          </p>
        </div>
        {sent ? (
          <div>Thank you for your effort! We&rsquo;ll be in touch shortly</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="name"
              label="Your Name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              {...register("name")}
            />
            <TextField
              id="email"
              label="Email Address"
              autoComplete="email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              {...register("email")}
            />
            <TextField
              id="toolName"
              label="Tool Name"
              autoComplete="Tool Name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              {...register("toolName")}
            />
            <TextField
              id="toolSubject"
              label="Tool Subject"
              autoComplete="Tool Subject"
              type="toolSubject"
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              {...register("toolSubject")}
            />
            <TextField
              id="url"
              label="URL of your tool!"
              autoComplete="url"
              type="url"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              {...register("url")}
            />

            <Button
              margin="normal"
              type="submit"
              style={{ fontFamily: "Nunito", marginTop: "20px" }}
              variant="contained"
              color="primary"
            >
              Send Request
            </Button>
          </form>
        )}
      </Container>
      <Footer id="footerAll"></Footer>
    </>
  );
};

export default DeveloperPage;
