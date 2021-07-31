import React, { useRef, useState } from "react";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { useEffect } from "react";
import colorPaletteSubj from "../colorPalettes";
import SaveIcon from "@material-ui/icons/Save";
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import {
  API_downloadPNG,
  openFull,
  triggerSaveData,
  saveData,
  loadData,
  getSession,
} from "../../api/quark";

const Tool = ({ tool, sessionId }) => {
  const { currentUser } = useAuth();
  const [title, _setTitle] = useState("");
  const titleRef = useRef(title);
  const setTitle = (value) => {
    titleRef.current = value;
    _setTitle(value);
  };
  const [session, setSession] = useState();
  const [sessError, setSessError] = useState();
  const router = useRouter();

  let currPalette = colorPaletteSubj[tool.subject][0];
  //   let currBodyBG = colorPaletteSubj[props.subj][1];
  let currIcon = colorPaletteSubj["icons"][tool.subject];

  useEffect(() => {
    // window.onbeforeunload = function () {
    //   return "Are you sure you want to leave?";
    // };
    window.addEventListener(
      "message",
      (event) => {
        let API_obj = event.data;

        if (API_obj["type"] === "downloadPNG") {
          let titleOfDrawing = document.getElementById("titleInputMain").value;
          console.log("hello there");
          downloadPNG(API_obj["uri"], titleOfDrawing);
        } else {
          return;
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (event.data.fn == "qrk_save_data") {
          saveData(event.data.payload, sessionId, titleRef.current, currentUser);
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    if (session) {
      loadData(session);
    }
  }, [session]);

  useEffect(() => {
    const loadSession = async () => {
      const { error, session } = await getSession(tool.id, sessionId);
      setSessError(error);
      setSession(session);
      setTitle(session?.title);
    };
    if (currentUser && sessionId) {
      loadSession();
    } else {
    }
  }, []);

  useEffect(() => {
    if (sessError) {
      console.log(sessError);
      setSession(null);
      router.push(`/t/${tool.name}`);
    }
  }, [sessError]);

  return (
    <>
      <div id="horizontal">
        <div id="headerTool" style={currPalette}></div>

        <span id="dirButton"></span>
        <span id="inputBar">
          <div id="isPage">
            <span id="textInputTitle">
              <input
                id="titleInputMain"
                type="text"
                value={title}
                placeholder={title || "Untitled Drawing"}
                onChange={(event) => setTitle(event.target.value)}
              ></input>
              <div id="funcButton">
                <div id="funcButtonContainer">
                  <button style={currPalette} onClick={API_downloadPNG}>
                    <SaveAltIcon></SaveAltIcon>
                  </button>
                  <button style={currPalette} onClick={openFull}>
                    <FullscreenIcon></FullscreenIcon>
                  </button>
                  {session ? (
                    <button style={currPalette} onClick={triggerSaveData}>
                      <SaveIcon />
                    </button>
                  ) : null}
                  {/* <div>{sessError}</div> */}
                </div>
              </div>
              <div id="toolTitleText" style={currPalette}>
                <h1>
                  {tool.name} <i className={currIcon}></i>
                </h1>
              </div>
            </span>
            <iframe
              className="iframeFit"
              id="iframeFit"
              title="tool"
              src={tool.url}
            ></iframe>
          </div>
        </span>
      </div>
    </>
  );
};

export default Tool;
