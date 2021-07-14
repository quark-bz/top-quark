import { useRouter } from "next/router";
import colorPaletteSubj from "../colorPalettes"
const SessionCard = ({ session }) => {
  const router = useRouter();
  const redirect = () => {
    router.push(`/t/${session.tool.name}/${session.id}`);
  };
  const iconForCard = colorPaletteSubj['icons'][session.tool.subject]
  const colorForCardBG = colorPaletteSubj[session.tool.subject][1]
  return (
    <>
        <div class='dbcardholder' onClick={redirect}>
          <i class={iconForCard}></i>
          <div class='tophalfcard' style={colorForCardBG}></div>
          <div class='bottomhalf'>
            <div><h1>{session.title}</h1></div>
            {/*<div><i class='fa fa-ellipsis-h'></i></div>*/}
          </div>
        </div>

    {/*
      <div onClick={redirect}>
        <div>{session.tool.name}</div>
        <div>{session.title}</div>
      </div>
    */}
    </>
  );
};

export default SessionCard;
