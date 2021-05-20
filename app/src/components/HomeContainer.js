import '../App.css'
import TwoItemSubCont from './TwoItemSubContainer'


export default function Container(props){
    return(
        <div>
        <div id="mainContainer">
        {props.children}    
        </div>
        </div>
    )
}