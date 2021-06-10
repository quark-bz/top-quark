import "../App.css";

export default function TitleSubjectText(props) {
  let leanDirection = {};
  if (props.lean === "LEFT") {
    leanDirection = { textAlign: "left" };
  } else if (props.lean === "RIGHT") {
    leanDirection = { textAlign: "right" };
  }
  return (
    <div class="titleSubjectTextStyle" style={leanDirection} id={props.id}>
      <h1>{props.subject}</h1>
      <p>{props.description}</p>
    </div>
  );
}
