import React, { useEffect, useState } from 'react'
import SellerOption from './SellerOption'
import BuyerOption from './BuyerOption'
import NotLoggedInUserOption from './NotLoggedInUserOption'

export default function ProductDescriptions(props) {
    const [reqMadeByCurrentUser,setRequestMadeByCurrentUser]=useState(false)
    const [reqMadeAccepted,setReqMadeAccepted]=useState(false)
    useEffect(()=>{
        if(props.reqs.length>0 && props.user!==null){
            
            for(let i=0;i<props.reqs.length;i++){
               
                if(props.reqs[i].requesterId===props.user.uid){
                    setRequestMadeByCurrentUser(true)
                    setReqMadeAccepted(props.reqs[i].accepted)
                    break;
                }
            }
        }
    },[])
    return (
        <div className="container" style={productDesc}>
            <h1>{props.product.title}</h1>
            <h6><i>(under {props.product.type} category)</i></h6>
            <div style={price}>
                <b>Price:- </b>{props.product.price}
            </div>
            <div style={address}>
                <p><b>Address: </b>{props.product.address}</p>
                <p><b>City: </b>{props.product.city}</p>
            </div>
            <div style={desc}>
                <p><b>Description</b></p>
                <p>{props.product.desc}</p>
            </div>
            {props.user !== null ? (props.user.uid === props.product.byId ? <SellerOption reqs={props.reqs} db={props.db} 
            product={props.product} /> :
                <BuyerOption product={props.product} user={props.user} db={props.db} reqMadeByCurrentUser={reqMadeByCurrentUser} reqMadeAccepted={reqMadeAccepted} setRequestMadeByCurrentUser={setRequestMadeByCurrentUser}/>) : <NotLoggedInUserOption />}

        </div>
    )
}

const productDesc = {
    display: 'flex',
    flexDirection: 'column',
    padding: '2vh'
}

const price = {

}

const address = {
    fontSize: '20px',
    fontStyle: 'italic'
}

const desc = {

}

