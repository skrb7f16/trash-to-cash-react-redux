import React from 'react'
import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

export default function ShowAuthType() {
    const [authType,setAuthType]=useState(0)
    const HandleSetAuthType=()=>{
        setAuthType((authType+1)%2)
    }
    if(authType===0)
    return <Login HandleSetAuthType={HandleSetAuthType}/>
    else
    return <Signup HandleSetAuthType={HandleSetAuthType}/>
}
