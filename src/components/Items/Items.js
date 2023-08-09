import React, { useEffect, useState } from 'react'
import SingleItem from './SingleItem'
import { getDatabase, ref, onValue} from 'firebase/database'
import firebaseApp from '../../firebase-service'
import {SortByDate} from './utils/SortingFunctions'
function parseISOString(s) {

  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export default function Items() {
  
  const db = getDatabase(firebaseApp, firebaseApp.options.databaseURL)
  const [item,setItem]=useState([])
  
  useEffect(() => {
    
    const itemRef =ref(db, '/feeds')
    onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      if(data!==null){
        setItem([])
        var tempItem=[]
        Object.values(data).map(items=>{
          
          return tempItem.push(items)
          
        });
        tempItem.sort((a,b)=>{
          
          return SortByDate(a,b)
        })
        setItem(tempItem)
        
      } 
    });


  }, [])


  return (
    <>
    <h2 className='text-center'>Latest Products</h2>
    <div style={ItemBoxStyle}>
      
      {item.length>0?item.map((i, key) => {
        
        return <SingleItem item={i} key={key} />
      }):"LOADING"}

    </div>
    </>
  )
}
const ItemBoxStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  margin: 'auto',
  overflowY:'hidden',
  
  width:'95vw',
  minHeight:'100vh'
}