import TemporaryDrawer from "./components/Header.js";
import MainPage from "./components/MainPage.js";
import Button from "@material-ui/core/Button";
import Container from "./components/HomeContainer.js";
import TwoItemSubIcon from "./components/TwoItemSubContainer";
import { faChartLine } from "@fortawesome/fontawesome-svg-core";
import SubFlexContainerCard from "./components/SubContainerFlex";
import Card from "./components/SubCard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/avocadoPastel.jpg";
import TitleSubjectText from "./components/MainTitleText";
import ToolsPage from "./components/toolPage";


function App() {
  return (
    <Router>
      
      <Switch>
        <Route exact path="/">
        <TemporaryDrawer />
          <div id="backgroundStyling"></div>
          <Container>
            <TwoItemSubIcon
              oneItem={
                <SubFlexContainerCard>
                  <Card
                    link='/EconsBuild'
                    subject="economics"
                    toolName="Econsgraph"
                    description="Create & Export Economic graphs quickly"
                  />
                </SubFlexContainerCard>
              }
              twoItem={
                <TitleSubjectText

                  subject="Economics"
                  description="Level up your Economics notes"
                  lean="LEFT"
                />
              }
            />
            <hr></hr>
            <TwoItemSubIcon
              id="chemistryContainer"
              twoItem={
                <SubFlexContainerCard>
                  <Card
                  link='/ChemBuild'
                    subject="chemistry"
                    toolName="ChemBuild"
                    description="Build & export Chemical structures quickly"
                  />
                </SubFlexContainerCard>
              }
              oneItem={
                <TitleSubjectText
                  subject="Chemistry"
                  description="Spice up your Chemistry notes"
                  lean="RIGHT"
                />
              }
            />
          </Container>
        </Route>
        <Route path="/about">
        <TemporaryDrawer />
          <div id="aboutBackgroundStyling"></div>
          <Container id="aboutPageContainer">
            <TwoItemSubIcon
              id="abouttextone"
              class="aboutpagestuff"
              oneItem={
                <TitleSubjectText
                  id="aboutone"
                  subject="For Students, By Students"
                  description="Rushing your homework while fussing over the 4th online tool you’ve found? You don’t need that kind of stress in your life. Here at Quark we want to give you, the student, an all in one fuss-free educational experience."
                  lean="LEFT"
                />
              }
              twoItem={<div class="aboutimage" id="imageStudent"></div>}
            />

            <TwoItemSubIcon
              id="abouttexttwo"
              class="aboutpagestuff"
              twoItem={
                <TitleSubjectText
                  id="aboutone"
                  subject="Handy-Dandy Tools"
                  description="No more copying, pasting and squinting to create diagrams on tools that weren’t created for you. Tools at Quark were created to help students focus on quality work and to forget about the how-to-get-there."
                  lean="LEFT"
                />
              }
              oneItem={<div class="aboutimage" id="imageToolsMan"></div>}
            />

            <TwoItemSubIcon
              class="aboutpagestuff"
              id="abouttextthree"
              oneItem={
                <TitleSubjectText
                  id="aboutone"
                  subject="We Can't Do This Alone"
                  description="Quark wants to meet your homework needs as best as we can, but we can’t do it alone. Can’t find a feature that you want? Leave us feedback here."
                  lean="LEFT"
                />
              }
              twoItem={<div class="aboutimage" id="imageFeedback"></div>}
            />
            <TwoItemSubIcon
              id="abouttextfour"
              class="aboutpagestuff"
              twoItem={
                <TitleSubjectText
                  id="aboutone"
                  subject="Develop with Us"
                  description="Calling all web app magicians, Quark wants you. Help build this online learning community by developing tools with us. Create a tool and upload it here at Quark."
                  lean="LEFT"
                />
              }
              oneItem={<div class="aboutimage" id="imageDeveloper"></div>}
            />
          </Container>
        </Route>
        <Route path="/ChemBuild">
          <ToolsPage
          subj='chemistry'
          ToolURL = 'https://joentze.github.io/ChemicalStructureConstructor/ChemicalStructureConstructor/index.html'
          ></ToolsPage>

        </Route>
        <Route path="/EconsBuild">
        <ToolsPage
          subj='economics'
          ToolURL = 'https://joentze.github.io/econsgraphs-redesign/econsgraphsweb/index.html'
          ></ToolsPage>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
