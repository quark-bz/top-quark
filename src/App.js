import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ToolsPage from "./components/toolPage";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { FeedbackPage } from "./components/FeedbackPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/feedback">
          <FeedbackPage />
        </Route>
        <Route path="/ChemBuild">
          <ToolsPage
            subj="chemistry"
            ToolURL="https://joentze.github.io/ChemicalStructureConstructor/ChemicalStructureConstructor/index.html"
          ></ToolsPage>
        </Route>
        <Route path="/EconsBuild">
          <ToolsPage
            subj="economics"
            ToolURL="https://joentze.github.io/econsgraphs-redesign/econsgraphsweb/index.html"
          ></ToolsPage>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
