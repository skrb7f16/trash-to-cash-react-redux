import React from 'react'
import ShowAuthType from './ShowAuthType'
import google from '../../assets/google.png'
import { Auth, GoogleAuthProvider } from 'firebase/auth'


export default function Authentication() {
    
    return (
        <div className='container' style={{width:'50vw', marginTop:'3rem' , marginBottom:'2rem'}}>

            <div className="card border-dark">
                <div className="card-header">
                    <h1>
                    Connect with us

                    </h1>
                </div>
                <div>
                    <ShowAuthType />
                </div>
                <div className='card-footer' style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
                <img src={google}  alt="..." style={{width:'40px'}}/>
                    <h2 className='text-center'>
                        Continue with google
                        </h2>
                </div>

            </div>
        </div>
    )
}
