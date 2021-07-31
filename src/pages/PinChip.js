import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import { useRouter } from 'next/router';

export default function PinChip(props){
    const pinObj = props.pinData
    const name = pinObj.name
    const dir = pinObj.dir
    const router = useRouter()
    const handleDelete = () =>{
        console.log("delete")
    }
    const handleClick = () =>{
        console.log("clicked")
        router.push(`/t/${dir}`)
    }
    return(

        <div className='chipbox'>
        <Chip
        label={name}
        avatar={props.icon}
        onDelete={handleDelete}
        onClick={handleClick}
        style={props.Style}
        />
        </div>

    )
}