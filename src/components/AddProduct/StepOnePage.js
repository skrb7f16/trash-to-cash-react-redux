import React, { useEffect, useState } from 'react'
import {ref, set} from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { v4 } from 'uuid'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import SetCurrentProductUpload from'../../state/actionCreaters/CurrentProductUploadData'
export default function StepOnePage(props) {
  const [title,SetTitle]=useState('')
  const [price,SetPrice]=useState('')
  const [type,SetType]=useState('')
  const [desc,setDesc]=useState('')
  const [otherType,SetOtherType]=useState('')
  const [id,setId]=useState('')
  const [showNewOtherTab,SetShowNewOtherTab]=useState(false)
  const [loadedPrev,setLoadedPrev]=useState(false)
  const [selectOptions,setSelectOptions]=useState(["Electronics","Papers","Plastic","Containers","Others"])
  const currentData=useSelector(state=>state.CurrentProductReducer)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(currentData && !loadedPrev){
      SetTitle(currentData.title)
      SetPrice(currentData.price)
      SetType(currentData.type)
      setDesc(currentData.desc)
      setId(currentData.id)
      setLoadedPrev(true)
    }
  },[])
  const HandleNextPage=(e)=>{
    e.preventDefault()
    const data={
      title,
      price,
      type,
      desc,
      id:id.length<=1?v4():id,
      taken:false,
      byId:getAuth().currentUser.uid,
      by:getAuth().currentUser.displayName,
      pics:[
        "https://source.unsplash.com/random/?"+type
      ]
    }
    set(ref(props.db,"/feeds/"+data.id),data).then(()=>{
      dispatch(SetCurrentProductUpload(data))
      props.SetStepNo(props.stepNo+1)
    })
  }
  
  const HandleOthers=(e)=>{
      if(e.target.value==="Others"){
        console.log("meow")
        SetShowNewOtherTab(true)
      }else{
        SetType(e.target.value)
      }
  }

  const HandleNewOther=(e)=>{
    e.preventDefault()
    if(otherType!=null && otherType.length<=2){
      return
    }
    else{
      let temp=[...selectOptions,otherType]
      let t=temp[temp.length-1]
      temp[temp.length-1]=temp[temp.length-2]
      temp[temp.length-2]=t;
      setSelectOptions(temp)
      SetType(otherType)
      SetShowNewOtherTab(!showNewOtherTab)
      
    }
  }
  return (
    <div className='container'>
      <h2 className='text-center'>Please fill out this form to go to next</h2>
      <form >
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            id="title"
            placeholder="Title"
            disabled={showNewOtherTab}
            value={title}
            onChange={e=>SetTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Type</label>
          <select className="form-control" 
          id="exampleFormControlSelect1" 
          placeholder='Select Type'
          disabled={showNewOtherTab}
          value={type} 
          onChange={HandleOthers}>
            {selectOptions.map((v,k)=>{
              return <option key={k} value={v}>{v}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
          type='number'
            className="form-control"
            id="price"
            placeholder=" &#x20B9;"
            disabled={showNewOtherTab}
            value={price}
            onChange={e=>SetPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Describe</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            disabled={showNewOtherTab}
            value={desc}
            onChange={e=>setDesc(e.target.value)}
          />
        </div>
        <button className='btn btn-primary mx-5 my-5 p-3' onClick={HandleNextPage} >Next to upload pics</button>
      </form>
      {showNewOtherTab?<div  style={OtherTabStyle.main}>
        <label className='label'>Please specify other type</label>
        <input className="form-control" value={otherType} onChange={e=>SetOtherType(e.target.value)} style={OtherTabStyle.input}/>
        <br />
        <button className='btn btn-primary' onClick={HandleNewOther} >Add</button>
      </div>:''}
      
    </div>
  )
}

const OtherTabStyle={
  main:{
    position:"fixed",
    margin:'auto',
    width:'50vw',
    top:'-20vh',
    left:'0',
    bottom:'0',
    right:'0',
    height:'40vh',
    background:'white',
    display:"flex",
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    padding:'3vw',
    zIndex:'10',
    opacity:".9" 
  },
  input:{
    width:'30%'
  },
  
  

}