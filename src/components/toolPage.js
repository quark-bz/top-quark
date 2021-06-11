import "../ToolsPage.css";
import HomeIcon from "@material-ui/icons/Home";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DescriptionIcon from "@material-ui/icons/Description";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
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
    <div id="horizontal">
      <div id="headerTool" style={currPalette}>
        <a href="/">
          <h1>Quark</h1>
        </a>
      </div>
      <span id="textInputTitle">
        <input
          id="titleInputMain"
          type="text"
          placeholder="Untitled Drawing"
        ></input>
      </span>
      <span id="dirButton">
        <div id="dirButtonContainer">
          <button style={currPalette}>
            <HomeIcon></HomeIcon>
          </button>
          <button style={currPalette}>
            <EmojiObjectsIcon></EmojiObjectsIcon>
          </button>
          <button style={currPalette}>
            <DashboardIcon></DashboardIcon>
          </button>
        </div>
      </span>
      <span>
        <div id="isPage">
          <iframe class="iframeFit" id="iframeFit" src={props.ToolURL}></iframe>
        </div>
      </span>
      <span id="funcButton">
        <div id="funcButtonContainer" style={currBodyBG}>
          <button style={currPalette}>
            {" "}
            <CameraAltIcon></CameraAltIcon>
          </button>
          <button style={currPalette}>
            <FullscreenIcon></FullscreenIcon>
          </button>
          <button style={currPalette}>
            <SaveAltIcon></SaveAltIcon>
          </button>
        </div>
      </span>
    </div>
  );
}
