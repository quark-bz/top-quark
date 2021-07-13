import { db } from "../../../firebase";
import React from "react";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import BlurOffPage from "../../../components/tool/BlurOff";
import { useEffect } from "react";
import colorPaletteSubj from "../../../components/colorPalettes";
import Tool from "../../../components/tool/Tool";

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
  return (
    <>
      <BlurOffPage></BlurOffPage>
      <Header subj={tool.subject} />
      <Tool tool={tool} />
      <Footer id="footerAll"></Footer>
    </>
  );
};

export default ToolPage;
