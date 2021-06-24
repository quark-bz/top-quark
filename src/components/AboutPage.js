import * as React from "react";
import Container from "./HomeContainer";
import Header from "./Header.js";
import TwoItemSubIcon from "./TwoItemSubContainer";
import "../assets/avocadoPastel.jpg";
import TitleSubjectText from "./MainTitleText";
import Footer from "./Footer";
export const AboutPage = () => {
  return (
    <>
      <Header subj="none" />
      <div id="aboutBackgroundStyling"></div>
      <Container id="aboutPageContainer">
        <TwoItemSubIcon
          id="abouttextone"
          className="aboutpagestuff"
          oneItem={
            <TitleSubjectText
              id="aboutone"
              subject="For Students, By Students"
              description="💨Rushing your homework while fussing over the 4th online tool you’ve found? You don’t need that kind of stress in your life. Here at Quark we want to give you, the student, an all in one fuss-free educational experience."
              lean="LEFT"
            />
          }
          twoItem={<div className="aboutimage" id="imageStudent"></div>}
        />

        <TwoItemSubIcon
          id="abouttexttwo"
          className="aboutpagestuff"
          twoItem={
            <TitleSubjectText
              id="aboutone"
              subject="Handy-Dandy Tools"
              description="No more copying, pasting and squinting to create diagrams on tools that weren’t created for you. Tools at Quark were created to help students focus on quality work and to forget about the how-to-get-there🗺."
              lean="LEFT"
            />
          }
          oneItem={<div class="aboutimage" id="imageToolsMan"></div>}
        />

        <TwoItemSubIcon
          className="aboutpagestuff"
          id="abouttextthree"
          oneItem={
            <TitleSubjectText
              id="aboutone"
              subject="We Can't Do This Alone"
              description={
                <p>
                  Quark wants to meet your homework👓 needs as best as we can, but
                  we can’t do it alone. Can’t find a feature that you want?
                  Leave us feedback{" "}
                  <u>
                    <a href="/feedback">here</a>
                  </u>
                  .
                </p>
              }
              lean="LEFT"
            />
          }
          twoItem={<div class="aboutimage" id="imageFeedback"></div>}
        />
        <TwoItemSubIcon
          id="abouttextfour"
          className="aboutpagestuff"
          twoItem={
            <TitleSubjectText
              id="aboutone"
              subject="Develop with Us"
              description={
                <p>
                  Calling all web app magicians🤔, Quark wants you. Help build
                  this online learning community by developing tools🔨 with us.
                  Create a tool and upload it{" "}
                  <u>
                    <a href="/develop">here</a>
                  </u>{" "}
                  at Quark.
                </p>
              }
              lean="LEFT"
            />
          }
          oneItem={<div class="aboutimage" id="imageDeveloper"></div>}
        />
      </Container>
      <Footer id="footerAll"></Footer>
    </>
  );
};
