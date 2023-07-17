import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductFirstImage from './ProductFirstImage'
import ProductDescriptions from './ProductDescriptions'
import firebaseApp from '../../firebase-service'
import {getDatabase,ref, onValue} from 'firebase/database'
export default function Product(props) {
  const db=getDatabase(firebaseApp,firebaseApp.options.databaseURL)

  const params=useParams()
  const [currProduct,setCurrProduct]=useState(null)

  useEffect(()=>{
      const refe=ref(db,"/feeds/"+params.id)
     
      onValue(refe,(snapshot)=>{
        const data=snapshot.val()
        setCurrProduct(null)
        if(data!=null){
          setCurrProduct(Object(data))
        }
      })
  },[])
  if(currProduct===null)return "LOADING"
  return (
    <div className='container' style={productStyle}>
    <ProductFirstImage pics={currProduct.pics}/>
    <ProductDescriptions product={currProduct} />
    </div>
  )
}

const productStyle={
  marginTop:'5vh',
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  
  
}