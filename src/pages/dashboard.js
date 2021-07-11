import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Container from "../components/home/HomeContainer";
import Header from "../components/Header.js";
import Head from "next/head";
import { useAuth } from "../contexts/FirebaseAuthContext";
import { useRouter } from "next/router";
import { db } from "../firebase";

const DashboardPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  if (!currentUser) {
    router.push("/");
  }

  useEffect(() => {
    const loadSessions = async () => {
      if (currentUser) {
        const qs = await db
          .collection("users")
          .doc(currentUser.uid)
          .collection("sessions")
          .get();
        const sessions = qs.docs.map((doc) => {
          return doc.data();
        });
        console.log(sessions);
      }
    };
    loadSessions();
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>Quark | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header subj="none" />
      <div id="aboutBackgroundStyling"></div>

      <Container id="dashboardPageContainer"></Container>
      <Footer id="footerAll"></Footer>
    </>
  );
};

export default DashboardPage;
