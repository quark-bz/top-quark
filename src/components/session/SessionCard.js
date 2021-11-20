import { useRouter } from "next/router";
import colorPaletteSubj from "../colorPalettes"
import CardOptionMenu from './CardOptions'
const SessionCard = ({ session, uid }) => {
  const router = useRouter();
  const redirect = () => {
    router.push(`/t/${session.tool.name}/${session.id}`);
  };
  const iconForCard = colorPaletteSubj['icons'][session.tool.subject]
  const colorForCardBG = colorPaletteSubj[session.tool.subject][1]
  return (
    <>
        <div class='dbcardholder' onDoubleClick={redirect}>
          <i class={iconForCard}></i>
          <div class='tophalfcard' style={colorForCardBG}></div>
          <div class='bottomhalf'>
            <div><h1>{session.title}</h1></div>
            <CardOptionMenu 
              uid = {uid} 
              obj = {session}
            ></CardOptionMenu>
          </div>
        </div>
    </>
  );
};

export default SessionCard;
