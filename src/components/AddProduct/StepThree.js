import React, { useState } from 'react'
import stateList from './StateList'
import { useDispatch, useSelector } from 'react-redux'
import {set,ref} from 'firebase/database'
import SetCurrentProductUpload from '../../state/actionCreaters/CurrentProductUploadData'
import { useNavigate } from 'react-router-dom'



export default function StepThree(props) {

    const [address,SetAddress]=useState('')
    const [city,SetCity]=useState('')
    const [state,setState]=useState('')
    const [pinCode,SetPinCode]=useState('')
    var currentProduct=useSelector(state=>state.CurrentProductReducer)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const HandleAddressPost=(e)=>{
        e.preventDefault()
        
        currentProduct["address"]=address
        currentProduct["city"]=city
        currentProduct["state"]=state
        currentProduct["pincode"]=pinCode
        currentProduct['at']=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
        let nav='/item/'+currentProduct.id+'/'+currentProduct.title
        set(ref(props.db,"/feeds/"+currentProduct.id),currentProduct).then(()=>{
            dispatch(SetCurrentProductUpload(null))
            navigate(nav)
        })
    }

    return (
        <div style={StepThreeStyle.main}>
            <form style={StepThreeStyle.form}>
                <div className="form-group col-md-6">
                    <label htmlFor="inputAddress">Address</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="1234 Main St"
                        rows={3}
                        value={address}
                        onChange={e=>SetAddress(e.target.value)}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity" value={city} onChange={e=>SetCity(e.target.value)} />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputState">State</label>
                        <select id="inputState" className="form-control" value={state} onChange={e=>setState(e.target.value)}>
                            {stateList.map((v,k)=>{
                                return <option value={v} key={k}>{v}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">PinCode</label>
                        <input type="text" className="form-control" id="inputZip" value={pinCode} onChange={e=>SetPinCode(e.target.value)}/>
                    </div>
                </div>

                <button className="btn btn-primary my-2" onClick={HandleAddressPost}>
                    Post
                </button>
            </form>

        </div>
    )
}


const StepThreeStyle = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60vw',
        backgroundColor: '#c0edcc',
        margin: 'auto',
        padding: '1vw'
    },
    form: {
        width: '80%'
    }
}