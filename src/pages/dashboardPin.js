import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import {useRouter} from 'next/useRouter'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import {useState, useEffect} from "react";
import {db} from '../firebase'
import PinChip from './PinChip';



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

export default function ChipHolder(props) {
    //const router = useRouter();
    const uid = props.uid
    const [pins, setPins] = useState([])
     useEffect(()=>{
      
      const loadPinChips = async(uid)=>{
        let thisDoc = await db.collection("users").doc(uid).get()
        let dashboardPin = await thisDoc.data().dashboardPin
        let thisPin = await Promise.all(
          dashboardPin.map(async (pin)=>{
            return{
              name:pin.name,
              dir:pin.dir
            }
          })
        );
        setPins(thisPin);
    }
    loadPinChips(uid)
    },[pins])
  return (
    <div id='dashboardChipHolder'>
      
     {
       pins.map((currentPin)=>{
        return <PinChip pinData = {currentPin}/>
       })
     }
    </div>
  );
}

