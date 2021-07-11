// import "../../css/App.css";

export default function SubFlexContainerCard(props) {
  return (
    <div>
      <div className="flexwrapcard" id={props.id}>
        {props.children}
      </div>
    </div>
  );
}
