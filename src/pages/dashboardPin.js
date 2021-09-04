import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import {useRouter} from 'next/useRouter'
/*import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';*/
import {useState, useEffect} from "react";
import {db} from '../firebase'
import PinChip from './PinChip';
//import {useRouter} from 'next/router'
//import Divider from 'material-ui/Divider'


const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const getKeysInOrder = (dictionary)=>{
  let returnList = []
  for(let item in dictionary){
    returnList.push(item)
  }
  return returnList.sort()
}

export default function ChipHolder(props) {
    const uid = props.uid
    const [pins, setPins] = useState([])    
     useEffect(()=>{
      
      const loadPinChips = async(uid)=>{
        console.log('loading pin chips')
        let thisDoc = await db.collection("users").doc(uid).get()
        let dashboardPin = await thisDoc.data().dashboardPin
        console.log(dashboardPin)
        let thisPin = await Promise.all(
          getKeysInOrder(dashboardPin).map(async (pin)=>{
            //console.log(pin)
            return dashboardPin[pin]
          })
        );
        setPins(thisPin);

    }
    loadPinChips(uid)
    }
    ,[uid])
    
    useEffect(()=>{
      db.collection("users").doc(uid).onSnapshot(async (doc) => {
        let thisDoc = doc.data().dashboardPin;
        let thisPin = await Promise.all(
          getKeysInOrder(thisDoc).map(async (pin)=>{
            return thisDoc[pin]
          })
        )
        setPins(thisPin)
    });
    },[uid])
  return (
    /*<div>
    <div id="subtextdbpin"><p>Pinned Sessions</p></div>
      <Divider/>*/
    <div id='dashboardChipHolder'>
     {
       pins.length?(
       pins.map((currentPin)=>{
        return <PinChip pinData = {currentPin} uid={uid}/>
       })):(
         <div id="subtextdbpin"><p><i class="fa fa-thumb-tack" aria-hidden="true"></i>&#10240;Your Pins</p>
         </div>
       )
     }
    </div>
    //</div>
  );
}

