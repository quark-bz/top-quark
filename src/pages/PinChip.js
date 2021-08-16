import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import { useRouter } from 'next/router';
import {db, firestore} from '../firebase'
import colorPaletteSubj from '../components/colorPalettes'
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';


export default function PinChip(props){
    let deleteOr = {}
    const pinObj = props.pinData
    const name = pinObj.name
    const dir = pinObj.dir
    const uid = props.uid
    const tool = pinObj.tool
    const icon = colorPaletteSubj['icons'][pinObj.subject]
    const bgcolor = colorPaletteSubj[pinObj.subject][1]['background']
    const router = useRouter()

    const handleDelete = async() =>{
        let userCollection = await db.collection('users').doc(uid)
        await userCollection.update({
            [`dashboardPin.${pinObj.dir}`]:firestore.FieldValue.delete()
        })
        console.log('deleted')
        router.push('/dashboard')
        handleCloseMenu()
    }
    const handleClick = (event) =>{
            router.push(`/t/${tool}/${dir}`)
    }


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


    return(

        <div className='chipbox'>
        <p></p>
        <Chip
        aria-haspopup="true"
        aria-controls="simple-menu" 
        label={name}
        avatar={<i style={{marginTop:'11px', marginLeft:'10px',marginRight:'-15px', color:'#5a5aff'}} className={icon}></i>}
        onContextMenu={handleClickMenu}
        onClick={handleClick}
        style={{fontFamily:"nunito", color:"#5a5aff", background:bgcolor}}
        />
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        style={{
            top:'40px',
        }}
      >
        <MenuItem onClick={handleCloseMenu} 
        style={{
            fontFamily:'nunito', 
            color:'#ff8880', 
            fontSize:'10pt',
            height:'25px',
        }} 
            onClick={handleDelete}>

            <CancelIcon/>&nbsp;Unpin</MenuItem>
      </Menu>
        </div>

    )
}