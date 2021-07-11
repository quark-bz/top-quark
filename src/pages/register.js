import React, { useState } from "react";
import Footer from "../components/Footer";
import Container from "../components/home/HomeContainer";
import Header from "../components/Header.js";
import "../../src/assets/avocadoPastel.jpg";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { db } from "../firebase";
import Head from "next/head";
import { useAuth } from "../contexts/FirebaseAuthContext";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  if (!currentUser) {
    router.push("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      db.collection("users")
        .doc(currentUser.uid)
        .set({ username: data.username });
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Head>
        <title>Quark | Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header subj="none" />
      <div id="aboutBackgroundStyling"></div>

      <Container id="registerPageContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="username"
            label="Username"
            autoFocus
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...register("username")}
          />
          <Button
            type="submit"
            style={{ fontFamily: "Nunito" }}
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </form>
      </Container>
      <Footer id="footerAll"></Footer>
    </>
  );
};

export default RegisterPage;
