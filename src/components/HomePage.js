import * as React from "react";
import Container from "./HomeContainer";
import SubFlexContainerCard from "./SubContainerFlex";
import Header from "./Header.js";
import TwoItemSubIcon from "./TwoItemSubContainer";
import Card from "./SubCard";
import "../assets/avocadoPastel.jpg";
import TitleSubjectText from "./MainTitleText";

export const HomePage = () => {
  return (
    <>
      <Header />
      <div id="backgroundStyling"></div>
      <Container>
        <TwoItemSubIcon
          oneItem={
            <SubFlexContainerCard>
              <Card
                link="/t/EconsBuild"
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
                link="/t/ChemBuild"
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
    </>
  );
};
