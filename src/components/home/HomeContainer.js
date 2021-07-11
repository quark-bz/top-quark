// import "../../css/App.css";

export default function Container(props) {
  return (
    <div>
      <div className="mainContainer" id={props.id}>
        {props.children}
      </div>
    </div>
  );
}
