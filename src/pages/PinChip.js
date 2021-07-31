import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import { useRouter } from 'next/router';
import {db, firestore} from '../firebase'


export default function PinChip(props){
    const pinObj = props.pinData
    const name = pinObj.name
    const dir = pinObj.dir
    const uid = props.uid
    const tool = pinObj.tool
    const router = useRouter()
    const handleDelete = async() =>{
        let userCollection = await db.collection('users').doc(uid)
        await userCollection.update({
            dashboardPin: firestore.FieldValue.arrayRemove(pinObj)
        })
        console.log('deleted')
    }
    const handleClick = () =>{
        console.log("clicked")
        router.push(`/t/${tool}/${dir}`)
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