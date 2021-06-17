import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactTitle } from "react-meta-tags";
import ToolsPage from "./components/toolPage";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { FeedbackPage } from "./components/FeedbackPage";
import { NotFoundPage } from "./components/NotFoundPage";
import DeveloperPage from "./components/DeveloperPage"
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ReactTitle title="Quark - Home" />
          <HomePage />
        </Route>
        <Route exact path="/t">
          <ReactTitle title="Quark - Tools" />
          <HomePage />
        </Route>
        <Route path="/about">
          <ReactTitle title="Quark - About" />
          <AboutPage />
        </Route>
        <Route path="/feedback">
          <ReactTitle title="Quark - Feedback" />
          <FeedbackPage />
        </Route>
        <Route path="/develop">
          <ReactTitle title="Quark - Develop" />
          <DeveloperPage />
        </Route>
        <Route path="/t/chembuild">
          <ReactTitle title="Quark - ChemBuild" />
          <ToolsPage
            ToolName="ChemBuild"
            subj="chemistry"
            ToolURL="https://joentze.github.io/ChemicalStructureConstructor/ChemicalStructureConstructor/index.html"
          ></ToolsPage>
        </Route>
        <Route path="/t/econsbuild">
          <ReactTitle title="Quark - EconsBuild" />
          <ToolsPage
            ToolName="EconsBuild"
            subj="economics"
            ToolURL="https://joentze.github.io/econsgraphs-redesign/econsgraphsweb/index.html"
          ></ToolsPage>
        </Route>
        <Route path="*">
          <ReactTitle title="Quark - Not Found" />
          <NotFoundPage />
        </Route>

      </Switch>
    </Router>
  );
}
export default App;
