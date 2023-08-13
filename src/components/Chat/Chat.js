import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getDatabase, onValue, ref,set } from 'firebase/database'
import firebaseApp from '../../firebase-service'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import OurSide from './OurSide'
import OtherSide from './OtherSide'
import AcceptProductModal from './AcceptProductModal'
import SellerDetailsModal from './SellerDetailsModal'
export default function Chat() {
  const params = useParams()
  const db = getDatabase(firebaseApp, firebaseApp.options.databaseURL)
  const user = useSelector(state => state.UserReducer)
  const [chatObj, setChatObj] = useState(null)
  const [message,setMessage]=useState('')
  const bottomRef=useRef(null)
  const [showAcceptance,setShowAcceptance]=useState(false)
  const [showSellerDetails,setShowSellerDetails]=useState(false)
  const refe = "/chats/" + params.id
  useEffect(() => {

      onValue(ref(db, refe), (snapshot) => {
        setChatObj(snapshot.val())
        console.log(chatObj)
      })
    
  }, [])

  useEffect(()=>{
    console.log("hello")
    if(chatObj!==null){
      setShowAcceptance(chatObj.requestToSell)
    }
  },[chatObj])
  
  const SendMessage=()=>{
    if(message.length===0)return;
    else{
      let temp={
        message,
        senderId:user.uid,
        sender:user.displayName,
        id:Math.round((new Date()).getTime())
      }
      const tempObj=chatObj.messages
      tempObj.push(temp)
      set(ref(db,refe+"/messages"),tempObj).then(()=>{
        setMessage('')
        bottomRef.current?.lastElementChild?.scrollIntoView({behaviour:'smooth'})
      })
    }
  }
  const AddAMessage=(msg,sender,senderId)=>{
    if(msg.length===0)return;
    else{
      let temp={
        message:msg,
        senderId:senderId,
        sender,
        id:Math.round((new Date()).getTime())
      }
      const tempObj=chatObj.messages
      tempObj.push(temp)
      set(ref(db,refe+"/messages"),tempObj).then(()=>{
        setMessage('')
        bottomRef.current?.lastElementChild?.scrollIntoView({behaviour:'smooth'})
      })
    }
  }
  const HandleSell=()=>{
    setShowSellerDetails(true)
    
  }
  return (
    chatObj === null ? <div>Loading</div> :
      <section style={{ backgroundColor: "#eee" }}>
        {showAcceptance && user.uid===chatObj.buyerId && chatObj.active?<AcceptProductModal chatObj={chatObj} db={db} setShowAcceptance={setShowAcceptance} AddAMessage={AddAMessage}/>:''}
        {user.uid===chatObj.sellerId && showSellerDetails===true?<SellerDetailsModal chatObj={chatObj} db={db}  refe={refe} set={set} setShowSellerDetails={setShowSellerDetails} />:''}
        <div className="container py-5">
          <div className="row d-flex justify-content-center" >
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card">
                <div
                  className="card-header d-flex justify-content-between align-items-center p-3"
                  style={{ borderTop: "4px solid rgb(202, 245, 147)" }}
                >
                  <h5 className="mb-0">{chatObj.productName}</h5>
                  {user.uid===chatObj.sellerId?<button className='btn btn-success' onClick={HandleSell}>Sell</button>:''}
                  
                </div>
                <div className="card-body"
                  data-mdb-perfect-scrollbar="true"
                  style={{ position: "relative", height: 400 , overflowY:'scroll',}}
                  ref={el=>{bottomRef.current=el; bottomRef.current?.lastElementChild?.scrollIntoView({behaviour:'smooth'})} }
                  >
                  {chatObj.messages.map((v)=>{
                    if(v.senderId===user.uid)return <OurSide message={v} key={v.id}/>
                    else return <OtherSide message={v} key={v.id} />
                  })}
                  
                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <div className="input-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type message"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      disabled={chatObj.active?'':'disabled'}
                      value={message}
                      onChange={e=>setMessage(e.target.value)}
                    />
                    <button
                      className="btn"
                      type="button"
                      id="button-addon2"
                      style={{ paddingTop: ".55rem",background:'rgb(202, 245, 147)' }}
                      onClick={SendMessage}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
