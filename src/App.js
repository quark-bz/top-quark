import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactTitle } from "react-meta-tags";
import { ToolPage } from "./components/tool/ToolPage";
import { HomePage } from "./components/home/HomePage";
import { AboutPage } from "./components/about/AboutPage";
import { FeedbackPage } from "./components/feedback/FeedbackPage";
// import { NotFoundPage } from "./components/NotFoundPage";
import { DeveloperPage } from "./components/develop/DeveloperPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import { FirebaseAuthProvider } from "./contexts/FirebaseAuthContext";

function App() {
  return (
    <FirebaseAuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <ReactTitle title="Quark | Home" />
            <HomePage />
          </Route>
          <Route exact path="/login">
            <ReactTitle title="Quark | Login" />
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <ReactTitle title="Quark | Sign up!" />
            <SignupPage />
          </Route>
          <Route exact path="/t">
            <ReactTitle title="Quark | Tools" />
            <HomePage />
          </Route>
          <Route path="/about">
            <ReactTitle title="Quark | About" />
            <AboutPage />
          </Route>
          <Route path="/feedback">
            <ReactTitle title="Quark | Feedback" />
            <FeedbackPage />
          </Route>
          <Route path="/develop">
            <ReactTitle title="Quark | Develop" />
            <DeveloperPage />
          </Route>
          <Route path="/t/chembuild">
            <ReactTitle title="Quark | ChemBuild" />
            <ToolPage
              ToolName="ChemBuild"
              subj="chemistry"
              ToolURL="https://joentze.github.io/ChemicalStructureConstructor/ChemicalStructureConstructor"
            ></ToolPage>
          </Route>
          <Route path="/t/econsbuild">
            <ReactTitle title="Quark | EconsBuild" />
            <ToolPage
              ToolName="EconsBuild"
              subj="economics"
              ToolURL="https://limse10.github.io/econsgraphsweb"
            ></ToolPage>
          </Route>
          <Route path="*">
            <ReactTitle title="Quark | Home" />
            {/* <NotFoundPage /> */ <HomePage />}
          </Route>
        </Switch>
      </Router>
    </FirebaseAuthProvider>
  );
}
export default App;
