import React, { useState } from "react";
import Container from "./HomeContainer";
import Header from "./Header.js";
import "../assets/avocadoPastel.jpg";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import db from "../firebase";
import Footer from './Footer'

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


export const DeveloperPage = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch("message"), errors);

  const onSubmit = (data) => {
    db.collection("developerRequests")
      .add({
        name: data.name,
        email: data.email,
        toolName: data.toolName,
        toolSubject:data.toolSubject,
        url:data.url
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
      <Header subj='none' />
      <div id="aboutBackgroundStyling"></div>
      <Container id="feedbackPageContainer">
        {sent ? (
          <div>Thank you for your effort! We'll be in touch shortly</div>
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

            <Button margin='normal' type="submit" style={{fontFamily:'Nunito',marginTop:'20px'}} fullwidth variant="contained" color="primary">
              Send Request
            </Button>
          </form>
        )}
      </Container>
      <Footer id='footerAll'></Footer>
    </>
  );
};
