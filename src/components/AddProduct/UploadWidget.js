import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {set,ref} from 'firebase/database'
import SetCurrentProductUpload from '../../state/actionCreaters/CurrentProductUploadData'
export default function UploadWidget(props) {
  const cloudinaryRef=useRef()
  const widgetRef=useRef()
  const urls=useRef([])
  const dispatch=useDispatch()
  var currentProduct=useSelector(state=>state.CurrentProductReducer)
  useEffect(()=>{
    cloudinaryRef.current=window.cloudinary;
    console.log(cloudinaryRef)
    widgetRef.current=cloudinaryRef.current.createUploadWidget({
      cloudName:'skrb7f16',
      uploadPreset:'ffqpbzab'
    },(e,r)=>{
      let uploadUrl=[]
      if(!e && r && r.event==="queues-end"){
        const files=r.info.files;
      
        
        for(let i=0;i<files.length;i++){
          uploadUrl.push(files[i].uploadInfo.url)
        }
        urls.current=[...urls.current,uploadUrl]
        console.log(uploadUrl[0])
      }else if(!e && r && r.event==="close"){
        
         set(ref(props.db,"/feeds/"+currentProduct.id+"/pics"),urls.current[0]).then(()=>{
            currentProduct['pics']=urls.current[0]
            dispatch(SetCurrentProductUpload(currentProduct))
           props.SetStepNo(props.stepNo+1)
         })
          
      }
    })
  })
  return (
    <div>
        <button className='btn btn-primary mx-2 my-2' onClick={e=>widgetRef.current.open()}>Upload</button>
        {urls.current.map(v=>{
          return <p>{v}</p>
        })}
    </div>
  )
}
