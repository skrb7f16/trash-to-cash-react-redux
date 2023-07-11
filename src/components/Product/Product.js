import React from 'react'
import { useParams } from 'react-router-dom'
import data from '../../assets/trash-to-cash-20037-default-rtdb-feeds-export.json'
import ProductFirstImage from './ProductFirstImage'
export default function Product(props) {
  const params=useParams()
  console.log(params)
  const currProduct=data[params.id]
  console.log(currProduct)
  return (
    <>
    <ProductFirstImage pics={currProduct.pics}/>
    <div>{params.name}</div>
    </>
  )
}
