import React, { useState } from 'react'
import { v4 } from 'uuid'
import {set,ref} from 'firebase/database'
import { useDispatch } from 'react-redux'
import ShowMessage from '../../state/actionCreaters/ShowMessage'
import { useNavigate } from 'react-router-dom'
export default function BuyerOption(props) {
    console.log(props)
    const [showReq, setShowReq] = useState(false)
    const [message,setMessage]=useState('')
    const [phone,setPhone]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const HandleShowRequestForm = (e) => {
        e.preventDefault()
        setShowReq(!showReq)
    }

    const HandleSubmitRequest=(e)=>{
        e.preventDefault()
        const req={
            requestId:v4(),
            requestedAt:new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString(),
            accepted:false,
            message,
            whatsappNo:phone,
            productId:props.product.id,
            requestedToId:props.product.byId,
            requestedToUsername:props.product['by']?props.product['by']:'unknown',
            requesterId:props.user.uid,
            requesterUsername:props.user.displayName,
            
        }
        set(ref(props.db,"/requests/"+req.requestId),req).then(()=>{
            dispatch(ShowMessage({message:'Successfull uploaded the request',type:'success'},'show'))
        })

    
    }
    const TakeToChat=()=>{
        navigate("/chat/"+props.product.id+props.product.byId+props.user.uid)
    }
    return (
        <div>
            <div style={btnBox} onClick={TakeToChat}>{props.reqMadeByCurrentUser?<div className='container bg-warning p-3 btn'>Request already made {props.reqMadeAccepted?"Click here to chat":"please wait for the response from user"}

            </div>:<button className="btn btn-primary" onClick={HandleShowRequestForm} >Interested to make a request</button>}
                
            </div>
            {showReq ? <div style={formOverlay}>
                <form style={form}>
                    <input className='form-control p-2 m-3' placeholder='message' value={message} onChange={e=>setMessage(e.target.value)} />
                    <input className='form-control p-2 m-3' placeholder='phone no' value={phone} onChange={e=>setPhone(e.target.value)} />
                    <div>
                        <button type='numeric' className='btn btn-primary p-2 m-1' onClick={HandleSubmitRequest}>Submit</button>
                        <button className='btn btn-danger p-2 m-1' onClick={HandleShowRequestForm}>Cancel</button>
                    </div>

                </form>
            </div> : ''}

        </div>
    )
}

const btnBox = {
    display: "flex",
    justifyContent: 'space-around'
}

const formOverlay = {
    position: "fixed",
    margin: 'auto',
    width: '50vw',
    top: '-20vh',
    left: '0',
    bottom: '0',
    right: '0',
    height: '60vh',
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3vw',
    zIndex: '10',
    opacity: ".9",
    background: '#d6f5c4',
    transition: '.5s'
}

const form = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

}