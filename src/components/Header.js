/* eslint-disable @next/next/link-passhref */
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
// import DashboardIcon from "@material-ui/icons/Dashboard";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Divider from "@material-ui/core/Divider";
//import InboxIcon from '@material-ui/icons/MoveToInbox';
//import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import ButtonSideNav from "./buttonLink.js";
import CodeIcon from "@material-ui/icons/Code";
// import "../css/App.css";
// import "../css/login.css";
import { useAuth } from "../contexts/FirebaseAuthContext";
//import { withRouter } from "react-router";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
//import { Button } from "react-bootstrap";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//import { Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const colorPaletteSubj = {
  chemistry: [{ color: "rgb(67,40,102)" }, { background: "rgb(214,198,248)" }],
  economics: [{ color: "rgb(183,115,53)" }, { background: "rgb(247,230,211" }],
  none: [{ color: "#5a5aff" }, { background: "#5a5aff" }],
};

const Header = ({ subj }) => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  let currPalette = colorPaletteSubj[subj][0];
  // let currBodyBG = colorPaletteSubj[props.subj][1];

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch {
      alert("failed to logout");
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //Try to use map and optimise later. also add on more buttons when functionality increases
  const list = (anchor) => (
    <div
      style={{
        background: "white",
        height: "100%",
      }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={currPalette}>
        {currentUser ? (
          <>
            <ButtonSideNav
              className="loginBtn"
              dir="/profile"
              icon={<AccountCircleIcon style={currPalette}></AccountCircleIcon>}
              name={currentUser.displayName}
            ></ButtonSideNav>
          </>
        ) : (
          // <div />
          <ButtonSideNav
            style={{ float: "right", marginTop: "-70px" }}
            name="Login to Quark"
            icon={<VpnKeyIcon style={currPalette}></VpnKeyIcon>}
            className="loginBtn"
            func={() => {
              console.log("to login");
              router.push("/login");
            }}
          ></ButtonSideNav>
        )}
      </List>
      <Divider />
      <List style={currPalette}>
        <ButtonSideNav
          name="Home"
          dir="/"
          icon={<HomeIcon style={currPalette} />}
        />
        <ButtonSideNav
          name="About"
          dir="/about"
          icon={<EmojiObjectsIcon style={currPalette} />}
        />
        <ButtonSideNav
          name="Develop with Us"
          dir="/develop"
          icon={<CodeIcon style={currPalette} />}
        />
        <ButtonSideNav
          name="Feedback"
          dir="/feedback"
          icon={<FeedbackIcon style={currPalette} />}
        />
        <br></br>
        <br></br>
        {currentUser ? (
          <ButtonSideNav
            func={handleLogout}
            icon={<ExitToAppIcon style={currPalette}></ExitToAppIcon>}
            name="Sign Out"
          />
        ) : (
          <></>
        )}
      </List>
    </div>
  );

  return (
    <div id="header">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            style={{
              margin: "8px",
              position: "absolute",
              top: "0",
              left: "0",
              color: "#6464ff",
            }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon style={currPalette} />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

      <h1>
        <Link href="/" style={currPalette}>
          <div style={currPalette}>Quark</div>
        </Link>
      </h1>
      {currentUser ? (
        <>
          <div>{currentUser.email}</div>
          <Button className="loginBtn" onClick={handleLogout}>
            logout
          </Button>
        </>
      ) : (
        // <div />
        <Button
          className="loginBtn"
          onClick={() => {
            router.push("/login");
          }}
        >
          login
        </Button>
      )}
    </div>
  );
};

export default Header;
