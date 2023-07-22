import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductFirstImage from './ProductFirstImage'
import ProductDescriptions from './ProductDescriptions'
import firebaseApp from '../../firebase-service'
import {getDatabase,ref, onValue} from 'firebase/database'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
export default function Product(props) {
  const db=getDatabase(firebaseApp,firebaseApp.options.databaseURL)
  const user=useSelector(state=>state.UserReducer)

  const params=useParams()
  const [currProduct,setCurrProduct]=useState(null)
  const [reqs,setReqs]=useState([])

  const fetchProduct=(refe)=>{
    onValue(refe,(snapshot)=>{
      const data=snapshot.val()
      setCurrProduct(null)
      if(data!=null){
        setCurrProduct(Object(data))
      }
    })
  }

  const fetchRequests=(refe)=>{
    onValue(refe,(snapshot)=>{
      const data=snapshot.val()
      setReqs([])
      let temp=[]
      Object.values(data).map((v,k)=>{
        if(v.productId===params.id){
          temp.push(v)
        }
      })
      setReqs(temp)
    })
  }
  useEffect(()=>{
    const refe=ref(db,"/feeds/"+params.id)
    fetchProduct(refe)
    const reqRef=ref(db,"/requests")
    fetchRequests(reqRef)
      
  },[])
  if(currProduct===null)return "LOADING"
  return (
    <div className='container' style={productStyle} >
    <ProductFirstImage pics={currProduct.pics}/>
    <ProductDescriptions product={currProduct} user={user} db={db} reqs={reqs}/>
    </div>
  )
}

const productStyle={
  marginTop:'5vh',
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  minHeight:'80vh',
  flexWrap:'wrap'
}