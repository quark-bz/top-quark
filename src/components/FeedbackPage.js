import React, { useState } from "react";
import Footer from "./Footer";
import Container from "./HomeContainer";
import Header from "./Header.js";
import "../assets/avocadoPastel.jpg";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { db } from "../firebase";

export const FeedbackPage = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch("message"), errors);

  const onSubmit = (data) => {
    db.collection("feedback")
      .add({
        name: data.name,
        email: data.email,
        message: data.message,
      })
      .then(() => {
        console.log("feedback sent!");
        setSent(true);
      })
      .catch((error) => {
        console.error("error sending feedback: ", error);
      });
  };

  return (
    <>
      <Header subj="none" />
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
            Let us know how we're doing!
          </h1>
        </div>
        <div id="developerP">
          <p
            style={{ fontFamily: "Nunito", color: "#5a5aff", fontSize: "15pt" }}
          >
            Be kind 😃...
          </p>
        </div>
        {sent ? (
          <div>Thanks for your feedback!</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="name"
              label="Name"
              autoFocus
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
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              {...register("email")}
            />
            <TextField
              id="message"
              label="Message"
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows="10"
              {...register("message")}
            />
            <Button
              type="submit"
              style={{ fontFamily: "Nunito" }}
              fullwidth
              variant="contained"
              color="primary"
            >
              Send Feedback
            </Button>
          </form>
        )}
      </Container>
      <Footer id="footerAll"></Footer>
    </>
  );
};
