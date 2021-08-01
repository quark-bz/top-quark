import { db, firestore } from "../firebase";

export const API_downloadPNG = (e) => {
  e.preventDefault();
  let iframeEl = document.getElementById("iframeFit");
  iframeEl.contentWindow.postMessage("downloadPNG", iframeEl.src);
};

export const downloadPNG = (href, name) => {
  var link = document.createElement("a");
  link.download = name;
  link.style.opacity = "0";
  link.href = href;
  link.click();
  link.remove();
};

export const openFull = () => {
  let frameElem = document.getElementById("isPage");
  if (frameElem.requestFullscreen) {
    frameElem.requestFullscreen();
  } else if (frameElem.webkitRequestFullscreen) {
    /* Safari */
    frameElem.webkitRequestFullscreen();
  } else if (frameElem.msRequestFullscreen) {
    /* IE11 */
    frameElem.msRequestFullscreen();
  }
};

export const loadData = (session) => {
  let iframeEl = document.getElementById("iframeFit");
  iframeEl.contentWindow.postMessage(
    JSON.parse(
      JSON.stringify({
        fn: "qrk_load_data",
        payload: { data: session.data },
      })
    ),
    iframeEl.src
  );
};

export const saveData = async (data, sessionId, title, currentUser) => {
  db.collection("sessions").doc(sessionId).update({ data: data, title: title });
  let dashpin = await db.collection("users").doc(currentUser.uid).get()
  let currObj = dashpin.data().dashboardPin
  console.log(currObj)
  if(sessionId in currObj){
    console.log('updated')
    db.collection('users').doc(currentUser.uid).update({
      [`dashboardPin.${sessionId}.name`]:title
    })}
};

export const triggerSaveData = () => {
  let iframeEl = document.getElementById("iframeFit");
  iframeEl.contentWindow.postMessage(
    JSON.parse(JSON.stringify({ fn: "qrk_save_data" })),
    "*"
  );
};

export const getSession = async (toolId, sessionId) => {
  try {
    const doc = await db.collection("sessions").doc(sessionId).get();
    const session = await doc.data();
    const sessToolId = (await session.tool.get()).id;
    if (sessToolId !== toolId) {
      return { error: "wrong tool", session: null };
    } else {
      return { error: null, session: session };
    }
  } catch (error) {
    return { error: "not authenticated", session: null };
  }
};
