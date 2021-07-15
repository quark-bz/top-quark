import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Container from "../components/home/HomeContainer";
import Header from "../components/Header.js";
import Head from "next/head";
import { useAuth } from "../contexts/FirebaseAuthContext";
import { useRouter } from "next/router";
import { db, firestore } from "../firebase";
import SessionCard from "../components/session/SessionCard";
import { Button } from "react-bootstrap";
import { SettingsInputCompositeOutlined } from "@material-ui/icons";

const DashboardPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [tools, setTools] = useState([]);

  if (!currentUser) {
    router.push("/");
  }

  const createNewSession = async (tool) => {
    const userDoc = db.collection("users").doc(currentUser.uid);
    const toolDoc = db.collection("tools").doc(tool.id);
    const sessionDoc = await db.collection("sessions").add({
      user: userDoc,
      tool: toolDoc,
      title: "",
      data: {},
    });
    await userDoc.update({
      sessions: firestore.FieldValue.arrayUnion(sessionDoc),
    });
    router.push(`/t/${tool.name}/${sessionDoc.id}`);
  };

  useEffect(() => {
    const getTools = async () => {
      const toolDocs = await db.collection("tools").get();
      const ts = toolDocs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setTools(ts);
    };
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
    getTools();
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
        {tools.map((tool, i) => {
          return (
            <Button
              key={i}
              onClick={() => {
                createNewSession(tool);
              }}
            >
              {tool.name} +
            </Button>
          );
        })}
        {sessions.map((sesh, i) => {
          return <SessionCard key={i} session={sesh} />;
        })}
      </Container>
      <Footer id="footerAll"></Footer>
    </>
  );
};

export default DashboardPage;
