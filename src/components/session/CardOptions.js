import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DashboardIcon from '@material-ui/icons/Dashboard';

export default function CardOptionMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
const thisDefaultStyle = {fontFamily:"nunito",color:"#5a5aff",fontSize:"10pt",width:"180px",height:"45px"}
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <MenuItem onClick={handleClose}style={thisDefaultStyle}><DashboardIcon/>&nbsp;Pin to Dashboard</MenuItem>
        <Divider></Divider>
        <MenuItem onClick={handleClose} style={{fontFamily:"nunito",color:"#ff8880",fontSize:"10pt",width:"180px",height:"45px"}}><DeleteOutlinedIcon></DeleteOutlinedIcon>&nbsp;Delete</MenuItem>
      </Menu>
    </div>
  );
}
