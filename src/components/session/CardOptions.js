import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';



export default function CardOptionMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
const thisDefaultStyle = {fontFamily:"nunito",color:"#5a5aff",fontSize:"10pt",width:"150px",height:"35px"}
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreHorizOutlinedIcon></MoreHorizOutlinedIcon>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        
      >
        <MenuItem onClick={handleClose}style={thisDefaultStyle}>Make a copy</MenuItem>
        <MenuItem onClick={handleClose}style={thisDefaultStyle}>Option 2</MenuItem>
        <Divider></Divider>
        <MenuItem onClick={handleClose} style={{fontFamily:"nunito",color:"#f5425d",fontSize:"10pt",width:"150px",height:"35px"}}>Delete&nbsp;<DeleteOutlinedIcon></DeleteOutlinedIcon></MenuItem>
      </Menu>
    </div>
  );
}
