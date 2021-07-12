import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Container from "../components/home/HomeContainer";
import Header from "../components/Header.js";
import Head from "next/head";
import { useAuth } from "../contexts/FirebaseAuthContext";
import { useRouter } from "next/router";
import { db } from "../firebase";
import SessionCard from "../components/session/SessionCard";

const DashboardPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);

  if (!currentUser) {
    router.push("/");
  }

  useEffect(() => {
    const loadSessions = async () => {
      if (currentUser) {
        const qs = await db.collection("users").doc(currentUser.uid).get();
        const data = qs.data().sessions;
        const sessions = await Promise.all(
          data.map(async (sess) => {
            const session = (await sess.get()).data();
            const tool = (await session.tool.get()).data();
            return {
              id: sess.id,
              tool: tool,
              data: session.data,
              title: session.title,
            };
          })
        );
        // const sessions = await Promise.all(
        //   qs.docs.map(async (doc) => {
        //     const data = doc.data();
        //     const tool = await data.tool.get();
        //     return { tool: tool.data(), data: data.data };
        //   })
        // );
        setSessions(sessions);
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
      <Header />
      <div id="aboutBackgroundStyling"></div>

      <Container id="dashboardPageContainer">
        {sessions.map((sesh, i) => {
          return <SessionCard key={i} session={sesh} />;
        })}
      </Container>
      <Footer id="footerAll"></Footer>
    </>
  );
};

export default DashboardPage;
