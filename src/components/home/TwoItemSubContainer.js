// import "../../css/App.css";

export default function TwoItemSubCont(props) {
  let classString = `flexwrap ${props.class}`;
  return (
    <div className="subflex">
      <div className={classString} id={props.id}>
        <div className="itemcontainer">{props.oneItem}</div>
        <div className="itemcontainer">{props.twoItem}</div>
      </div>
    </div>
  );
}
