import "../css/ToolsPage.css";
import React from "react";
// import CameraAltIcon from "@material-ui/icons/CameraAlt";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Header from "./Header";

export default function ToolsPage(props) {
  window.onbeforeunload = function () {
    return "Are you sure you want to leave?";
  };
  const colorPaletteSubj = {
    chemistry: [
      { color: "rgb(67,40,102)" },
      { background: "rgb(214,198,248)" },
    ],
    economics: [
      { color: "rgb(183,115,53)" },
      { background: "rgb(247,230,211" },
    ],
    icons: {
      economics: "fas fa-chart-line",
      chemistry: "fas fa-flask",
    },
  };

  let currPalette = colorPaletteSubj[props.subj][0];
  //   let currBodyBG = colorPaletteSubj[props.subj][1];
  let currIcon = colorPaletteSubj["icons"][props.subj];

  return (
    <>
      <Header subj={props.subj} />

      <div id="horizontal">
        <div id="headerTool" style={currPalette}></div>

        <span id="dirButton"></span>
        <span id="inputBar">
          <div id="isPage">
            <span id="textInputTitle">
              <input
                id="titleInputMain"
                type="text"
                placeholder="Untitled Drawing"
              ></input>
              <div id="funcButton">
                <div id="funcButtonContainer">
                  <button style={currPalette} onClick={API_downloadPNG}>
                    <SaveAltIcon></SaveAltIcon>
                  </button>
                  <button style={currPalette} onClick={openFull}>
                    <FullscreenIcon></FullscreenIcon>
                  </button>
                </div>
              </div>
              <div id="toolTitleText" style={currPalette}>
                <h1>
                  {props.ToolName} <i class={currIcon}></i>
                </h1>
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

function openFull() {
  let frameElem = document.getElementById("isPage");
  if (frameElem.requestFullscreen) {
    frameElem.requestFullscreen();
  } else if (frameElem.webkitRequestFullscreen) {
    /* Safari */
    frameElem.webkitRequestFullscreen();
  } else if (frameElem.msRequestFullscreen) {
    /* IE11 */
    frameElem.msRequestFullscreen();
  }
}
/*
function takeScreenshot(){
  let contentDiv = document.getElementById('isPage');
  let tempCanvas = document.createElement('canvas');
  var download = function (href, name) {
    var link = document.createElement('a');
    link.download = name;
    link.style.opacity = "0";
    link.href = href;
    link.click();
    link.remove();
}
let dateObj = new Date()
let dd = dateObj.getDay()
let mm = dateObj.getMonth() + 1
let yyyy = dateObj.getFullYear();
let dateStr = dd + "_" + mm + "_" + yyyy
download(png, `quark_screenshot_${dateStr}.png`);
}
*/
