import React, { useEffect, useState } from 'react'
import data from '../../assets/trash-to-cash-20037-default-rtdb-feeds-export.json'
import SingleItem from './SingleItem'
import { getDatabase, ref, onValue } from 'firebase/database'
import firebaseApp from '../../firebase-service'
export default function Items() {
  
  const db = getDatabase(firebaseApp, firebaseApp.options.databaseURL)
  const [item,setItem]=useState([])
  
  useEffect(() => {
    
    const starCountRef = ref(db, '/feeds');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if(data!==null){
        setItem([])
        Object.values(data).map(items=>{
          setItem(old=>[...old,items])
        });
        
      } 
    });


  }, [])


  return (
    <div style={ItemBoxStyle}>
      {item.map((item, key) => {

        return <SingleItem item={item} key={key} />
      })}

    </div>
  )
}
const ItemBoxStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  margin: '10px',
  overflowY:'overflow-y',
  width:'100vw',
  height:'100vh'
}