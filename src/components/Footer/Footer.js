import React from 'react'

export default function Footer() {
  return (
    <div style={footerStyle.main}>
        <h4 className='text-center'>Trash To Cash 2023</h4>
    </div>
  )
}

const footerStyle={
    main:{
        width:'99vw',
        height:'10vh',
        backgroundColor:'#b2dead',
        margin:'auto',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
}