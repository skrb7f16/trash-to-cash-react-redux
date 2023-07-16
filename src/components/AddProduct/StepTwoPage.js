import { useState } from 'react'
import StepThree from './StepThree'
import UploadWidget from './UploadWidget'
import { useSelector } from 'react-redux'

export default function StepTwoPage(props) {

  const HandleGoBack=()=>{
    props.SetStepNo(props.stepNo-1)
  }
  
   
  return (
    
    <div className='container' style={StepTwoStyle.main}>
      <button className='btn btn-primary' onClick={HandleGoBack}>Go Back</button>
      <UploadWidget db={props.db} stepNo={props.stepNo} SetStepNo={props.SetStepNo} />
      
    </div>
  )
}

const StepTwoStyle={
  main:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'#c0edcc',
    width:'60vw',
    height:'60vh',
    marginTop:'1vw'
  }
}