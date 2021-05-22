import logo from '../logo.svg';
import '../App.css';



function Card(props) {
  let iconSubList ={
    "economics":["fas fa-chart-line",'rgb(255, 218, 184)'],
    "chemistry":["fas fa-flask",'rgb(184, 255, 214)']
  }

  let FAIcon  = iconSubList[props.subject][0]
  let backgroundColor = iconSubList[props.subject][1];
  return (
            
      <div class="newCard">
      <div class="overflowWrapper"><h3>{props.toolName}</h3></div>
      <div class="subCardCover" style={{background:backgroundColor}}>
          <i class={FAIcon}></i>
          <div class="newDescription">
              <p>{props.description}</p>
          </div>
          <a href={props.link}><button class="cardButtonNew"><i class="fas fa-play fa-sm"></i></button></a>
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