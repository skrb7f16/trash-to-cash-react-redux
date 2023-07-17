import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import ShowMessage from '../../state/actionCreaters/ShowMessage'
export default function MessageBar() {
    const message=useSelector(state=>state.ShowMessageReducer)
    const [mesStyle,SetMesStyle]=useState(null)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(message!==null){
            if(message.type==="success"){
                let temp={...messageStyle.main,...messageStyle.success}
                SetMesStyle(temp)
                
            }else if(message.type==='warning'){
                let temp={...messageStyle.main,...messageStyle.warning}
                SetMesStyle(temp)
            }
        }
    },[message])

    const handleClose=()=>{
        dispatch(ShowMessage(null,'hide'))
    }
  return (
    <div style={message===null?messageStyle.hide:mesStyle}>
        <p>{message!==null?message.message:"No message"}</p>
        <span style={messageStyle.cross} onClick={handleClose}>&#x2715;</span>
    </div>
  )
}

const messageStyle ={
    main:{
        display:'flex',
        position:'fixed',
        bottom:'10vh',
        right:'5vw',
        maxWidth:'40vw',
        minWidth:'30vw',
        minHeight:'8vh',
        zIndex:'100',
        justifyContent:'space-between',
        alignItems:'center',
        color:'white',
        padding:'10px',
        borderRadius:'20px'
    },
    cross:{
        position: 'relative',
        top:'-2.5vh',
        right:'1vw',
        cursor:'pointer'
    },
    "success":{
        backgroundColor:'green'
    },
    "warning":{
        backgroundColor:'red'
    },
    "hide":{
        display: 'none'
    }
}