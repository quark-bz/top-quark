import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Container from "../components/home/HomeContainer";
import Header from "../components/Header.js";
import Head from "next/head";
import { useAuth } from "../contexts/FirebaseAuthContext";
import { useRouter } from "next/router";
import { db, firestore } from "../firebase";
import SessionCard from "../components/session/SessionCard";
import AddIcon from '@material-ui/icons/Add';
//import { Button } from "react-bootstrap";
//import { SettingsInputCompositeOutlined } from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import colorPaletteSubj from "../components/colorPalettes.js";

const DashboardPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [tools, setTools] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null); 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
    handleClose()
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
        console.log(qs)
        const data = qs.data().sessions;
        console.log(data)
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
      <div id='dbtext'>
        <h1>Your Dashboard</h1>
      </div>
      <div id='totaldbholder'>
      <div id='dbbuttonholder'>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" 
      
        style={{fontFamily:'Nunito',background:'#5a5aff',opacity:'0.8'}} 
        onClick={handleClick}>
      
        <AddIcon style={{color:'white'}}></AddIcon>
      </IconButton>
      
      <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {tools.map((tool, i) => {
          return (
            <MenuItem         
              style={{fontFamily:'Nunito',color:'#5a5aff',width:'180px',height:'45px'}}
              onClick={() => {
                createNewSession(tool);
              }}
              >
              <i className={colorPaletteSubj['icons'][tool.subject]}></i>
              &nbsp;
              &nbsp;
               {tool.name}</MenuItem>
              /*key={i}*/
          );
        })}
        
      </Menu>
      </div>
    </div>
      </div>
      </Container>
      <Container id='dbcardcontainer'>

      <div id='cardholdercenter'>
        {sessions.map((sesh, i) => {
          return <SessionCard key={i} session={sesh} />;
        })}
      </div>

      </Container>
      <Footer id="footerAll"></Footer>

    </>
  );
};

export default DashboardPage;
