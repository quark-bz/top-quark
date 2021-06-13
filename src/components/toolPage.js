import "../css/ToolsPage.css";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Header from './Header'

export default function ToolsPage(props) {
  const colorPaletteSubj = {
    chemistry: [
      { color: "rgb(67,40,102)" },
      { background: "rgb(214,198,248)" },
    ],
    economics: [
      { color: "rgb(183,115,53)" },
      { background: "rgb(247,230,211" },
    ],
  };
  let currPalette = colorPaletteSubj[props.subj][0];
  let currBodyBG = colorPaletteSubj[props.subj][1];
  return (
<><Header subj={props.subj}/>

    <div id="horizontal">
      <div id="headerTool" style={currPalette}>
      </div>

      <span id="dirButton">
   
      </span>
      <span id='inputBar'>
        <div id="isPage">
        <span id="textInputTitle">
        <input
          id="titleInputMain"
          type="text"
          placeholder="Untitled Drawing"
        ></input>
         <div id="funcButton">
        <div id="funcButtonContainer">
          <button style={currPalette}>
            {" "}
            <CameraAltIcon></CameraAltIcon>
          </button>
          <button style={currPalette}>
            <FullscreenIcon></FullscreenIcon>
          </button>
          <button style={currPalette} onClick={API_downloadPNG}>
            <SaveAltIcon></SaveAltIcon>
          </button>
        </div>
      </div>
      </span>
          <iframe
            class="iframeFit"
            id="iframeFit"
            title="tool"
            src={props.ToolURL}
          ></iframe>
        </div>
      </span>
     
    </div>
    </>
  );
}

function API_downloadPNG(e) {
  e.preventDefault();
  let iframeEl = document.getElementById("iframeFit");
  iframeEl.contentWindow.postMessage("downloadPNG", iframeEl.src);
  console.log("sent");
}

window.addEventListener(
  "message",
  (event) => {
    console.log("response received");
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

function downloadPNG(href, name) {
  var link = document.createElement("a");
  link.download = name;
  link.style.opacity = "0";
  link.href = href;
  link.click();
  link.remove();
}
