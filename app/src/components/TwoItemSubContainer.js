import '../App.css'

export default function TwoItemSubCont(props){
    let classString = 'flexwrap'+' '+props.class;
    return(
        <div class="subflex">
        <div class={classString} id={props.id}>
            <div class='itemcontainer'>{props.oneItem}</div>
            <div class='itemcontainer'>{props.twoItem}</div>
        </div>
        
        </div>
    )
}