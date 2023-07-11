import React from 'react'
import data from '../../assets/trash-to-cash-20037-default-rtdb-feeds-export.json'
import SingleItem from './SingleItem'
export default function Items() {
  var arr=[]
  Object.keys(data).forEach((key)=>{
    arr.push(data[key])
  })
  return (
    <div style={ItemBoxStyle}>
      {arr.map((item,key)=>{
        console.log(item)
        return <SingleItem item={item} key={key}/>
      })}

    </div>
  )
}
const ItemBoxStyle={
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  flexWrap:'wrap',
  margin:'10px'
}