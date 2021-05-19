import logo from './logo.svg';
import './App.css';



function card(props) {
  let iconSubList ={
    "economics":["economicsCard","econsButton"],
    "physics":["physicsCard","physicsButton"],
    "chemistry":["chemistryCard","chemistryButton"]
  }

  let str1  = `blurCover ${iconSubList[props.subject][0]}`
  let str2 = `cardButton ${iconSubList[props.subject][1]}`
  return (

        <div class = "cardMain">
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
    
  

  );
}

export default card;
