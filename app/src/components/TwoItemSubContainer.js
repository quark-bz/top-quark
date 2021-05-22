import '../App.css'

export default function TwoItemSubCont(props){
    return(
        <div class="subflex">
        <div class='flexwrap' id={props.id}>
            <div class='itemcontainer'>{props.oneItem}</div>
            <div class='itemcontainer'>{props.twoItem}</div>
        </div>
        
        </div>
    )
}