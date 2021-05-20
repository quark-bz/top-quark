import '../App.css'

export default function SubFlexContainerCard(props){
     return(
     <div>
         <div class = "flexwrapcard">
            {props.children}
        </div>
     </div>
     )
}