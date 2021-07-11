// import "../../css/App.css";

function Card(props) {
  let iconSubList = {
    economics: ["fas fa-line-chart", "rgb(255, 218, 184)"],
    chemistry: ["fas fa-flask", "rgb(210, 184, 255)"],
  };

  let FAIcon = iconSubList[props.subject][0];
  let backgroundColor = iconSubList[props.subject][1];
  return (
    <div className="newCard">
      <div className="overflowWrapper">
        <h3>{props.toolName}</h3>
      </div>
      <div className="subCardCover" style={{ background: backgroundColor }}>
        <i className={FAIcon}></i>
        <div className="newDescription">
          <p>{props.description}</p>
        </div>
        <a href={props.link}>
          <button className="cardButtonNew">
            <i className="fas fa-play fa-sm"></i>
          </button>
        </a>
      </div>
    </div>
  );
}

export default Card;
/*<div class = "cardMain">
            <div class = {str1}>
            <div class="cardInnerText">
                <div class="sub-icon-econs"></div>
                <h2>{props.toolName}</h2>
                <div class="manageSubText">
                <p>{props.description}</p>
                    <a href="https://limse10.github.io/econsgraphsweb/"><button class={str2}><i class = "fa fa-play"></i></button></a>
            </div>
            
        </div>
    </div>
        </div>
  */
