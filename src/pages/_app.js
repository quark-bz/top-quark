// import "../../styles/globals.css";
import "../css/App.css";
import "../css/login.css";
import "../css/Footer.css";
import "../css/ToolsPage.css";
import "../css/dbcard.css"
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false;

import { FirebaseAuthProvider } from "../contexts/FirebaseAuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseAuthProvider>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Component {...pageProps} />;
    </FirebaseAuthProvider>
  );
}

export default MyApp;
