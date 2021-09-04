import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {db, firestore} from '../../firebase'
import {useRouter} from 'next/router'
//import ChipHolder from '../../pages/dashboardPin'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CardOptionMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpen(true);
    handleClose()
  };

  const handleCloseDelete = () => {
    setOpen(false);
  };

  const router = useRouter()
  const thisDefaultStyle = {fontFamily:"nunito",color:"#5a5aff",fontSize:"10pt",width:"180px",height:"45px"}
  const uid = props.uid
  const obj = props.obj

  const thisPinObj = {
    name:obj.title,
    subject:obj.tool.subject,
    tool:obj.tool.name,
    dir:obj.id,
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletingSession = async()=>{
    console.log(uid)
    console.log(`deleting..."${obj.title}"`)
    console.log(obj.id)
    
    let userSessionArray = await db.collection('users').doc(uid)
    userSessionArray.update({
      "sessions":firestore.FieldValue.arrayRemove(db.collection('sessions').doc(obj.id))
    })
    //console.log((await userSessionArray.get()).data()['sessions'])
    await db.collection('sessions').doc(obj.id).delete()
    console.log(userSessionArray)    
    handleCloseDelete()
  }

  const createPin = async()=>{
    
    handleClose()
    console.log('pinning...')
    let dashboardPinList = await db.collection('users').doc(uid)
    await dashboardPinList.set({
      dashboardPin: {[obj.id]:thisPinObj}
    },{merge:true})
    //router.reload('/dashboard')
    
  }
  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" style={{bottom:'4px'}} onClick={handleClick}>
        <MoreHorizOutlinedIcon style={{color:"#e3e3e3"}}/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        
      >
        <MenuItem onClick={handleClose}style={thisDefaultStyle}><FileCopyIcon className="material-icons md-18"/>&nbsp;Make a copy</MenuItem>
        <MenuItem onClick={createPin}style={thisDefaultStyle}><DashboardIcon/>&nbsp;Pin to Dashboard</MenuItem>
        <Divider></Divider>
        <MenuItem onClick={handleClickOpenDelete} style={{fontFamily:"nunito",color:"#ff8880",fontSize:"10pt",width:"180px",height:"45px"}}><DeleteOutlinedIcon></DeleteOutlinedIcon>&nbsp;Delete</MenuItem>
      </Menu>
      <div>
      <Dialog
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deleting a session?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete "${obj.title}"? It will be loss forever.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deletingSession} color="primary" style={{color:"#ff8880",margin:"20px"}}>
            Delete
          </Button>
          <Button onClick={handleCloseDelete} color="primary" variant="contained" style={{background:"#ff8880",margin:"20px"}} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    </div>
  );
}
