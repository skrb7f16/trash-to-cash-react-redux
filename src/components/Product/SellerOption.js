import React from 'react'
import {set,ref} from 'firebase/database'
import { useNavigate } from 'react-router-dom'
export default function SellerOption(props) {
const navigate=useNavigate()
  const HandleAcceptance=(reqId,by,to,mess,productId,reqUsername)=>{
    set(ref(props.db,"/requests/"+reqId+"/accepted"),true).then(()=>{
      let temp=[]
      temp.push({"message":mess,id:Math.round((new Date()).getTime()),'senderId':by,"sender":reqUsername})
      let chatObj={
        messages:temp,
        productId,
        productName:props.product.title,
        buyer:reqUsername,
        buyerId:by,
        sellerId:to,
        chatId:props.product.id+to+by,
        requestToSell:false
      }
      set(ref(props.db,"/chats/"+props.product.id+to+by),chatObj).then(()=>{
        console.log("hello")
      })
    })
  }

  const HandleChat=(by,to)=>{
    navigate("/chat/"+props.product.id+to+by)
  }
  return (
    <div>
      <h3>Requests made</h3>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Message</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {props.reqs.map((v,k)=>{
        return <tr key={v.requestId}>
          <th scope="row">{k+1}</th>
          <td >{v.requesterUsername}</td>
          <td>{v.message}</td>
          <td>
            {!v.accepted?<div className="btn btn-success" on onClick={()=>HandleAcceptance(v.requestId,v.requesterId,v.requestedToId,v.message,v.productId,v.requesterUsername)}>Accept</div>:<div className="btn btn-primary" onClick={()=>HandleChat(v.requesterId,v.requestedToId)}>Chat</div>}
            <div className="text-center btn btn-danger">Delete</div>
          </td>
          
        </tr>
      })}
  </tbody>
</table>
    </div>
  )
}

