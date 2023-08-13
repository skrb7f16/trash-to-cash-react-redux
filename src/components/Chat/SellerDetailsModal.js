import React, { useState } from 'react'
import {ref} from 'firebase/database'
const SellerDetailsModal = ({chatObj,db,set,refe,setShowSellerDetails}) => {
    const [msg,setMsg]=useState('')
    const [phone,setPhone]=useState('')

    const HandleSendDetails=(e)=>{
        e.preventDefault()
        chatObj['sellerDetails']=msg+" Contact me with "+phone
        chatObj.requestToSell=true
    set(ref(db,refe),chatObj).then(()=>{
       setShowSellerDetails(false)
      
     })
    }
  return (
    <div style={formOverlay}>
        <form style={form}>
                    <input className='form-control p-2 m-3' placeholder='message' value={msg} onChange={e=>setMsg(e.target.value)} />
                    <input className='form-control p-2 m-3' placeholder='phone no' value={phone} onChange={e=>setPhone(e.target.value)} />
                    <div>
                        <button type='numeric' className='btn btn-primary p-2 m-1' onClick={HandleSendDetails}>Submit</button>
                        <button className='btn btn-danger p-2 m-1' onClick={e=>e}>Cancel</button>
                    </div>

                </form>
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
    top: '5vh',
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
export default SellerDetailsModal