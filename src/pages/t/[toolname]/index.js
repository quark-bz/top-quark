import { db } from "../../../firebase";
import React from "react";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import BlurOffPage from "../../../components/tool/BlurOff";
import { useEffect } from "react";
import colorPaletteSubj from "../../../components/colorPalettes";

export const getStaticPaths = async () => {
  const qs = await db.collection("tools").get();
  //   const paths = qs.forEach((doc) => {
  //     return { params: { toolname: doc.name } };
  //   });
  const paths = qs.docs.map((doc) => {
    return { params: { toolname: doc.data().name } };
  });
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const qs = await db
    .collection("tools")
    .where("name", "==", params.toolname)
    .get();
  const tool = qs.docs.map((doc) => {
    return doc.data();
  })[0];
  return { props: { tool } };
};

const ToolPage = ({ tool }) => {
  useEffect(() => {
    // window.onbeforeunload = function () {
    //   return "Are you sure you want to leave?";
    // };
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
  }, []);

  let currPalette = colorPaletteSubj[tool.subject][0];
  //   let currBodyBG = colorPaletteSubj[props.subj][1];
  let currIcon = colorPaletteSubj["icons"][tool.subject];

  const API_downloadPNG = (e) => {
    e.preventDefault();
    let iframeEl = document.getElementById("iframeFit");
    iframeEl.contentWindow.postMessage("downloadPNG", iframeEl.src);
  };

  const downloadPNG = (href, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.style.opacity = "0";
    link.href = href;
    link.click();
    link.remove();
  };

  const openFull = () => {
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
  };
  return (
    <>
      <BlurOffPage></BlurOffPage>
      <Header subj={tool.subject} />

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
      <Footer id="footerAll"></Footer>
    </>
  );
};

export default ToolPage;
