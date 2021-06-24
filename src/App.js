import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactTitle } from "react-meta-tags";
import { ToolPage }  from "./components/ToolPage";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { FeedbackPage } from "./components/FeedbackPage";
// import { NotFoundPage } from "./components/NotFoundPage";
import { DeveloperPage } from "./components/DeveloperPage";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ReactTitle title="Quark | Home" />
          <HomePage />
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
  );
}
export default App;
