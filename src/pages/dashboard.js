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
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
//import PinChip from "./PinChip"
import ChipHolder from "./dashboardPin"

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
    //router.push(`/t/${tool.name}/${sessionDoc.id}`);
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
      <ChipHolder
      uid={currentUser.uid}
      />
      </div>
      <div id='totaldbholder'>


      </div>
      </Container>
      <Container id='dbcardcontainer'>
      <div id='dbbuttonholder'>
        <h1 style={{fontFamily:'nunito',color:'#5a5aff'}}>Sessions</h1>
        <Tooltip title="Add Session">
      <IconButton aria-controls="simple-menu" aria-haspopup="true" 
      
        style={{fontFamily:'Nunito',background:'#5a5aff',width:"30px",height:'30px',marginLeft:'14px',marginTop:'28px'}} 
        onClick={handleClick}>
      
        <AddIcon style={{color:'white'}}></AddIcon>
      </IconButton>
      </Tooltip>
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
        <Divider
        style={{
          margin:'20px'
        }}
        />
      <div id='cardholdercenter'>

        {sessions.map((sesh, i) => {

          return <SessionCard uid={currentUser.uid} key={i} session={sesh} />;
        })}
      </div>
      </Container>
      <Footer id="footerAll"></Footer>

    </>
  );
};

export default DashboardPage;
