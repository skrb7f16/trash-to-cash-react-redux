import React from 'react'
import {  ref,set } from 'firebase/database'
const AcceptProductModal = ({chatObj,db,setShowAcceptance,AddAMessage}) => {

    
    const HandleAcceptSell=()=>{
        
        set(ref(db,'/feeds/'+chatObj.productId+'/taken'),true).then(()=>{
            set(ref(db,'/chats/'+chatObj.chatId+'/active'),false).then(()=>{
                AddAMessage(chatObj.sellerDetails,chatObj.seller,chatObj.sellerId)
                setShowAcceptance(false)
            })
        })
    }
  return (
    <div className={"modal fade show"} tabIndex={-1} role="dialog" style={{display:'block'}}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p><b>{chatObj.seller}</b> is ready to sell this product to you. Please accept the product to know the payment details and the place for taking the product  {chatObj.sellerDetails}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={HandleAcceptSell}>
          Accept
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default AcceptProductModal