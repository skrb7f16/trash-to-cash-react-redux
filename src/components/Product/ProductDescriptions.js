import React from 'react'

export default function ProductDescriptions(props) {
  return (
    <div className="container" style={productDesc}>
        <h1>{props.product.title}</h1>
        <h7><i>(under {props.product.type} category)</i></h7>
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

        <div style={btnBox}>
            <div className="btn btn-primary">Chat</div>
            <div className="btn btn-primary">Negotiate</div>
            <div className="btn btn-primary">Buy</div>
        </div>
    </div>
  )
}

const productDesc={
    display:'flex',
    flexDirection:'column',
    padding:'2vh'
}

const price={

}

const address={
    fontSize:'20px',
    fontStyle:'italic'
}

const desc={

}

const btnBox={
    display:"flex",
    justifyContent:'space-around'
}