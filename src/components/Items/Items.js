import React, { useEffect, useState } from 'react'
import data from '../../assets/trash-to-cash-20037-default-rtdb-feeds-export.json'
import SingleItem from './SingleItem'
import { getDatabase, ref, onValue,orderByChild ,query} from 'firebase/database'
import firebaseApp from '../../firebase-service'
export default function Items() {
  
  const db = getDatabase(firebaseApp, firebaseApp.options.databaseURL)
  const [item,setItem]=useState([])
  
  useEffect(() => {
    
    const itemRef =query(ref(db, '/feeds'),orderByChild('at'))
    onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      if(data!==null){
        setItem([])
        var tempItem=[]
        Object.values(data).map(items=>{
          
          tempItem.push(items)
          //setItem(item.reverse())
        });
        tempItem.reverse()
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