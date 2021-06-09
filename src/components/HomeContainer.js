import '../App.css'
import TwoItemSubCont from './TwoItemSubContainer'


export default function Container(props){
    return(
        <div>
        <div class="mainContainer" id={props.id}>
        {props.children}    
        </div>
        </div>
    )
}