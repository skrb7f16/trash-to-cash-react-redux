import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from 'firebase/database'
import firebaseApp from '../../firebase-service'
import { useSelector } from 'react-redux'
import SingleChatTile from './SingleChatTile'
const ChatsDashBoard = () => {
    const db = getDatabase(firebaseApp, firebaseApp.options.databaseURL)
    const user = useSelector(state => state.UserReducer)
    const [chats,setChats]=useState([])
    useEffect(()=>{
        const reference=ref(db,"/chats")
        
        onValue(reference,(snapshot)=>{
            const data=snapshot.val()
            if(data!=null){
              var tempChat=[]
              Object.keys(data).map((c)=>{
                if(c.includes(user.uid)){
                  tempChat.push(data[c])
                }
              })
              setChats(tempChat)
            }
        })
    },[])
  return (
    <div className='container p-3' style={chatDashBoardStyle}>
      <h2 className='text-center text-muted'>My Chats</h2>
      {chats.map((val)=>{
      console.log(val)
      return <SingleChatTile chatName={val.productName} key={val.productId} lastMsg={val.messages[val.messages.length-1]} chatId={val.chatId}/>
    })}</div>
  )
}


const chatDashBoardStyle={
  minHeight:'82vh',
  border:'1px solid black',
  borderRadius:'10px',
  width:'90vw',
  margin:'5px auto',
  
}

export default ChatsDashBoard