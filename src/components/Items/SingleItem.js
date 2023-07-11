import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function SingleItem(props) {
  const navigate=useNavigate()
  const HandleProductPageLoad=()=>{
    navigate(`/item/${props.item.id}/${props.item.title}`)
  }
  return (
    
      <div className="card border-dark" style={SingleItemStyle} onClick={HandleProductPageLoad}>
        <img src={props.item.pics[0]} className="card-img-top" alt="..." style={{ width: '18rem', height: '25rem' }} />
        <div className="card-head">
          <h2>{props.item.title}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">
            {props.item.desc}
          </p>
        </div>
      </div>



  )
}

const SingleItemStyle = {
  margin: '10px',
  width: "20rem",
  padding: '10px',
  justifyContent: 'center',
  cursor: 'pointer'
}
