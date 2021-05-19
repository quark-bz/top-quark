import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';


function ButtonSideNav(props){
 return(

    <a style={{textDecoration:'none', color:'inherit'}}
    href={props.dir}><ListItem button key={props.name}>
    <ListItemIcon>{props.icon}</ListItemIcon>
    <ListItemText primary={props.name} />
    </ListItem></a>

 )
}

export default ButtonSideNav;