import '../App.css'

export default function SubFlexContainerCard(props){
     return(
     <div>
         <div class = "flexwrapcard" id={props.id}>
            {props.children}
        </div>
     </div>
     )
}