import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getDatabase, onValue, ref,set } from 'firebase/database'
import firebaseApp from '../../firebase-service'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import OurSide from './OurSide'
import OtherSide from './OtherSide'
export default function Chat() {
  const params = useParams()
  const db = getDatabase(firebaseApp, firebaseApp.options.databaseURL)
  const user = useSelector(state => state.UserReducer)
  const [chatObj, setChatObj] = useState(null)
  const [message,setMessage]=useState('')
  const bottomRef=useRef(null)
  const refe = "/chats/" + params.id
  useEffect(() => {
    
    onValue(ref(db, refe), (snapshot) => {
      setChatObj(snapshot.val())
      bottomRef.current?.scrollIntoView({block:'start'})
    })

    
  }, [])
  const SendMessage=()=>{
    if(message.length===0)return;
    else{
      let temp={
        message,
        senderId:user.uid,
        sender:user.displayName,
        id:Math.round((new Date()).getTime() / 1000)
      }
      const tempObj=chatObj.messages
      tempObj.push(temp)
      set(ref(db,refe+"/messages"),tempObj).then(()=>{
        setMessage('')
        
      })
    }
  }
  return (
    chatObj === null ? <div>Loading</div> :
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center" >
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card">
                <div
                  className="card-header d-flex justify-content-between align-items-center p-3"
                  style={{ borderTop: "4px solid #ffa900" }}
                >
                  <h5 className="mb-0">{chatObj.productName}</h5>

                </div>
                <div className="card-body scrollspy"
                  data-mdb-perfect-scrollbar="true"
                  style={{ position: "relative", height: 400 , overflowY:'scroll'}}
                  ref={bottomRef}
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
                      value={message}
                      onChange={e=>setMessage(e.target.value)}
                    />
                    <button
                      className="btn btn-warning"
                      type="button"
                      id="button-addon2"
                      style={{ paddingTop: ".55rem" }}
                      onClick={SendMessage}
                    >
                      Button
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
