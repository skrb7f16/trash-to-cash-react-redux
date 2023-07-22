import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDatabase, onValue, ref } from 'firebase/database'
import firebaseApp from '../../firebase-service'
import { useSelector } from 'react-redux/es/hooks/useSelector'
export default function Chat() {
    const params=useParams()
    const db=getDatabase(firebaseApp,firebaseApp.options.databaseURL)
  const user=useSelector(state=>state.UserReducer)
  const [chatObj,setChatObj]=useState(null)
  useEffect(()=>{
    const refe="/chats/"+params.id
    onValue(ref(db,refe),(snapshot)=>{
        setChatObj(snapshot.val())
    })
  },[])
  return (
    chatObj===null?<div>Loading</div>:
    <div>{chatObj.productName}</div>
  )
}
