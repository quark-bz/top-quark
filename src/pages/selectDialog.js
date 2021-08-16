import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import {db} from '../firebase'


export default function FormDialog(props) {
  const uid = props.uid
  const [open, setOpen] = useState(false);
  const [checkObj, setCheckObj] = useState({})
  const [allTools, setAllTools] = useState([])
  const [mapTools, setMapTools] = useState({})

  const writeToAddedTools = async()=>{
    let writeArray = []
    for(let tool of allTools){
      if(checkObj[tool]){
        let currObj = {name:tool, doc:mapTools[tool]}
        console.log(currObj)
        writeArray.push(currObj)
      }
    }
    //write to db
    db.collection('users').doc(uid).update({addedTools:writeArray})
  }

  const loadThis = async ()=>{
    const userData = await db.collection("users").doc(uid).get()
    const selectedTools = userData.data().addedTools
    const selectedArray =  await Promise.all(
      selectedTools.map((item)=>{
        return item.name
      })
    )
    console.log(selectedArray)
    return selectedArray
  }

  const setCheck = async()=>{
    const tools = await db.collection("tools").get()
    const allTools = await Promise.all(
      tools.docs.map((tool)=>{
        setMapTools(mapTools=>{return {...mapTools, [tool.data().name]:tool.id}}) 
        return tool.data().name
      })
    )
      setAllTools(allTools)
      console.log(mapTools) 
      return allTools 
  }

  useEffect(
    ()=>{

      const setCheckBox = async()=>{
        let returnObj = {}
        let toolCheck = await setCheck()
        let toolSelect = await loadThis()
        for(let tool of toolCheck){
          if(toolSelect.includes(tool)){
            returnObj[tool] = true;
          }
          else{
            returnObj[tool]=false;
          }
        }
        setCheckObj(returnObj)
      }
      setCheckBox()
      console.log(checkObj)  
      
    }
    ,[uid])

    

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    setCheckObj({ ...checkObj, [event.target.name]: event.target.checked });
  };
  const handleClose = () => {
    console.log("updating...")
    setOpen(false);
  };

  return (
    <div>
      <MenuItem
        onClick={handleClickOpen}
        style={{fontFamily:'Nunito',color:'#b8b8ff',width:'180px',height:'45px'}}
        >
        <AddIcon/>
        &nbsp;
        Manage Tools
        </MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title" >Manage Tools</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Manage Tools shown on dashboard menu.
          </DialogContentText>
            <FormGroup>
              {allTools.map((tool)=>{
              
                return (<FormControlLabel
                label={tool}
                control={<Checkbox
                    style={{color:"#5a5aff"}}
                    checked={checkObj[tool]}
                    onChange={handleChange}
                    name={tool}
                    Label={tool}
                />}>
                </FormControlLabel>)
                })
                
                }
            </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            handleClose()
            writeToAddedTools()
          }} color="primary">
            Update
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
