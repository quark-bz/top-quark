import { db } from "../../../firebase";
import Tool from "../../../components/tool/Tool";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import BlurOffPage from "../../../components/tool/BlurOff";
import { useAuth } from "../../../contexts/FirebaseAuthContext";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// export const getStaticPaths = async () => {
//   const qs = await db.collection("sessions").get();
//   const sessions = qs.docs.map((doc) => {
//     const tool = doc.data().tool;
//     const sessionId = doc.id;
//     consolellog(sessionId);
//     console.log(tool);
//   });
//   //   const paths = qs.forEach((doc) => {
//   //     return { params: { toolname: doc.name } };
//   //   });

//   const paths = qs.docs.map((doc) => {
//     return { params: { toolname: doc.data().name, sessionId: "abcd" } };
//   });
//   return { paths, fallback: false };
// };

export const getServerSideProps = async ({ params }) => {
  const qs = await db
    .collection("tools")
    .where("name", "==", params.toolname)
    .get();
  const tool = qs.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  })[0];
  return { props: { tool, sessionId: params.sessionId } };
};

const ToolSessionPage = ({ tool, sessionId }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <BlurOffPage></BlurOffPage>
      <Header subj={tool.subject} />
      <Tool tool={tool} sessionId={sessionId} />
      <Footer id="footerAll"></Footer>
    </>
  );
};

export default ToolSessionPage;
